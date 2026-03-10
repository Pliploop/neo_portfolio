import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoSendSharp, IoCheckmarkCircleOutline } from 'react-icons/io5';

import emailjs from '@emailjs/browser';

const stripHtml = (str) => str.replace(/<[^>]*>/g, '').trim();

const ContactForm = () => {
  const lastSubmitRef = useRef(0);
  const [cooldownMsg, setCooldownMsg] = useState('');
  const [sendStatus, setSendStatus] = useState(null); // null | 'success' | 'error'

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
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
      sendEmail(sanitized);
      resetForm();
    },
  });

  const sendEmail = (values) => {
    const { name, email, message } = values;
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      { from_name: name, reply_to: email, message: message },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setSendStatus('success');
    }).catch(() => {
      setSendStatus('error');
    });
  };

  if (sendStatus === 'success') {
    return (
      <div className="lg:px-14 mb-20 flex flex-col items-start gap-4" id="contactform">
        <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
          <IoCheckmarkCircleOutline size={32} />
          <p className="text-lg font-bold">Message sent!</p>
        </div>
        <p className="dark:text-rose-50 text-gray-600">Thanks for reaching out — I'll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setSendStatus(null)}
          className="text-sm text-rose-600 dark:text-orange-300 underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="lg:px-14 mb-20" id="contactform" onSubmit={formik.handleSubmit}>
      <p className="mb-6 dark:text-rose-50">
        Send me a message via this form or reach me directly at{' '}
        <a
          href="mailto:jul.guinot@gmail.com"
          className="font-bold text-rose-600 dark:text-orange-300 hover:underline transition-all duration-100"
        >
          jul.guinot@gmail.com
        </a>
      </p>
      <div className="flex lg:flex-row flex-col lg:gap-10">
        <div className="mb-4">
          <label
            className="block text-rose-600 dark:text-orange-300 text-sm font-bold lg:mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full appearance-none mb-3 backdrop-blur-md bg-white/20 dark:bg-black/20 py-3 px-4 text-black dark:text-white leading-tight focus:outline-none transition-all duration-200 shadow-md focus:shadow-rose-200/40 focus:shadow-xl rounded-xl"
            id="name"
            type="text"
            placeholder="Your name"
            aria-describedby={formik.touched.name && formik.errors.name ? "name-error" : undefined}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div id="name-error" role="alert" className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-rose-600 dark:text-orange-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full appearance-none mb-3 backdrop-blur-md bg-white/20 dark:bg-black/20 py-3 px-4 text-black dark:text-white leading-tight focus:outline-none transition-all duration-200 shadow-md focus:shadow-rose-200/40 focus:shadow-xl rounded-xl"
            id="email"
            type="email"
            placeholder="your.email@example.com"
            aria-describedby={formik.touched.email && formik.errors.email ? "email-error" : undefined}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div id="email-error" role="alert" className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
      </div>
      <div className="mb-6">
        <label
          className="block text-rose-600 dark:text-orange-300 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="w-full appearance-none mb-2 backdrop-blur-md bg-white/20 dark:bg-black/20 py-3 px-4 text-black dark:text-white leading-tight focus:outline-none transition-all duration-200 shadow-md focus:shadow-rose-200/40 focus:shadow-xl rounded-xl min-h-[120px] resize-vertical"
          id="message"
          placeholder="Tell me about your project, collaboration idea, or just say hello!"
          aria-describedby={formik.touched.message && formik.errors.message ? "message-error" : undefined}
          {...formik.getFieldProps("message")}
        />
        {formik.touched.message && formik.errors.message ? (
          <div id="message-error" role="alert" className="text-red-500 text-sm">{formik.errors.message}</div>
        ) : null}
      </div>
      <div className="flex flex-row items-center justify-between">
        <button
          className="text-black dark:text-white backdrop-blur-md bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-200 pressable flex flex-row items-center content-center gap-2 font-bold py-2 px-4 focus:outline-none rounded-full shadow-md hover:shadow-lg"
          type="submit"
        >
          Send
          <IoSendSharp size={22}></IoSendSharp>
        </button>
        {cooldownMsg && (
          <p className="text-amber-500 text-sm" role="alert">{cooldownMsg}</p>
        )}
        {sendStatus === 'error' && (
          <p className="text-red-500 text-sm" role="alert">Something went wrong — please try emailing me directly.</p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
