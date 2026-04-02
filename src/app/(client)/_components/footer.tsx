import React from 'react'
import Link from 'next/link';

const Footer = () => {
    return (
        <div className=' w-full bg-gray-800 text-white  mt-8 bottom-0 left-0 p-4 '>
            <div className='text-sm w-full flex justify-center'><h4>&copy; 2024 Choco. All rights reserved.</h4></div>
              <div className='mt-4 w-full px-4'>
                    <p className='text-white font-bold '>Follow us on social media</p>
                    <Link href='https://github.com/ank09yadav' target='blank'> GitHub </Link>
                    <Link href='https://twitter.com/ank09yadav' target='blank'> Twitter </Link>
                    <Link href='https://instagram.com/ank09yadav' target='blank'> instagram </Link>
                    <Link href='https://Linkedin.co/in/ank09yadav' target='blank'> LinkedIn </Link>
                    <Link href='https://telegram.com/ank09yadav' target='blank'> telegram </Link>
                </div>
            <div className='flex justify-between w-full px-4 mt-4'>
              
                <div >
                    <p className='text-white font-bold'>Developer Details</p>
                    <p className='text-sm dark:font-black'>Ankur Yadav</p>
                    <p className='text-sm dark:font-black font-normal'>web | android Developer</p>
                    <p className='text-sm dark:font-black'>ankur.appdev@gmail.com</p>

                </div>
                 <div>
                    <p className='text-white font-bold'>Support</p>
                    <p className='text-sm dark:font-black'>Submit Ticket</p>
                    <p className='text-sm dark:font-black'>Documentation</p>
                    <p className='text-sm dark:font-black'>Guides</p>
                </div>
                <div>
                    <p className='text-white font-bold'>Company</p>
                    <p className='text-sm dark:font-black'>About</p>
                    <p className='text-sm dark:font-black'>Blog</p>
                    <p className='text-sm dark:font-black'>Jobs</p>
                    <p className='text-sm dark:font-black'>Press</p>
                </div>
                <div>
                    <p className='text-white font-bold'>Legal</p>
                    <p className='text-sm dark:font-black'>Terms of Service</p>
                    <p className='text-sm dark:font-black'>Privacy Policy</p>
                    <p className='text-sm dark:font-black'>License</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
