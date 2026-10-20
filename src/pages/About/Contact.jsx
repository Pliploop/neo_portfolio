import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import DropCapHeading from '../../ui/DropCapHeading';
import Frame from '../../ui/Frame';
import { ArrowUpRight } from '../../ui/icons';
import { validateContact, stripHtml, emailConfig, COOLDOWN_MS } from './contactLogic';

const EMPTY = { name: '', email: '', message: '' };
const input = 'w-full bg-paper border-2 border-ink rounded-2xl px-4 py-3 shadow-hard-sm focus:shadow-hard focus:outline-none transition-shadow placeholder:text-ink/35';

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="meta">{label}</label>
      {children}
      {error ? <p id={`${id}-error`} className="meta text-accent-ink">{error}</p> : null}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ kind: 'idle', message: '' });
  const lastSend = useRef(0);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const aria = (key) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {});

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (Date.now() - lastSend.current < COOLDOWN_MS) {
      setStatus({ kind: 'error', message: 'Please wait 30 seconds before sending another message.' });
      return;
    }
    const config = emailConfig();
    if (!config) {
      console.error('[contact] EmailJS environment variables are missing');
      setStatus({ kind: 'error', message: 'The contact form is not configured right now. Please reach me on LinkedIn instead.' });
      return;
    }
    lastSend.current = Date.now();
    setStatus({ kind: 'sending', message: '' });
    try {
      await emailjs.send(config.serviceId, config.templateId, {
        from_name: stripHtml(values.name), reply_to: values.email.trim(), message: stripHtml(values.message),
      }, config.publicKey);
      setValues(EMPTY);
      setStatus({ kind: 'success', message: '' });
    } catch (err) {
      console.error('[contact] send failed', err);
      setStatus({ kind: 'error', message: 'Your message could not be sent. Please try again in a moment.' });
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-8 scroll-mt-28">
      <DropCapHeading level={2} text="Get in touch" caps={['zighead']} className="text-5xl sm:text-6xl mb-8" />
      {status.kind === 'success' ? (
        <Frame className="p-8 max-w-2xl" role="status">
          <p className="display text-3xl">Message sent.</p>
          <p className="mt-3 text-ink/70">Thanks. I'll get back to you soon.</p>
          <button type="button" className="meta link mt-5" onClick={() => setStatus({ kind: 'idle', message: '' })}>send another</button>
        </Frame>
      ) : (
        <form noValidate onSubmit={onSubmit} className="max-w-2xl grid gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="name" label="name (optional)" error={errors.name}>
              <input id="name" name="name" autoComplete="name" className={input} value={values.name} onChange={set('name')} {...aria('name')} />
            </Field>
            <Field id="email" label="email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" className={input} value={values.email} onChange={set('email')} {...aria('email')} />
            </Field>
          </div>
          <Field id="message" label="message" error={errors.message}>
            <textarea id="message" name="message" rows={6} className={`${input} resize-y`} value={values.message} onChange={set('message')} {...aria('message')} />
          </Field>
          {status.kind === 'error' ? <p role="alert" className="meta text-accent-ink">{status.message}</p> : null}
          <div>
            <button type="submit" disabled={status.kind === 'sending'} className="brut brut-press h-12 px-6 rounded-full bg-accent text-on-accent font-semibold inline-flex items-center gap-2 disabled:opacity-60">
              {status.kind === 'sending' ? 'Sending…' : 'Send'} <ArrowUpRight width={14} height={14} />
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
