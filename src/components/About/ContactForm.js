import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoSendSharp} from 'react-icons/io5'

import emailjs from 'emailjs-com';


const ContactForm = () => {
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
    onSubmit: (values, {resetForm}) => {
      sendEmail(values)
      console.log(values);
      resetForm()
    },
  });

  const sendEmail = (values) => {
    
    const { name, email, message } = values;

    emailjs.send('service_02y1b2a', 'template_0lpcm0l', {
        from_name: name,
        reply_to: email,
        message: message,
      }, 'QDMo21gqwu5H1QJj2')
        .then((result) => {
          console.log('Email successfully sent:', result.text);
        }, (error) => {
          console.error('Error sending email:', error.text);
        });
  };

  return (
    <form className="lg:px-14 mb-20" id="contactform" onSubmit={formik.handleSubmit}>
        <p className="mb-6 dark:text-rose-50">Send me a message via this form or contact me yourself <span className="font-bold text-rose-600 dark:text-orange-300 hover:underline transition-all duration-100">@jul.guinot@gmail.com!</span></p>
      <div className="flex lg:flex-row flex-col lg:gap-10">
        <div className="mb-4">
          <label
            className="block text-rose-600 dark:text-orange-300 text-sm font-bold lg:mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none mb-3 backdrop-blur-md bg-white/20 dark:bg-black/20 py-2 px-3 text-black dark:text-white rounded-lg leading-tight focus:outline-none transition-all duration-200 shadow-lg focus:shadow-xl"
            id="name"
            type="text"
            placeholder=""
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
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
            className="appearance-none mb-3 backdrop-blur-md bg-white/20 dark:bg-black/20 py-2 px-3 text-black dark:text-white rounded-lg leading-tight focus:outline-none transition-all duration-200 shadow-lg focus:shadow-xl"
            id="email"
            type="email"
            placeholder=""
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
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
          className="w-full appearance-none mb-2 backdrop-blur-md bg-white/20 dark:bg-black/20 py-2 px-3 text-black dark:text-white rounded-lg leading-tight focus:outline-none transition-all duration-200 shadow-lg focus:shadow-xl"
          id="message"
          placeholder=""
          {...formik.getFieldProps("message")}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="text-red-500 text-sm">{formik.errors.message}</div>
        ) : null}
      </div>
      <div className="flex flex-row items-center justify-between">
        <button
          className="text-black dark:text-white backdrop-blur-md bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200 pressable flex flex-row items-center content-center gap-2 font-bold py-2 px-4 focus:outline-none rounded-full shadow-lg hover:shadow-xl"
          type="submit"
        >
          Send
          <IoSendSharp size={22}></IoSendSharp>
        </button>
        
      </div>
    </form>
  );
};

export default ContactForm;
