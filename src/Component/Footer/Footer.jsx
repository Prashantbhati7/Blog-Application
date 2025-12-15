import React from 'react'
import logo from '../../../assets/pi.png'

function Footer() {
  return (
   <footer className="border-t mb-0 fixed w-full h-full text-white border-gray-200 bg-[#13322b]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
         
          <div className="space-y-2">
            {/* <img src={logo} alt="logo" className='h-[1]' /> */}

            <h2 className="text-lg transition delay-100 duration-300 text-shadow-sm hover:text-shadow-green-500 font-semibold text-white">
             <img src={logo} className='h-10' alt="" /> Feedlyx
            </h2>
            <p className="max-w-sm text-sm text-white">
              A simple blog project to share thoughts and learn web development.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-sm">
            <h3 className="font-medium text-shadow-white">Contact</h3>
            <p className="text-white">Email: VoidNotes@gmail.com</p>
          </div>

          {/* Social Links */}
          <div className="space-y-2 text-sm">
            <h3 className="font-medium text-white">Follow</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-blue-600"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-blue-600"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-blue-600"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-shadow-white">
          © {new Date().getFullYear()} MyBlog. Built for learning.
        </div>

      </div>
    </footer>
  )
}

export default Footer
