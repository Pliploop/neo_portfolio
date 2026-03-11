import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoSendSharp, IoCheckmarkCircleOutline, IoWarningOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

const stripHtml = (str) => str.replace(/<[^>]*>/g, '').trim();

const Field = ({ label, error, touched, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-widest text-rose-500 dark:text-orange-400">
      {label}
    </label>
    {children}
    <AnimatePresence>
      {touched && error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1"
          role="alert"
        >
          <IoWarningOutline size={13} />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const inputClass =
  "w-full appearance-none backdrop-blur-md bg-white/30 dark:bg-white/5 py-3 px-4 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 leading-tight focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg focus:shadow-rose-200/30 dark:focus:shadow-orange-900/30 rounded-xl ring-1 ring-black/5 dark:ring-white/8 focus:ring-rose-300/50 dark:focus:ring-orange-400/30";

const ContactForm = () => {
  const lastSubmitRef = useRef(0);
  const [cooldownMsg, setCooldownMsg] = useState('');
  const [sendStatus, setSendStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const now = Date.now();
      if (now - lastSubmitRef.current < 30000) {
        setCooldownMsg('Please wait 30 seconds before sending another message.');
        return;
      }
      const sanitized = {
        name: stripHtml(values.name),
        email: values.email,
        message: stripHtml(values.message),
      };
      lastSubmitRef.current = now;
      setCooldownMsg('');
      setSendStatus('sending');
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { from_name: sanitized.name, reply_to: sanitized.email, message: sanitized.message },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      ).then(() => {
        setSendStatus('success');
        resetForm();
      }).catch(() => {
        setSendStatus('error');
      });
    },
  });

  if (sendStatus === 'success') {
    return (
      <div className="lg:px-14 mb-20" id="contactform">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-white/30 dark:bg-black/20 backdrop-blur-sm shadow-lg p-8 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <IoCheckmarkCircleOutline size={36} />
            <p className="text-xl font-bold">Message sent!</p>
          </div>
          <p className="text-sm dark:text-rose-50 text-gray-600 leading-relaxed">
            Thanks for reaching out — I'll get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => setSendStatus(null)}
            className="self-start text-sm text-rose-600 dark:text-orange-300 font-medium hover:underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            Send another message →
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <form className="lg:px-14 mb-20" id="contactform" onSubmit={formik.handleSubmit} noValidate>
      <p className="mb-6 text-sm dark:text-rose-50 text-gray-600 leading-relaxed">
        Send me a message via this form or reach me directly at{' '}
        <a
          href="mailto:jul.guinot@gmail.com"
          className="font-semibold text-rose-600 dark:text-orange-300 hover:underline transition-all duration-100"
        >
          jul.guinot@gmail.com
        </a>
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="flex-1">
            <Field label="Name" error={formik.errors.name} touched={formik.touched.name}>
              <input
                className={inputClass}
                id="name"
                type="text"
                placeholder="Your name"
                aria-describedby={formik.touched.name && formik.errors.name ? "name-error" : undefined}
                {...formik.getFieldProps("name")}
              />
            </Field>
          </div>
          <div className="flex-1">
            <Field label="Email *" error={formik.errors.email} touched={formik.touched.email}>
              <input
                className={inputClass}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                aria-describedby={formik.touched.email && formik.errors.email ? "email-error" : undefined}
                {...formik.getFieldProps("email")}
              />
            </Field>
          </div>
        </div>

        <Field label="Message *" error={formik.errors.message} touched={formik.touched.message}>
          <div className="relative">
            <textarea
              className={`${inputClass} min-h-[140px] resize-none`}
              id="message"
              placeholder="Tell me about your project, collaboration idea, or just say hello!"
              aria-describedby={formik.touched.message && formik.errors.message ? "message-error" : undefined}
              {...formik.getFieldProps("message")}
            />
            <span className="absolute bottom-3 right-4 text-xs text-black/25 dark:text-white/25 pointer-events-none">
              {formik.values.message.length > 0 ? formik.values.message.length : ''}
            </span>
          </div>
        </Field>

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="submit"
            disabled={sendStatus === 'sending'}
            className="self-end h-9 px-5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-400 hover:to-orange-300 shadow-md hover:shadow-rose-300/40 active:scale-[0.97] transition-all duration-200 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {sendStatus === 'sending' ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending…
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Send message
                  <IoSendSharp size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {cooldownMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-amber-500 flex items-center gap-1"
                role="alert"
              >
                <IoWarningOutline size={13} />
                {cooldownMsg}
              </motion.p>
            )}
            {sendStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-500 flex items-center gap-1"
                role="alert"
              >
                <IoWarningOutline size={13} />
                Something went wrong — please email me directly at jul.guinot@gmail.com
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
