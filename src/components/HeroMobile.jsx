import React from 'react';
import ContactForm from './ContactForm';

const HeroMobile = () => (
  <section className="block sm:hidden w-full pb-7 relative">
    {/* Hero image */}
    {/* <img
      src="/Images/Banner 03.png"
      alt="Happy family banner"
      className="w-full h-[240px] object-cover"
    /> */}
    <video
      src="/Images/Banner 03.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-[200px] object-cover"
    />
    {/* ContactForm overlay */}
    <div className=" left-0 right-0 bottom-0 flex justify-center z-10">
      <div className="w-full px-4">
        <div className="mt-3.5">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

export default HeroMobile;
