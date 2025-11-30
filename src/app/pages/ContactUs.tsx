import {useEffect} from 'react';
import Header from '@/components/HeaderFollow'

import Lenis from 'lenis'


export default function ContactUs(){
    
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });
        
        return () => {
            lenis.destroy();
        };
    }, []);

    return(
        <>
        <div className='w-full h-[35vh] flex flex-col bg-black'
                    style={{
                        backgroundImage: `url('/assets/patterns.png')`,
                        backgroundSize: '150px',
                        backgroundPosition: 'center',
                        }}
                >
                    <div className='absolute h-[35vh] inset-0 bg-black opacity-85'></div>
                    <div className='relative w-full h-full flex'>
                        <Header />
                        <div className='w-full h-full flex flex-col items-center justify-end'>
                            <p className='text-2xl font-extralight -mb-14'
                            style={{color: 'rgb(232, 204, 72)'}}>
                                FOR YOUR CONCERNS
                            </p>
                            <h1 className='text-[11rem] text-white sans font-extrabold tracking-wider -mb-19'>
                                CONTACT US
                            </h1>
                        </div>
                    </div>
            </div>
        <div className='w-full h-[75vh] p-2 pt-10 flex'>
            <div className='w-full h-full flex'>
                <div className='w-2/3 h-full flex flex-col p-6'>
                    <div className='mb-4'>
                        <h2 className='text-2xl font-bold mb-1'>GET IN TOUCH</h2>
                        <p className='text-sm text-gray-600'>Have feedback or found an issue? Send us a message and we'll get back to you as soon as possible.</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); /* TODO: storing */ }} className='flex-1 flex flex-col'>
                        <label className='text-sm font-semibold mb-1'>FULL NAME</label>
                        <input
                            type='text'
                            name='fullName'
                            placeholder='Your full name'
                            className='mb-4 border border-gray-300 p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-none'
                        />

                        <label className='text-sm font-semibold mb-1'>EMAIL</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='you@example.com'
                            className='mb-4 border border-gray-300 p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-none'
                        />

                        <label className='text-sm font-semibold mb-1'>TITLE</label>
                        <input
                            type='text'
                            name='title'
                            placeholder='Subject or short title'
                            className='mb-4 border border-gray-300 p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-none'
                        />

                        <label className='text-sm font-semibold mb-1'>MESSAGE</label>
                        <textarea
                            name='message'
                            rows={6}
                            placeholder='Write your message here...'
                            className='mb-4 border border-gray-300 p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none rounded-none'
                        />

                        <div className='mt-auto'>
                            <button
                                type='submit'
                                className='inline-flex items-center justify-center bg-black text-white px-10 py-3 cursor-pointer font-light hover:bg-white transition-all duration-300
                                hover:text-black border-2 border-black hover:text-lg'
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
                <div className='w-1/3 h-full flex flex-col p-2 gap-2 justify-center'>
                    <h1 className='text-2xl font-semibold'>
                        WE ARE WELCOME TO ANY FEEDBACK!
                    </h1>
                    <div className='w-full px-3'>
                        <p className='text-justify'>
                            This site is under continuous development — we're actively improving features, refining the design,
                            and fixing bugs. Your feedback helps us prioritize what to build next and make the experience better
                            for everyone. If you have suggestions, find a bug, or want to request a feature, please reach out via
                            the contact form below or email us. We appreciate your input and will respond as soon as we can.
                        </p>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-3'>
                            <div className='space-y-1 p-2'>
                                <h3 className='text-sm font-semibold'>EMAIL</h3>
                                <p className='text-sm leading-snug'>
                                    mailsample@batb.ph<br />
                                    stopsexample@gmail.com
                                </p>
                            </div>
                            <div className='space-y-1 p-2'>
                                <h3 className='text-sm font-semibold'>PHONE</h3>
                                <p className='text-sm leading-snug'>
                                    123-456-789 (10+)<br />
                                    0905-341-5915
                                </p>
                            </div>
                            <div className='space-y-1 p-2'>
                                <h3 className='text-sm font-semibold'>ADDRESS</h3>
                                <p className='text-sm leading-snug'>
                                    1234 sample St., Town<br />
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