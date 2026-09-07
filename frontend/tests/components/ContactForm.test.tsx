import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/organisms/ContactForm';

const ENDPOINT = '/api/contact';

async function rellenar(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/nombre/i), 'Ada');
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
  await user.type(screen.getByLabelText(/asunto/i), 'Hola');
  await user.type(screen.getByLabelText(/mensaje/i), 'Mensaje de prueba');
}

afterEach(() => vi.restoreAllMocks());

describe('<ContactForm />', () => {
  it('todos los campos son obligatorios y están etiquetados', () => {
    render(<ContactForm />);
    for (const label of [/nombre/i, /email/i, /asunto/i, /mensaje/i]) {
      expect(screen.getByLabelText(label)).toBeRequired();
    }
  });

  it('envía los datos del formulario como form-urlencoded', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ status: 'success' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await rellenar(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe('POST');
    expect(String(init.body)).toContain('email=ada%40example.com');
  });

  it('muestra confirmación y limpia el formulario cuando la API responde success', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ status: 'success' }), { status: 200 })));
    const user = userEvent.setup();
    render(<ContactForm />);
    await rellenar(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/mensaje enviado con éxito/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toHaveValue('');
  });

  it('muestra el estado de error cuando la API responde algo distinto de success', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ status: 'error' }), { status: 200 })));
    const user = userEvent.setup();
    render(<ContactForm />);
    await rellenar(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/hubo un error al enviar el mensaje/i)).toBeInTheDocument();
  });

  it('muestra el estado de error ante un fallo de red y conserva lo escrito', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline'); }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await rellenar(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/hubo un error al enviar el mensaje/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toHaveValue('Ada');
  });

  it('incluye un honeypot oculto que se envía con el formulario', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ status: 'success' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    const trampa = container.querySelector('input[name="website"]');
    expect(trampa).toBeInTheDocument();
    expect(trampa).toHaveAttribute('tabindex', '-1');

    await rellenar(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(String((fetchMock.mock.calls[0] as any)[1].body)).toContain('website=');
  });

  it('muestra el mensaje de error que devuelve el servidor', async () => {
    vi.stubGlobal('fetch', vi.fn(async () =>
      new Response(JSON.stringify({ status: 'error', message: 'Demasiados mensajes.' }), { status: 429 })
    ));
    const user = userEvent.setup();
    render(<ContactForm />);
    await rellenar(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/demasiados mensajes/i)).toBeInTheDocument();
  });
});
