import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Header from "@/components/HeaderFollow.tsx";

import Lenis from 'lenis';
import { useContactForm } from '@/hooks/useContactForm';

export default function ContactUs() {
  const contactForm = useContactForm();
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (contactForm.status === 'success') {
      setAttemptedSubmit(false);
    }
  }, [contactForm.status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttemptedSubmit(true);
    try {
      const result = await contactForm.submit();
      if (result) {
        setAttemptedSubmit(false);
      }
    } catch (error) {
      // Error message handled in hook state
    }
  };

  const showError = (field: keyof typeof contactForm.values) =>
    attemptedSubmit && Boolean(contactForm.errors[field]);

  return (
    <>
      <div
        className="w-full h-[35vh] flex flex-col bg-black select-none" 
        style={{
          backgroundImage: `url('/assets/storefront_assets/patterns.png')`,
          backgroundSize: '150px',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute h-[35vh] inset-0 bg-black opacity-85"></div>
        <div className="relative w-full h-full flex">
          <Header />
          <div className="w-full h-full flex flex-col items-center justify-end">
            <p
              className="text-2xl font-extralight -mb-14"
              style={{ color: 'rgb(232, 204, 72)' }}
            >
              FOR YOUR CONCERNS
            </p>
            <h1 className="text-[11rem] text-white sans font-extrabold tracking-wider -mb-19">
              CONTACT US
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full  p-2 pt-10 flex">
        <div className="w-full h-full flex">
          <div className="w-2/3 h-full flex flex-col p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">GET IN TOUCH</h2>
              <p className="text-sm text-gray-600">
                Have feedback or found an issue? Send us a message and we'll get
                back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <label className="text-sm font-semibold mb-1">FULL NAME</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={contactForm.values.fullName}
                onChange={(event) =>
                  contactForm.updateField('fullName', event.target.value)
                }
                aria-invalid={showError('fullName') ? 'true' : 'false'}
                className={`mb-1 border p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-none ${
                  showError('fullName') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('fullName') && (
                <p className="text-xs text-red-600 mb-3">
                  {contactForm.errors.fullName}
                </p>
              )}
              {!showError('fullName') && <div className="mb-3" />}

              <label className="text-sm font-semibold mb-1">EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={contactForm.values.email}
                onChange={(event) =>
                  contactForm.updateField('email', event.target.value)
                }
                aria-invalid={showError('email') ? 'true' : 'false'}
                className={`mb-1 border p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-none ${
                  showError('email') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('email') && (
                <p className="text-xs text-red-600 mb-3">
                  {contactForm.errors.email}
                </p>
              )}
              {!showError('email') && <div className="mb-3" />}

              <label className="text-sm font-semibold mb-1">TITLE</label>
              <input
                type="text"
                name="title"
                placeholder="Subject or short title"
                value={contactForm.values.title}
                onChange={(event) =>
                  contactForm.updateField('title', event.target.value)
                }
                aria-invalid={showError('title') ? 'true' : 'false'}
                className={`mb-1 border p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-none ${
                  showError('title') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('title') && (
                <p className="text-xs text-red-600 mb-3">
                  {contactForm.errors.title}
                </p>
              )}
              {!showError('title') && <div className="mb-3" />}

              <label className="text-sm font-semibold mb-1">MESSAGE</label>
              <textarea
                name="message"
                rows={6}
                placeholder="Write your message here..."
                value={contactForm.values.message}
                onChange={(event) =>
                  contactForm.updateField('message', event.target.value)
                }
                aria-invalid={showError('message') ? 'true' : 'false'}
                className={`mb-1 border p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none rounded-none ${
                  showError('message') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('message') && (
                <p className="text-xs text-red-600 mb-3">
                  {contactForm.errors.message}
                </p>
              )}
              {!showError('message') && <div className="mb-3" />}

              {contactForm.submitError && (
                <p className="text-sm text-red-600 mb-3">
                  {contactForm.submitError}
                </p>
              )}
              {contactForm.submitSuccessMessage && (
                <p className="text-sm text-emerald-600 mb-3">
                  {contactForm.submitSuccessMessage}
                </p>
              )}

              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={contactForm.isSubmitting}
                  className="inline-flex items-center justify-center bg-black text-white px-10 py-3 cursor-pointer font-light hover:bg-white transition-all duration-300
                                hover:text-black border-2 border-black hover:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactForm.isSubmitting ? 'SENDING...' : 'SUBMIT'}
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/3 h-full flex flex-col p-2 gap-2 justify-center">
            <h1 className="text-2xl font-semibold">
              WE ARE WELCOME TO ANY FEEDBACK!
            </h1>
            <div className="w-full px-3">
              <p className="text-justify">
                This site is under continuous development — we're actively
                improving features, refining the design, and fixing bugs. Your
                feedback helps us prioritize what to build next and make the
                experience better for everyone. If you have suggestions, find a
                bug, or want to request a feature, please reach out via the
                contact form below or email us. We appreciate your input and
                will respond as soon as we can.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-3">
                <div className="space-y-1 p-2">
                  <h3 className="text-sm font-semibold">EMAIL</h3>
                  <p className="text-sm leading-snug">
                    mailsample@batb.ph
                    <br />
                    stopsexample@gmail.com
                  </p>
                </div>
                <div className="space-y-1 p-2">
                  <h3 className="text-sm font-semibold">PHONE</h3>
                  <p className="text-sm leading-snug">
                    123-456-789 (10+)
                    <br />
                    0905-341-5915
                  </p>
                </div>
                <div className="space-y-1 p-2">
                  <h3 className="text-sm font-semibold">ADDRESS</h3>
                  <p className="text-sm leading-snug">
                    1234 sample St., Town
                    <br />
                    City, Country
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
