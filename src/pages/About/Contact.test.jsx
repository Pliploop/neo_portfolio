import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
import Contact from './Contact';
import { validateContact, stripHtml, emailConfig } from './contactLogic';

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }));
vi.mock('./contactLogic', async (orig) => {
  const mod = await orig();
  return { ...mod, emailConfig: vi.fn(() => ({ serviceId: 's', templateId: 't', publicKey: 'k' })) };
});

afterEach(() => vi.clearAllMocks());

test('validation', () => {
  expect(validateContact({ name: '', email: '', message: '' })).toEqual({ email: 'Required', message: 'Required' });
  expect(validateContact({ name: '', email: 'nope', message: 'hi' })).toEqual({ email: 'Invalid email address' });
  expect(validateContact({ name: 'a', email: 'a@b.co', message: 'hi' })).toEqual({});
  expect(validateContact({ name: 'x'.repeat(101), email: 'a@b.co', message: 'hi' })).toEqual({ name: 'Too long' });
});

test('stripHtml', () => {
  expect(stripHtml(' <b>hi</b> there ')).toBe('hi there');
});

test('emailConfig is null when keys are missing', async () => {
  const real = (await vi.importActual('./contactLogic')).emailConfig;
  expect(real({})).toBeNull();
  expect(real({ REACT_APP_EMAILJS_SERVICE_ID: 's', REACT_APP_EMAILJS_TEMPLATE_ID: 't', REACT_APP_EMAILJS_PUBLIC_KEY: 'k' }))
    .toEqual({ serviceId: 's', templateId: 't', publicKey: 'k' });
});

async function fill() {
  await userEvent.type(screen.getByLabelText(/email/i), 'a@b.co');
  await userEvent.type(screen.getByLabelText(/message/i), 'hello <i>there</i>');
}

test('shows field errors on empty submit', async () => {
  render(<Contact />);
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(screen.getAllByText('Required')).toHaveLength(2);
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('sends sanitized params and shows success', async () => {
  emailjs.send.mockResolvedValue({});
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(emailjs.send).toHaveBeenCalledWith('s', 't', { from_name: '', reply_to: 'a@b.co', message: 'hello there' }, 'k');
  expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
});

test('shows an error when sending fails', async () => {
  emailjs.send.mockRejectedValue(new Error('down'));
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent(/could not be sent/i);
});

test('blocks a second send within the cooldown', async () => {
  emailjs.send.mockRejectedValue(new Error('down'));
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  await screen.findByRole('alert');
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(emailjs.send).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('alert')).toHaveTextContent(/wait 30 seconds/i);
});

test('missing configuration is reported, not silent', async () => {
  emailConfig.mockReturnValueOnce(null);
  render(<Contact />);
  await fill();
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/not configured/i);
  expect(emailjs.send).not.toHaveBeenCalled();
});
