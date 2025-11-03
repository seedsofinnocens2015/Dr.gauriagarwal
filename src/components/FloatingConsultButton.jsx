import React from 'react';

const FloatingConsultButton = () => (
  <a
    href="https://wa.me/919810350512"
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed z-50 bottom-5 right-4 sm:bottom-6 sm:right-6 sm:bg-[#25D366] hover:bg-[#25D366] rounded-full flex items-center gap-1 px-4 py-2.5 sm:py-1 sm:px-5 focus:outline-none"
    // style={{
    //   boxShadow: '0 6px 24px 0 rgba(37,211,102,.16), 0 1.5px 4px 0 rgba(0,0,0,.08)'
    // }}
  >
    <span
      className="flex items-center justify-center rounded-full bg-[#25D366] h-14 w-14 sm:h-10 sm:w-10 mr-0"
    >
      <img
        src="/Images/whatsapp_PNG20 1.png"
        alt=""
        className="h-10 w-10 sm:h-7 sm:w-7 object-contain"
        style={{ filter: 'drop-shadow(0 0 4px #25D36633)' }}
      />
    </span>
    <span className="hidden sm:inline text-[17px] font-semibold text-white">Chat with us</span>
  </a>
)

export default FloatingConsultButton;
