import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/** Envuelve el envío de Resend para poder espiarlo sin tocar la red. */
const enviar = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: enviar };
  },
}));

const ENV = {
  RESEND_API_KEY: 'test-key',
  CONTACT_TO_EMAIL: 'destino@ejemplo.com',
  CONTACT_FROM_EMAIL: 'origen@ejemplo.com',
};

function peticion(campos: Record<string, string>) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(campos).toString(),
  });
}

const validos = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Hola',
  message: 'Un mensaje de prueba.',
};

/** Cada prueba usa una IP distinta para no chocar con el límite por IP. */
let n = 0;
const ip = () => `10.0.0.${++n}`;

async function ruta() {
  return (await import('@/pages/api/contact')).POST;
}

beforeEach(() => {
  vi.resetModules();
  enviar.mockReset().mockResolvedValue({ error: null });
  for (const [k, v] of Object.entries(ENV)) vi.stubEnv(k, v);
});

afterEach(() => vi.unstubAllEnvs());

describe('POST /api/contact', () => {
  it('envía el correo y responde success con datos válidos', async () => {
    const POST = await ruta();
    const res = await POST({ request: peticion(validos), clientAddress: ip() } as any);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ status: 'success' });
    expect(enviar).toHaveBeenCalledOnce();
  });

  it('usa el correo del visitante como replyTo', async () => {
    const POST = await ruta();
    await POST({ request: peticion(validos), clientAddress: ip() } as any);
    expect(enviar.mock.calls[0][0]).toMatchObject({ replyTo: 'ada@example.com' });
  });

  it('rechaza un correo mal formado', async () => {
    const POST = await ruta();
    const res = await POST({ request: peticion({ ...validos, email: 'no-es-un-correo' }), clientAddress: ip() } as any);
    expect(res.status).toBe(400);
    expect(enviar).not.toHaveBeenCalled();
  });

  it('rechaza campos vacíos', async () => {
    const POST = await ruta();
    const res = await POST({ request: peticion({ ...validos, message: '   ' }), clientAddress: ip() } as any);
    expect(res.status).toBe(400);
    expect(enviar).not.toHaveBeenCalled();
  });

  it('rechaza un mensaje que supera el límite de longitud', async () => {
    const POST = await ruta();
    const res = await POST({ request: peticion({ ...validos, message: 'x'.repeat(5001) }), clientAddress: ip() } as any);
    expect(res.status).toBe(400);
    expect(enviar).not.toHaveBeenCalled();
  });

  it('descarta en silencio lo que caiga en el honeypot', async () => {
    const POST = await ruta();
    const res = await POST({ request: peticion({ ...validos, website: 'soy-un-bot' }), clientAddress: ip() } as any);
    expect(res.status).toBe(200);
    expect(enviar).not.toHaveBeenCalled();
  });

  it('neutraliza los saltos de línea del asunto (inyección de cabeceras)', async () => {
    const POST = await ruta();
    await POST({
      request: peticion({ ...validos, subject: 'Hola\nBcc: victima@ejemplo.com' }),
      clientAddress: ip(),
    } as any);
    expect(enviar.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
  });

  it('escapa el HTML del mensaje', async () => {
    const POST = await ruta();
    await POST({
      request: peticion({ ...validos, message: '<script>alert(1)</script>' }),
      clientAddress: ip(),
    } as any);
    expect(enviar.mock.calls[0][0].html).not.toContain('<script>');
    expect(enviar.mock.calls[0][0].html).toContain('&lt;script&gt;');
  });

  it('aplica el límite de 3 envíos por IP', async () => {
    const POST = await ruta();
    const misma = ip();
    for (let i = 0; i < 3; i++) {
      const ok = await POST({ request: peticion(validos), clientAddress: misma } as any);
      expect(ok.status).toBe(200);
    }
    const bloqueado = await POST({ request: peticion(validos), clientAddress: misma } as any);
    expect(bloqueado.status).toBe(429);
    expect(enviar).toHaveBeenCalledTimes(3);
  });

  it('responde 500 si faltan las variables de entorno', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const POST = await ruta();
    const res = await POST({ request: peticion(validos), clientAddress: ip() } as any);
    expect(res.status).toBe(500);
    expect(enviar).not.toHaveBeenCalled();
  });

  it('responde 502 si Resend rechaza el envío', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    enviar.mockResolvedValue({ error: { message: 'rechazado' } });
    const POST = await ruta();
    const res = await POST({ request: peticion(validos), clientAddress: ip() } as any);
    expect(res.status).toBe(502);
  });
});
