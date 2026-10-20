export const COOLDOWN_MS = 30000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function stripHtml(s) {
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function validateContact({ name, email, message }) {
  const errors = {};
  if (name.length > 100) errors.name = 'Too long';
  if (!email.trim()) errors.email = 'Required';
  else if (!EMAIL.test(email.trim())) errors.email = 'Invalid email address';
  if (!message.trim()) errors.message = 'Required';
  else if (message.length > 5000) errors.message = 'Too long';
  return errors;
}

export function emailConfig(env = import.meta.env) {
  const serviceId = env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = env.REACT_APP_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return null;
  return { serviceId, templateId, publicKey };
}
