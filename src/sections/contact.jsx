'use client';

import React from 'react';

const CONTACT_FORM_FLAG = 'hasSendContactForm';

function useLocalStorage(key) {
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    setState(localStorage.getItem(key));
  }, [key]);

  function setStorage(item) {
    localStorage.setItem(key, item);
    setState(item);
  }

  function remove() {
    localStorage.removeItem(key);
    setState(null);
  }

  return [state, setStorage, remove];
}

export const ContactSection = () => {
  const [savedDate, setSavedDate, removeFlag] = useLocalStorage(CONTACT_FORM_FLAG);

  const alreadySend = React.useMemo(() => {
    if (!savedDate) return false;

    try {
      const dateObj = new Date(savedDate);
      const savedDateIsToday = dateObj.getDate() === (new Date()).getDate();
      if (!savedDateIsToday) removeFlag();
      return savedDateIsToday;
    } catch (err) {
      console.error(err);
    }
  }, [savedDate, removeFlag]);

  const formRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedDate((new Date()).toString());
    formRef.current?.reset();
  };

  return (
    <section id="contact" className="scroll-m-14 w-full bg-white pb-20">
      <div className="text-center pt-12 md:pt-16">
        <a href="#contact">
          <h3 className="font-bold text-slate-800 text-3xl">Contact me</h3>
        </a>
        <p className="text-slate-400 mt-2 text-sm">Let&apos;s work together</p>
      </div>

      <div className="max-w-lg mx-auto px-4 md:px-0 mt-10 flex flex-col gap-4">
        {alreadySend && (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 flex items-center gap-3">
            <span className="text-xl">📨</span>
            <p className="text-slate-700 font-medium text-sm">
              Message sent!{' '}
              <span className="text-slate-500 font-normal">I&apos;ll get back to you soon.</span>
            </p>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col gap-5">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-label="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={alreadySend}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Send message
            </button>
          </form>

          <div className="border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-400">or reach me directly at</p>
            <a
              href="mailto:casantiago.me@gmail.com"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              casantiago.me@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
