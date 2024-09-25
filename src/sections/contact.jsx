'use client';
import React from 'react';

const CONTACT_FORM_FLAG = 'hasSendContactForm';

function useLocalStorage(key) {
  const [state, setState] = React.useState(localStorage.getItem(key));
  
  function setStorage(item) {
    localStorage.setItem(key, item);
    console.log('setting');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (alreadySend) return;

    setSavedDate((new Date()).toString());
  }

  return (
    <section id="contact" className="mb-[72px] mt-[52px] w-full scroll-m-14">
      <a href="#contact">
        <h3 className="text-center font-semibold text-slate-600 text-3xl">Contact me</h3>
      </a>


      <div className="w-full md:w-3/5 lg:w-2/5 xl:w-2/6 mx-auto border-2 border-slate-100 bg-white rounded-lg p-3 mt-8">
        {alreadySend && (
          <>
            <h4 className="text-center font-semibold text-slate-600">Contact information sent! <span className="inline-block -translate-y-[3px]">📨</span></h4>
            <p className="text-center text-slate-500 mt-2">I will contact you soon</p>
          </>
        )}
        {!alreadySend &&
          <form
            className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-x-8 gap-y-4"
            onSubmit={handleSubmit}
          >
            <label
              className="text-slate-600 font-semibold col-start-1 col-span-1 row-start-1 row-span-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-slate-100 rounded-md bg-gray-50 text-slate-500 w-full col-start-2 col-span-1 row-start-1 row-span-1 px-2 py-1"
              name="email"
              id="email"
              type="email"
              required
              aria-label="email"
            />
            <label
              className="col-start-1 col-span-1 text-slate-600 row-span-1 row-start-2"
            >
              Leave a comment
            </label>
            <textarea
              className="col-start-2 col-span-1 border border-slate-100 px-2 py-1 rounded-md bg-gray-50 text-slate-500 w-full min-h-[80px] row-span-1 row-start-2"
            />
            <div className="row-start-3 col-start-2 w-full h-full flex justify-end">
              <button
                className="self-end px-5 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        }
      </div>
      <div className='pt-5'>
        <p className='text-slate-600 text-center'>or send an email to: </p>
        <a className='text-slate-700 font-semibold text-center w-full block select-text' href="mailto:casantiago.me@gmail.com">casantiago.me@gmail.com </a>
      </div>
    </section>
  );
}
