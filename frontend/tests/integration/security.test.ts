// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
import { FRONTEND, REPO as repo } from './paths';

async function tracked(): Promise<string[]> {
  const { stdout } = await run('git', ['ls-files'], { cwd: repo, maxBuffer: 32 * 1024 * 1024 });
  return stdout.split('\n').filter(Boolean);
}

describe('higiene de secretos en el repositorio', () => {
  it('ningún archivo .env está versionado', async () => {
    const envs = (await tracked()).filter(
      (f) => /(^|\/)\.env(\..*)?$/.test(f) && !f.endsWith('.example')
    );
    expect(envs).toEqual([]);
  });

  it('wp-config.php no está versionado', async () => {
    expect((await tracked()).filter((f) => f.endsWith('wp-config.php'))).toEqual([]);
  });

  it('ningún archivo versionado contiene contraseñas literales', async () => {
    const sospechosos = (await tracked()).filter((f) => /\.(yml|yaml|sh|env|php)$/.test(f));
    const hallazgos: string[] = [];
    for (const f of sospechosos) {
      const txt = await readFile(path.join(repo, f), 'utf8').catch(() => '');
      for (const l of txt.split('\n')) {
        if (/(PASSWORD|PASSWD|SECRET|API_KEY)\s*[:=]/i.test(l) && !/\$\{|\$[A-Z]|=\s*$/.test(l)) {
          hallazgos.push(`${f}: ${l.trim().slice(0, 60)}`);
        }
      }
    }
    expect(hallazgos).toEqual([]);
  });

  it('no queda ningún archivo PHP en el repositorio', async () => {
    expect((await tracked()).filter((f) => f.endsWith('.php'))).toEqual([]);
  });

  it('el ejemplo de entorno no contiene valores reales', async () => {
    const ejemplo = await readFile(path.join(repo, 'frontend', '.env.example'), 'utf8');
    expect(ejemplo).toMatch(/RESEND_API_KEY=\s*$/m);
  });

  it('no quedan scripts de despliegue de respaldo con credenciales', async () => {
    expect((await tracked()).filter((f) => /\.save$/.test(f))).toEqual([]);
  });
});

describe('dependencias', () => {
  it('npm audit no reporta vulnerabilidades altas ni críticas', async () => {
    const frontend = FRONTEND;
    // npm audit termina con código != 0 cuando encuentra algo: el JSON viene igual en stdout.
    const out = await new Promise<string>((resolve) => {
      const p = spawn('npm', ['audit', '--json'], { cwd: frontend, shell: true });
      let buf = '';
      p.stdout.on('data', (d) => (buf += d));
      p.on('close', () => resolve(buf));
    });
    const { high = 0, critical = 0 } = JSON.parse(out || '{}').metadata?.vulnerabilities ?? {};
    expect({ high, critical }).toEqual({ high: 0, critical: 0 });
  }, 120_000);
});