import React, { useState, useEffect } from 'react'
import ContactForm from '../components/ContactForm'
import FloatingConsultButton from '../components/FloatingConsultButton'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openReviewModal = (review) => {
    setSelectedReview(review)
    setIsModalOpen(true)
  }

  const closeReviewModal = () => {
    setIsModalOpen(false)
    setSelectedReview(null)
  }

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
        setSelectedReview(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isModalOpen])

  // Features used in Delivered Healthy Babies section
  const deliveredFeatures = [
    {
      image: '/Images/01.png',
      titleLines: ['North India’s', 'FirstIVF Chain with In', 'house Genetic Lab'],
      descLines: ['Fewer pregnancy losses &', 'Less uncertainty']
    },
    {
      image: '/Images/02.png',
      titleLines: ['Recognition &', 'Affiliation'],
      descLines: ['BW Healthcare 40 under 40', 'ET Health world Hall of Fame', 'IVF Specialist']
    },
    {
      image: '/Images/03.png',
      titleLines: ['Advanced Infertility', 'Treatment Services'],
      descLines: ['Dedicated Fetal Medicine', 'Department Multidisciplinary', 'team of specialists']
    }
  ]

  // Mobile-only infinite carousel for features
  const MobileFeaturesCarousel = () => {
    const items = deliveredFeatures
    const [index, setIndex] = useState(1) // start at first real slide
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)

    useEffect(() => {
      if (!items || items.length === 0) return
      const id = setInterval(() => {
        setIsTransitionEnabled(true)
        setIndex((prev) => prev + 1)
      }, 2500)
      return () => clearInterval(id)
    }, [items])

    const handleTransitionEnd = () => {
      const total = items.length
      if (index === total + 1) {
        setIsTransitionEnabled(false)
        setIndex(1)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsTransitionEnabled(true))
        })
      }
    }

    const slides = [items[items.length - 1], ...items, items[0]]

    return (
      <div className="sm:hidden overflow-hidden mt-10">
        <div
          className={`flex ${isTransitionEnabled ? 'transition-transform duration-700 ease-out' : ''}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((feat, i) => (
            <div key={`${feat.titleLines[0]}-${i}`} className="w-full flex-shrink-0 px-4">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center">
                  <img src={feat.image} alt="feature" className="w-24 h-24 object-contain" />
                </div>
                <h4 className="mt-4 text-[#21417E] font-semibold text-base">
                  {feat.titleLines.map((t, idx) => (
                    <span key={idx} className="block">{t}</span>
                  ))}
                </h4>
                <p className="mt-2 text-gray-600 text-xs leading-snug">
                  {feat.descLines.map((d, idx) => (
                    <span key={idx} className="block">{d}</span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Video IDs for testimonials section
  const videoIds = [
    'E04J-XxA1Y0',
    'PzkrtU5dchg',
    'FJiwz5c-RWE',
    '5jdSZz1tpJg',
    'OpgqOL4fpoU',
    '8R4_6qzyS0Y'
  ]

  // Mobile-only infinite carousel for videos
  const MobileVideosCarousel = () => {
    const items = videoIds
    const [index, setIndex] = useState(1)
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)

    useEffect(() => {
      if (!items || items.length === 0) return
      const id = setInterval(() => {
        setIsTransitionEnabled(true)
        setIndex((prev) => prev + 1)
      }, 2800)
      return () => clearInterval(id)
    }, [items])

    const handleTransitionEnd = () => {
      const total = items.length
      if (index === total + 1) {
        setIsTransitionEnabled(false)
        setIndex(1)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsTransitionEnabled(true))
        })
      }
    }

    const slides = [items[items.length - 1], ...items, items[0]]

    return (
      <div className="sm:hidden overflow-hidden">
        <div
          className={`flex ${isTransitionEnabled ? 'transition-transform duration-700 ease-out' : ''}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((id, i) => (
            <div key={`${id}-${i}`} className="w-full flex-shrink-0 px-2">
              <div className="w-full aspect-video overflow-hidden shadow-md bg-black rounded-xl">
                <a
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full h-full relative"
                >
                  <img
                    src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt="YouTube thumbnail"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M66.52 7.74c-.78-2.93-3.09-5.24-6.02-6.02C55.79 1 33 1 33 1s-22.79 0-27.5 1.72c-2.93.78-5.24 3.09-6.02 6.02C-1.5 12.45-1.5 24-1.5 24s0 11.55 1.72 16.26c.78 2.93 3.09 5.24 6.02 6.02C10.21 47 33 47 33 47s22.79 0 27.5-1.72c2.93-.78 5.24-3.09 6.02-6.02C68.5 35.55 68.5 24 68.5 24s0-11.55-1.98-16.26z" fill="#FF0000" />
                      <path d="M26.94 32.06l17.64-10.06-17.64-10.06v20.12z" fill="white" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Mobile-only infinite carousel for maps
  const MobileMapCarousel = () => {
    const items = [
      {
        title: (
          <>
            SEEDS OF INNOCENCE IVF CENTRE - BEST IVF CENTRE IN <span className="text-[#CC2023]">GHAZIABAD</span>
          </>
        ),
        time: 'Timings: 9:00 AM - 1:00 PM',
        src:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.9941651313443!2d77.43600657529012!3d28.659893375649776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1c5b4d8b201%3A0x6502bf0f722f09a5!2sSeeds%20of%20Innocens%20IVF%20Centre-%20Best%20IVF%20Centre%20in%20Ghaziabad%20%7C%20Fertility%20Clinic!5e0!3m2!1sen!2sin!4v1762168602168!5m2!1sen!2sin',
      },
      {
        title: (
          <>
            SEEDS OF INNOCENCE IVF CENTRE - BEST IVF CENTRE IN <span className="text-[#CC2023]">DELHI</span>
          </>
        ),
        time: 'Timings: 2:00 PM - 6:00 PM',
        src:
          'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2065.4160333339305!2d77.20331691272258!3d28.532736663578216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce20320e1d805%3A0x7d88d4bcd484e5ec!2sSeeds%20of%20Innocens%20IVF%20Centre%20-%20Best%20IVF%20Centre%20in%20Delhi%20%7C%20Fertility%20Clinics!5e0!3m2!1sen!2sin!4v1761809915881!5m2!1sen!2sin',
      },
    ]

    const [index, setIndex] = useState(1)
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)

    useEffect(() => {
      if (!items || items.length === 0) return
      const id = setInterval(() => {
        setIsTransitionEnabled(true)
        setIndex((prev) => prev + 1)
      }, 3500)
      return () => clearInterval(id)
    }, [items])

    const handleTransitionEnd = () => {
      const total = items.length
      if (index === total + 1) {
        setIsTransitionEnabled(false)
        setIndex(1)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsTransitionEnabled(true))
        })
      }
    }

    const slides = [items[items.length - 1], ...items, items[0]]

    return (
      <div className="overflow-hidden">
        <div
          className={`flex ${isTransitionEnabled ? 'transition-transform duration-700 ease-out' : ''}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((m, i) => (
            <div key={i} className="w-full flex-shrink-0 px-2">
              <div className="w-full overflow-hidden">
                <h3 className="text-[#21417E] font-extrabold leading-tight px-3 pt-3">
                  <span className="block text-sm">{m.title}</span>
                </h3>
                <span className="block text-base px-3">{m.time}</span>
                <a
                  href="tel:9810350512"
                  className="block text-base text-gray-500 px-3 pb-3 hover:underline"
                  style={{ cursor: 'pointer' }}
                >
                  Phone: +91-9810350512
                </a>
                <div className="overflow-hidden">
                  <iframe
                    src={m.src}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map-${i}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Generic infinite marquee row using requestAnimationFrame (smooth, no pause)
  const MarqueeRow = ({ items, renderItem, direction = 'left', speed = 40 }) => {
    // speed: pixels per second
    const trackRef = React.useRef(null)
    const offsetRef = React.useRef(0)
    const widthRef = React.useRef(0)
    const rafRef = React.useRef(0)
    const lastTsRef = React.useRef(0)
    const pausedRef = React.useRef(false)

    useEffect(() => {
      const track = trackRef.current
      if (!track) return

      const measure = () => {
        widthRef.current = track.scrollWidth / 2
        // start midpoint for right-moving so no seam on load
        offsetRef.current = direction === 'right' ? -widthRef.current : 0
        track.style.willChange = 'transform'
      }

      measure()

      const onResize = () => {
        measure()
      }
      window.addEventListener('resize', onResize)

      const step = (ts) => {
        if (!lastTsRef.current) lastTsRef.current = ts
        const dt = (ts - lastTsRef.current) / 2000 // seconds (slower)
        lastTsRef.current = ts

        let current = offsetRef.current
        if (!pausedRef.current) {
          const dir = direction === 'left' ? -1 : 1
          const dx = dir * speed * dt
          current = offsetRef.current + dx
          const w = widthRef.current || 1

          if (direction === 'left' && Math.abs(current) >= w) {
            current += w
          } else if (direction === 'right' && current >= 0) {
            current -= w
          }

          offsetRef.current = current
        }

        if (track) track.style.transform = `translate3d(${offsetRef.current}px,0,0)`

        rafRef.current = requestAnimationFrame(step)
      }

      rafRef.current = requestAnimationFrame(step)
      return () => {
        cancelAnimationFrame(rafRef.current)
        window.removeEventListener('resize', onResize)
        lastTsRef.current = 0
      }
    }, [items, direction, speed])

    const pauseHandlers = {
      onMouseEnter: () => (pausedRef.current = true),
      onMouseLeave: () => (pausedRef.current = false),
      onFocus: () => (pausedRef.current = true),
      onBlur: () => (pausedRef.current = false)
    }

    return (
      <div className="relative overflow-hidden">
        {/* left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-16 lg:w-40 bg-gradient-to-r from-[#F3F5F9] to-transparent z-10"></div>
        {/* right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-16 lg:w-40 bg-gradient-to-l from-[#F3F5F9] to-transparent z-10"></div>
        <div ref={trackRef} className="flex select-none">
          {[...items, ...items].map((it, idx) => (
            <div key={idx} className="mr-2 sm:mr-3 lg:mr-4 last:mr-0">
              {renderItem(it, idx, pauseHandlers)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-4 sm:px-10 py-3 sm:py-3 flex items-center justify-between w-full border-b border-gray-100 relative sticky top-0 z-50">
        {/* Left Section - Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Logo - Mother holding baby illustration */}
          <div className="flex-shrink-0">
            <img
              src="/Images/Dr. Gauri logo 1.png"
              alt="Brand Logo"
              className="object-contain w-40 sm:w-48 md:w-64 h-auto"
            />
          </div>
        </div>

        {/* Middle Section - Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors animated-underline text-sm xl:text-base">
            About Us
          </a>
          {/* <a href="#success" className="text-gray-700 hover:text-red-600 transition-colors animated-underline text-sm xl:text-base">
            Success Stories
          </a> */}
          <a href="#international" className="text-gray-700 hover:text-red-600 transition-colors animated-underline text-sm xl:text-base">
            International IVF Patient
          </a>
          <a href="#news" className="text-gray-700 hover:text-red-600 transition-colors animated-underline text-sm xl:text-base">
            News And Media
          </a>
          <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors animated-underline text-sm xl:text-base">
            Contact Us
          </a>
        </nav>

        {/* Right Section - WhatsApp and Phone Number */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/919810350512"
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center bg-[#21417E] text-white rounded-full pr-3 sm:pr-7 pl-7 sm:pl-12 py-1 sm:py-2 shadow hover:bg-blue-800 transition-colors"
          >
            <span className="absolute -left-1 sm:-left-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center">
              <img
                src="/Images/whatsapp_PNG20 1.png"
                alt="WhatsApp"
                className="h-7 w-7 sm:h-12 sm:w-12 object-contain rounded-full"
              />
            </span>
            <span className="font-bold tracking-wide text-[13px] sm:text-[27px] leading-none">98103 50512</span>
          </a>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden ml-2 p-2 text-gray-700 hover:text-red-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg z-50">
            <nav className="flex flex-col py-4 px-4">
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-red-600 transition-colors py-3 border-b border-gray-100 animated-underline"
              >
                About Us
              </a>
              {/* <a
                href="#success"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-red-600 transition-colors py-3 border-b border-gray-100 animated-underline"
              >
                Success Stories
              </a> */}
              <a
                href="#international"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-red-600 transition-colors py-3 border-b border-gray-100 animated-underline"
              >
                International IVF Patient
              </a>
              <a
                href="#news"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-red-600 transition-colors py-3 border-b border-gray-100 animated-underline"
              >
                News And Media
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-red-600 transition-colors py-3 animated-underline"
              >
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Rest of the page content */}
      <main>
        {/* Banner Image */}
        <div className="w-full">
          <img src="/Images/Banner 02 2.png" alt="Banner" className="w-full h-full object-cover" />
        </div>

        {/* Contact Form Section */}
        <ContactForm />

        {/* Know Your Doctor Section*/}
        <section id="about" className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-[#F3F5F9] sm:ml-10 lg:ml-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left: Tilted photo card with ribbon */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* dotted background feel */}
                <div className="absolute -left-6 -bottom-6">
                  <img src="/Images/Final Ads 1.png" alt="Dotted Background" className="w-full h-full object-cover" />
                </div>
                <div className="transform rotate-1">
                  <img
                    src="/Images/gaurib 4.png"
                    alt="Dr. Gauri with newborns"
                    className="w-[520px] max-w-full h-auto object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="text-[#21417E] text-2xl sm:text-4xl lg:text-5xl font-bold mb-5">
                Know Your Doctor
              </h2>
              <div className="space-y-5 text-gray-700 leading-relaxed">
                <p >
                  Dr Gauri Agarwal is an internationally recognized Infertility & IVF specialist who holds over
                  15 years of experience in Gynecology and Infertility and has received many prestigious awards
                  and recognition. She is trained at prestigious medical institutes in Belgium and Singapore in
                  eradicating problems of Infertility and Assisted Reproductive Technologies.
                </p>
                <p>
                  Dr Gauri has been a visionary in the field of IVF and has hence been a pioneer in implementing
                  path-breaking research and use of new technologies/techniques like PRP and Genetic Screening
                  (PGS/PGD) to achieve success rates of up to 78% along with an assurance of Healthy Term Pregnancy
                  and Genetically Healthy Baby.
                </p>
                <p>
                  Dr Gauri is also a philanthropist and has been working tirelessly for the cause of women’s health
                  especially working in rural areas around Delhi NCR to educate the masses about the misconceptions of
                  infertility and to ensure it is not considered a taboo, otherwise resulting in mental trauma for the
                  female. She has also adopted a village on the outskirts of Mathura, ensuring good quality primary
                  healthcare for the residents.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Delivered Healthy Babies Banner */}
        <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
          {/* Right-side hero image */}
          <div className="absolute inset-y-0 right-0 hidden lg:block pointer-events-none select-none">
            <img
              src="/Images/Untitled-1a 4.png"
              alt="Mother lifting baby"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Content */}
              <div className="max-w-2xl">
                <h3 className="text-[#21417E] font-extrabold leading-tight">
                  <span className="block text-3xl sm:text-5xl">DELIVERED</span>
                  <span className="block text-3xl sm:text-5xl md:text-6xl mt-1">20,000+ HEALTHY BABIES</span>
                </h3>

                {/* Features */}
                {/* Mobile carousel */}
                <MobileFeaturesCarousel />

                {/* Tablet/Desktop grid */}
                <div className="mt-8 hidden sm:grid grid-cols-3 gap-8 sm:gap-10">
                  {/* Item 1 */}
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center">
                      {/* hand-heart icon */}
                      <img src="/Images/01.png" alt="Hand Heart" className="w-25 h-25 object-contain" />
                    </div>
                    <h4 className="mt-4 text-[#21417E] font-bold text-sm sm:text-xl">
                      North India's
                      <br />FirstIVF Chain with In
                      <br />house Genetic Lab
                    </h4>
                    <p className="mt-2 text-gray-600 text-sm leading-snug">
                      Fewer pregnancy losses
                      <br />Less uncertainty
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center">
                      {/* medal icon */}
                      <img src="/Images/02.png" alt="Medal" className="w-25 h-25 object-contain" />
                    </div>
                    <h4 className="mt-4 text-[#21417E] font-bold text-sm sm:text-xl">
                      Recognition &
                      <br />Affiliation
                    </h4>
                    <p className="mt-2 text-gray-600 text-sm leading-snug">
                      BW Healthcare 40 under
                      <br /> 40 ET Health world Hall
                      <br /> of Fame IVF Specialist
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center">
                      {/* baby-feet icon */}
                      <img src="/Images/03.png" alt="Baby Feet" className="w-25 h-25 object-contain" />
                    </div>
                    <h4 className="mt-4 text-[#21417E] font-bold text-sm sm:text-xl">
                      Advanced Infertility
                      <br />Treatment Services
                    </h4>
                    <p className="mt-2 text-gray-600 text-sm leading-snug">
                      Dedicated Fetal Medicine
                      <br /> Department Multidisciplinary
                      <br /> Team of Specialists
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column space holder for mobile */}
              <div className="lg:hidden">
                <img src="/Images/Untitled-1a 5.png" alt="Mother lifting baby" className="w-full h-auto object-cover mt-6" />
              </div>
            </div>
          </div>
        </section>
        {/* Best Treatment Plan for You */}
        <section className="relative overflow-hidden bg-[#FAFAFB]">
          <div className="">
            <div className="flex justify-center items-center lg:py-15">
              <h2 className="text-[#21417E] text-2xl sm:text-4xl lg:text-5xl font-bold  text-center">
                BEST TREATMENT PLAN FOR YOU
              </h2>
            </div>
            <img src="/Images/video.gif" alt="Best Treatment Plan for You" className="w-full h-auto object-cover" />
          </div>
        </section>
        {/* IVF Center With In-house Genetics Lab */}
        <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center px-4 sm:px-6 lg:px-8">
            {/* Left: collage image */}
            <div className="relative">
              <div>
                <img
                  src="/Images/Coffee Booklel 03 1.png"
                  alt="Dr. Gauri with newborns"
                  className="w-[700px] max-w-full h-auto object-cover rounded-md relative z-10"
                />
              </div>
              {/* dotted background feel */}
              <div className="absolute sm:-left-25 sm:-bottom-25 -left-10 -bottom-10 z-0">
                <img src="/Images/Final Ads 1.png" alt="Dotted Background" className="sm:w-[500px] sm:h-[500px] w-[300px] h-[300px] object-cover" />
              </div>
            </div>

            {/* Right: content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-[#21417E] font-extrabold leading-tight">
                <span className="block text-2xl sm:text-4xl">THE BEST IVF CENTRE IN DELHI</span>
                <span className="block text-2xl sm:text-4xl">AS WELL AS IN NORTH INDIA WITH</span>
                <span className="block text-2xl sm:text-4xl">AN IN-HOUSE GENETICS LAB.</span>
              </h3>

              {/* PGT-A */}
              <div className="mt-6">
                <h4 className="text-[#21417E] font-bold text-sm sm:text-xl tracking-wide">
                  PRE-IMPLANTATION
                  <br /> GENETIC SCREENING (PGT-A)
                </h4>
                <p className="mt-2 text-gray-700 text-sm leading-snug max-w-xl">
                  Ensuring results for couples who have faced multiple failed IVFs,
                  <br className="hidden sm:block" /> and advanced maternal age.
                </p>
              </div>

              {/* PGD */}
              <div className="mt-6">
                <h4 className="text-[#21417E] font-bold text-sm sm:text-xl tracking-wide">
                  PRE-IMPLANTATION
                  <br /> GENETIC DIAGNOSIS (PGD)
                </h4>
                <p className="mt-2 text-gray-700 text-sm leading-snug max-w-xl">
                  Screening the embryo for over 400 heredity diseases, when one or both
                  <br className="hidden sm:block" />
                  the parents are carriers of genetic abnormality.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/919810350512"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-[#21417E] hover:bg-[#1b3466] text-white font-semibold px-6 py-3 shadow"
                >
                  Consult Now
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Video Testimonials Section */}
        <section id="news" className="bg-white overflow-hidden py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-[#21417E] font-bold text-xl sm:text-2xl md:text-4xl leading-snug">
                When the odds of fertility act against you, Place your trust in us.
              </h3>
              <h3 className="text-[#21417E] font-bold text-xl sm:text-2xl md:text-4xl leading-snug">
                Call us to schedule your fertility consultation
              </h3>
            </div>

            {/* Mobile carousel */}
            <MobileVideosCarousel />

            {/* 6 videos grid (tablet/desktop) */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-0">
              {[
                'E04J-XxA1Y0', // placeholder IDs - replace with clinic videos
                'PzkrtU5dchg',
                '5jdSZz1tpJg',
                '9_K6ksAefj4',
                'OpgqOL4fpoU',
                '8R4_6qzyS0Y'
              ].map((id) => (
                <div key={id} className="w-full aspect-video overflow-hidden shadow-md bg-black">
                  <a
                    href={`https://www.youtube.com/watch?v=${id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full h-full relative"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                      alt="YouTube thumbnail"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M66.52 7.74c-.78-2.93-3.09-5.24-6.02-6.02C55.79 1 33 1 33 1s-22.79 0-27.5 1.72c-2.93.78-5.24 3.09-6.02 6.02C-1.5 12.45-1.5 24-1.5 24s0 11.55 1.72 16.26c.78 2.93 3.09 5.24 6.02 6.02C10.21 47 33 47 33 47s22.79 0 27.5-1.72c2.93-.78 5.24-3.09 6.02-6.02C68.5 35.55 68.5 24 68.5 24s0-11.55-1.98-16.26z" fill="#FF0000" />
                        <path d="M26.94 32.06l17.64-10.06-17.64-10.06v20.12z" fill="white" />
                      </svg>
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Feedback/Reviews Section */}
        <section id="international" className="bg-white overflow-hidden py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-[#21417E] font-bold text-2xl sm:text-4xl md:text-5xl">
              Feedback from our favourite patients
            </h3>

            {/* Rounded panel */}
            <div className="mt-10 relative bg-[#F3F5F9] p-4 sm:p-8 lg:p-12 rounded-xl sm:rounded-l-full sm:rounded-r-none w-full sm:w-[calc(100vw-4rem)] lg:w-[calc(100vw-6rem)] right-0 sm:right-[calc(80%-58vw)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left copy */}
                <div className="lg:col-span-4 flex flex-col justify-center h-full text-center lg:text-left lg:pl-6 xl:pl-10">
                  <h4 className="text-[#21417E] font-extrabold text-2xl sm:text-3xl leading-snug">
                    Thank you for trusting us with
                    <br /> your Journey !
                  </h4>
                  <p className="mt-3 text-gray-700 max-w-sm mx-auto lg:mx-0 text-sm sm:text-base">
                    below and leave us a 5-star review to help
                    others on their path to parenthood.
                  </p>
                </div>

                {/* Right reviews grid */}
                <div className="lg:col-span-8 w-full lg:w-[104%] -mx-4 sm:-mx-6 lg:mx-0">
                  {(() => {
                    const reviews = [
                      {
                        name: 'Chisenga Mwamba',
                        initials: 'CM',
                        role: 'Lusaka, Zambia',
                        text:
                          'After 4 years of trying and multiple failed attempts in Zambia, we came to Seeds of Innocence. Dr. Gauri\'s expertise and the advanced PGT-A screening gave us hope. We are now blessed with our beautiful daughter. The care and support from the entire team was exceptional. Forever grateful!',
                      },
                      {
                        name: 'Fatma Al-Hashmi',
                        initials: 'FH',
                        role: 'Mabela, Muscat, Oman',
                        text:
                          'We traveled from Oman to Delhi for IVF treatment. Dr. Gauri\'s approach is world-class and the in-house genetics lab is remarkable. The PGD screening helped us ensure a healthy pregnancy. Our twins are now 8 months old. The entire journey was seamless and worth every mile traveled!',
                      },
                      {
                        name: 'Mwansa Banda',
                        initials: 'MB',
                        role: '  Kitwe, Zambia',
                        text:
                          'The best decision we made was coming to Seeds of Innocence. After years of infertility struggles, Dr. Gauri and her team provided exceptional care. The genetic screening technology is advanced and the personalized treatment plan worked perfectly. We finally have our healthy baby boy. Highly recommended!',
                      },
                      {
                        name: 'Amina Al-Mazroei',
                        initials: 'AM',
                        role: 'Muscat, Oman',
                        text:
                          'After multiple failed IVF attempts in Muscat, we found hope at Seeds of Innocence. Dr. Gauri\'s expertise in genetic screening and the comprehensive care we received was outstanding. The facility is modern and the staff is professional. Our family is now complete with our beautiful son. Thank you!',
                      },
                      {
                        name: 'Patricia Mulenga',
                        initials: 'PM',
                        role: 'Lusaka, Zambia',
                        text:
                          'We came to Seeds of Innocence after being told it was impossible. Dr. Gauri\'s treatment plan and the advanced PGT-A testing helped us achieve success on our first attempt. The support from Dr. Lisha and the entire SOI team was remarkable. We are now expecting our first child. Worth every effort!',
                      },
                      {
                        name: 'Salma Al-Rashdi',
                        initials: 'SR',
                        role: 'Mabela, Muscat, Oman',
                        text:
                          'The entire team at Seeds of Innocence made our journey from Oman to Delhi seamless. Dr. Gauri\'s expertise in genetic diagnosis and the comprehensive care we received was exceptional. The in-house genetics lab is a game-changer. We are blessed with our healthy daughter. Thank you for making our dream come true!',
                      }
                    ]
                    const reviews1 = [
                      {
                        name: 'Grace Chanda',
                        initials: 'GC',
                        role: 'Lusaka, Zambia',
                        text:
                          'After 5 years of struggling with infertility, we decided to travel to India. Seeds of Innocence was recommended by a friend. Dr. Gauri\'s personalized approach and the PGT-A screening made all the difference. We are now proud parents of a healthy baby girl. The entire team\'s support throughout our journey was incredible. Thank you SOI!',
                      },
                      {
                        name: 'Khadija Al-Saidi',
                        initials: 'KS',
                        role: 'Mabela, Muscat, Oman',
                        text:
                          'Coming from Oman, we were initially hesitant but Dr. Gauri and her team made us feel at home. The in-house genetics lab and PGD screening gave us confidence in our treatment. Our baby boy is now 6 months old and perfectly healthy. The facility is world-class and the staff is extremely caring. Highly recommend to anyone from Middle East!',
                      },
                      {
                        name: 'Tawanda Phiri',
                        initials: 'TP',
                        role: 'Kitwe, Zambia',
                        text:
                          'We had tried everything in Zambia with no success. A relative suggested Seeds of Innocence and it was the best advice we ever received. Dr. Gauri\'s expertise in genetic screening and the advanced technology available helped us achieve success. Our daughter is now 10 months old. The care and attention we received was beyond our expectations!',
                      },
                      {
                        name: 'Maryam Al-Balushi',
                        initials: 'MB',
                        role: 'Muscat, Oman',
                        text:
                          'After three failed IVF cycles in Muscat, we were losing hope. Seeds of Innocence changed everything. Dr. Gauri\'s comprehensive treatment plan and the genetic testing facilities are exceptional. We are now expecting twins! The support from Dr. Lisha and the entire SOI team has been remarkable. Worth every penny and every mile traveled!',
                      },
                      {
                        name: 'Beatrice Ngoma',
                        initials: 'BN',
                        role: 'Lusaka, Zambia',
                        text:
                          'The journey from Zambia to Delhi seemed daunting, but Seeds of Innocence made it seamless. Dr. Gauri\'s approach to treatment is thorough and personalized. The PGT-A screening helped identify the best embryos. We are now blessed with our son who is 7 months old. The entire experience was professional and compassionate. Forever grateful!',
                      },
                      {
                        name: 'Noor Al-Zadjali',
                        initials: 'NZ',
                        role: 'Mabela, Muscat, Oman',
                        text:
                          'Dr. Gauri and her team at Seeds of Innocence are truly exceptional. Coming from Oman, we were impressed by the modern facility and advanced genetic screening technology. The PGD testing ensured we had a healthy pregnancy. Our baby girl is now 9 months old and thriving. The personalized care and attention to detail made all the difference. Thank you!',
                      }
                    ]

                    const Card = (r, idx, handlers) => (
                      <div key={`${r.name}-${idx}`} className="bg-white shadow-sm border border-gray-200 p-3 sm:p-4 min-w-[240px] sm:min-w-[260px]">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-[#21417E] text-white flex items-center justify-center font-bold text-xs">{r.initials}</div>
                          <div>
                            <p className="text-[13px] font-semibold text-gray-900">{r.name}</p>
                            <p className="text-[11px] text-gray-500">{r.role}</p>
                          </div>
                        </div>
                        <div className="mt-1.5 text-red-500 text-xs" aria-hidden="true">★★★★★</div>
                        <p className="mt-1.5 text-[13px] text-gray-700 leading-relaxed line-clamp-4">{r.text}</p>
                        <button 
                          className="mt-1.5 text-[#21417E] text-xs font-semibold hover:underline cursor-pointer" 
                          onClick={() => openReviewModal(r)}
                          {...handlers}
                        >
                          Read more
                        </button>
                      </div>
                    )

                    return (
                      <div className="space-y-4">
                        {/* Row 1 - left direction */}
                        <MarqueeRow
                          items={reviews}
                          direction="left"
                          speed={45}
                          renderItem={(item, idx, handlers) => Card(item, idx, handlers)}
                        />

                        {/* Row 2 - right direction */}
                        <MarqueeRow
                          items={[...reviews1].reverse()}
                          direction="right"
                          speed={45}
                          renderItem={(item, idx, handlers) => Card(item, idx, handlers)}
                        />
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Modal */}
        {isModalOpen && selectedReview && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a8] p-4"
            onClick={closeReviewModal}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#21417E] text-white flex items-center justify-center font-bold text-lg">
                      {selectedReview.initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedReview.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedReview.role}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeReviewModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Rating */}
                <div className="mb-4 text-red-500 text-lg">★★★★★</div>

                {/* Full Review Text */}
                <div className="mb-6">
                  <p className="text-base text-gray-700 leading-relaxed">
                    {selectedReview.text}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeReviewModal}
                  className="w-full sm:w-auto px-6 py-2 bg-[#21417E] text-white font-semibold rounded hover:bg-[#1b3466] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <ContactForm />
        {/* Map Section */}
        <section id="contact" className="w-full overflow-hidden py-8 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Mobile carousel */}
            <div className="lg:hidden">
              <MobileMapCarousel />
            </div>

            {/* Desktop/Tablet two-column layout */}
            <div className="hidden lg:flex flex-row gap-8">
              {/* Google Map - Ghaziabad */}
              <div className="w-1/2 flex flex-col">
                <h3 className="text-[#21417E] font-extrabold leading-tight">
                  <span className="block text-xl sm:text-2xl">SEEDS OF INNOCENCE IVF CENTRE - BEST IVF CENTRE IN <span className="text-[#CC2023]">GHAZIABAD</span></span>
                </h3>
                <span className="block text-lg pt-2">Timings: 9:00 AM - 1:00 PM</span>
                <a
                  href="tel:9810350512"
                  className="block text-base text-gray-500 pb-4 hover:underline"
                  style={{ cursor: 'pointer' }}
                >
                  Phone: +91-9810350512
                </a>
                <div className="overflow-hidden shadow-sm border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.9941651313443!2d77.43600657529012!3d28.659893375649776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1c5b4d8b201%3A0x6502bf0f722f09a5!2sSeeds%20of%20Innocens%20IVF%20Centre-%20Best%20IVF%20Centre%20in%20Ghaziabad%20%7C%20Fertility%20Clinic!5e0!3m2!1sen!2sin!4v1762168602168!5m2!1sen!2sin"
                    width="100%"
                    height="335"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Seeds of Innocens IVF Centre Location Ghaziabad"
                  />
                </div>
              </div>
              {/* Google Map - Delhi */}
              <div className="w-1/2 flex flex-col">
                <h3 className="text-[#21417E] font-extrabold leading-tight">
                  <span className="block text-xl sm:text-2xl">SEEDS OF INNOCENCE IVF CENTRE - BEST IVF CENTRE IN <span className="text-[#CC2023]">DELHI</span></span>
                </h3>
                <span className="block text-lg pt-2">Timings: 2:00 PM - 6:00 PM</span>
                <a
                  href="tel:9810350512"
                  className="block text-base text-gray-500 pb-4 hover:underline"
                  style={{ cursor: 'pointer' }}
                >
                  Phone: +91-9810350512
                </a>
                <div className="overflow-hidden shadow-sm border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2065.4160333339305!2d77.20331691272258!3d28.532736663578216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce20320e1d805%3A0x7d88d4bcd484e5ec!2sSeeds%20of%20Innocens%20IVF%20Centre%20-%20Best%20IVF%20Centre%20in%20Delhi%20%7C%20Fertility%20Clinics!5e0!3m2!1sen!2sin!4v1761809915881!5m2!1sen!2sin"
                    width="100%"
                    height="335"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Seeds of Innocens IVF Centre Location Delhi"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Modern Footer Banner Section */}
        <footer className="w-full overflow-hidden mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#21417E] mb-3 leading-tight max-w-4xl">
                Get Free Second Opinion
              </h2>
              <p className="text-2xl sm:text-2xl lg:text-xl font-semibold text-black mb-2 max-w-4xl">
                Register Online For Seamless Experience. Book Your Online Appointment Within Minutes.
              </p>
              <p className="text-xl sm:text-xl lg:text-2xl font-semibold text-black mb-4 max-w-2xl">
                Call Now <span className="font-bold">+91-9810350512</span> or &nbsp; <br className="sm:hidden" />
                <span className="underline cursor-pointer hover:text-[#21417E]">Book an Appointment</span>
              </p>
            </div>
          </div>
          <div className="w-full bg-[#21417E] text-white">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Left: Logo and tagline */}
                <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white pb-6 md:pb-0 md:pr-8">
                  <img src="/Images/Dr. Gauri logo 3.png" alt="Brand Logo" className="h-full w-full object-contain" />
                </div>

                {/* Center: Headline and links */}
                <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold leading-snug">
                    Take your first step towards
                    <br className="hidden sm:block" /> happiness with Trusted Fertility Chain
                  </h3>
                  {/* <div className="mt-3 text-[12px] flex flex-wrap gap-x-3 gap-y-1 justify-center md:justify-start opacity-90">
                    {[
                      { t: 'About Us', href: '/about' },
                      { t: 'Contact Us', href: '/contact' },
                      { t: 'Shipping Policy', href: '/shipping-policy' },
                      { t: 'Terms & Conditions', href: '/terms' },
                      { t: 'Disclaimer', href: '/disclaimer' },
                      { t: 'Privacy Policy', href: '/privacy-policy' },
                      { t: 'Return Policy', href: '/return-policy' }
                    ].map((item, i, arr) => (
                      <a 
                        key={i} 
                        href={item.href} 
                        className="hover:underline"
                        target={item.href.startsWith('http') ? "_blank" : undefined}
                        rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      >
                        {item.t}{i < arr.length - 1 ? ' |' : ''}
                      </a>
                    ))}
                  </div> */}
                  <p className="mt-2 text-sm opacity-90">© Copyright. All rights reserved group of Seeds of Innocence</p>
                </div>

                {/* Right: Help + WhatsApp + Socials */}
                <div className="md:pl-8">
                  <p className="text-base opacity-90">Need help? Talk to our fertility experts.</p>
                  <div className="mt-3 flex items-center gap-3">
                    {/* WhatsApp badge */}
                    <a
                      href="https://wa.me/919810350512"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-white font-bold pl-2 pr-3 py-1"
                    >
                      <img src="/Images/whatsapp_PNG20 1.png" alt="WhatsApp" className="h-10 w-10 object-contain" />
                      <span className="text-2xl tracking-wide">98103 50512</span>
                    </a>
                  </div>
                  <div className="mt-3">
                    <span className="text-base mr-3">Follow us</span>
                    <div className="inline-flex items-center gap-3">
                      {[
                        {
                          title: 'LinkedIn',
                          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png',
                          href: 'https://www.linkedin.com/in/drgauriagarwal/'
                        },
                        {
                          title: 'Facebook',
                          img: 'data:image/jpeg;base64,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',
                          href: 'https://www.facebook.com/Dr.GauriAgarwal/'
                        },
                        {
                          title: 'Instagram',
                          img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDhAQDw8QDw8QERAQDQ4PDxAQDg8PFhYWFhUVFhUYHSggGCYlHRUVITEtJSkrLjEuFx8zODMuNzQ5LysBCgoKDg0OFxAQGi8lHyUrLS0tLTAtLS8tLy0tLS0tLS0tLS0vLS0tKy0tLS0tLy0tLSstKy0tLSstLy0tLSsvLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMFBgcCBAj/xABMEAABAwIBBAgSCQMFAAMAAAABAAIDBBEFBhIhMQdBUWFxgZGSExYiMjRCUlNUcnOTobGywdHSFCMkMzVigrPCJXSiF0NEY6MV4fH/xAAbAQACAwEBAQAAAAAAAAAAAAAAAgEDBAUGB//EADkRAAIBAgEHCQgDAQEBAQEAAAABAgMRBAUSITFRcbETFDJBUoGRodEiMzRCYcHh8BUjJHLxkmJD/9oADAMBAAIRAxEAPwDcUACABAHjxLFIKVmfPKyJu1nHqnbzWjS7iCsp0p1HaCuLKairtlOxHZKiaSKenfJ+eVwjbwgC5PHZdCnkyT6crbtJQ8SupEDUbIde7regRjazYyTyucfUtUcnUVruxOXkzwuy1xM/8o8UNOP4K1YHD9nzfqTyk9pz054n4W7zcPyKeZUOz5v1GU5bROnPEvC3+bh+VHMqHZ4+oylITpyxLwt/Mh+VTzKh2ePqOmw6csS8LfzIvlRzKh2ePqMridOWJeFv5kPyo5lh+zx9RkHTliXhb+ZF8qOZUOzx9R0g6csS8LfzIflRzKh2ePqMooTpyxLwt/Mh+VHMsP2ePqMoIOnLE/C38yH5Ucyw/Z4+oyhHYHTlifhb+ZD8qOZYfs8fUZU47A6csT8LfzIflRzLD9nj6jKlHYHTlifhb+ZD8qOZYfs8fUZUYbA6c8T8Lf5uH5Ucyw/Z4+o3Iw2C9OmJ+Fv83B8ijmWH7Pm/UZUKezidDLfFB/yzxw0/yKOY4fs+b9Seb09nE9lPsh4i3WYZPHit7Baq5ZOoPau8jmlN7Scw/ZPbe1RSlo7uF4d/g61uUrNPJj+SXiVywL+VlywfHqWsF6eZryBd0Zu2Vo32HTx6lz6tCpS6aMlSlOn0kSSpKwQAIAEACABAFJyvy4bTl0FJmvmFxJKdMcR2wB2zhyDbvqXRwuBc/bqatm38GWriM3RHWZpV1UkzzJK90kjtb3kl3BvDe1LsxhGKtFWRk0t3YynGSEQWJCKR0hEDpApLEhEDpAgdIEDpCIHSBAyQIHSEQOkCBkgQOkCgZIEDJCoHSBQMkCgawqBrHUb3NcHNc5rmm7XtJa5p3QRpCV2asybX0M0PJLL83ENe4WNgyqsBbelGr9Q491crE4D5qXh6ehgxGB+an4enoaKCuUcwVAAgAQBSdkHKg07fosDrTPbeWRp0xRnUAdpx9A07YK6WBwue+Ulq6vr+DPXqW9lazLl2zGoiXQWKIl1I6iIgsUQQOoiKR1EEDqIIHUREDqIIHUREDpAgZRBA6QIGSBQOkCBkhUDJAoHSBQMkKgawKCUhbKLjWBRcawqi41i/bHOVBY5tFO67HdTSvPaO2oidw9ruHRuAczHYe96ke/19fE52Owt06se/19fE0tco5AIA8eMYg2lp5Z39bG0utqznamt4yQONWUqbqTUF1kN2VzCKuqfNI+WQ50kji953SdzcG5vL08IKMVFakYs1t3YzdOOoiXQOoggdREQOoggdRBA6iJfTbbOobZQOonrjwypd1tNUO8WCV3qCR1aa1yXihkkPNwGuOqjquOnlHraleIpL514oa8do4Mmq/wADqPNuCXnVHtInOjtF6WMQ8Dn5hRzuj2kMpw2i9K+IeBz8xHO6PaQ2fDaHSviHgc/MRzuj2kMqkNonSviHgc/MUc6o9pDKrT2iHJmv8Dn82Uc6o9pDKrT7SOH4BXDXR1XFTyu9QTLEUn868UOqlPtLxGX4VVN66lqW+NTyj1tU8tTeqS8UOpw2rxR5HCxsdDhradBHEn16S1K+kFA1hVFybAouNYWyi41hbKLk2FsouNYUbxII0gg2IO6DtJbk2NsyQxj6ZRxyuI6I36ue3fG2ubbVwQ79S4WIpcnUa6uo85i6HI1HHq1rd+6CaVBmKDss15bDBTg/ePdI/wAVgAAPCXX/AErqZLp3lKezR4iTV9Bma7QqgCB1ARQOoAgdRBA6iTeT2StVXdVG0MhvYzyXDN/NGt516tGjSQs1fF06Oh69gNqJoWE7HtFCAZs6pftmQlsd95jf5ErlVco1ZdHQv3r/APCtzfUWakoYYRmwxRxDcjY1g9AWKU5T0ydxW7noSkAgAQAIAEACABAAgAQAIAaqKaOQZsjGSN22vaHDkKmMnHSmSpNaUVzFMg6CcEsjNO/adAc1vMN28gC108dWjrd9/rrNVPG1Y63ff+3KFlDkZVUYLxaeAaTLGCCwbr2a28IuN0hdGjjIVdGpnToYunV0ansK4AtNzZYWyi5NhbKLk2FsouNYWyW5Ni7bFtcWVMsBPUyx57dwPYdrhDjzVhx0bxUthzMqU701PY7eJpy5hwzI9lGfOxENvojgjbbfJc4+hw5F3smxtRvtYyjcqC3jqAKLjKAIuOoAouOol1yFyN+lWqakEU4P1UeozkbZ3G+vg18/GYzk/Yhr4fngV1J5uhazVI2BoDWgNa0ANaAAABqAG0uK3fSzMdKAPLW4jBALzTRRA6uiSNZfgudKeNOU+irjRjKWpERNlthjDY1QPiRyyDla0hXLB1n8vAtWHqPqGHZf4btTPPBBN72puY1tnmhuaVdnmjg7IWHd3L5l6nmNbZ5k8zq7BP8AUPD+6m805HMav08Q5nV/WH+oeH91L5lyOY1fp4k8yq/rD/UPD+6l8y5HMav08SeY1dnmH+oWH91L5lyOY1fp4hzGts8xRsg4d3cvmXqOY1tnmHMK2zzO25f4b3144YJfc1HMq2zzQcwr7PND0OW+GONhUgePFMwcrmgJXg6y+XzQrwVdfL5olqHFaaf7meKU7Yjka5w4QDcKmdKcOkmimdKcOlFo9iQrBAGdZcZGAB1VRsta7p6do0W23xja3xxjToPSwuL+Sfc/U6+Cxt7U6j3P7P1/Vn4C6Fzr2FsouTYWyW5NhbKLk2JrI6boeI0rt2TM57Sz+Sor6acjNjI51Ca+nDSbQuQeXMV2QXXxWq3jCB5mNehwXuI9/FmmnG8UV5arlqgCi46iCi4yiTmR+B/Tqtsbr9BYOiVBGjqBqbfdcdHBc7SzYmvyULrX1CVZZkbm2xsDQGtAa1oAa0CwAGgADaXAbvpZzxurqo4Y3SSuDI2DOe92oBEYuTsiYxcnZGW5SZe1E7nMpSaeHUHjRPIN0u7Ti07+0utRwcIaZ6X5fk6VLCRjplpZT3kucXOJc46XOcSXE75Otbb20I1qIlkZwyiFlGcNmi2UZwyiFkZxKiFlGcNmi2RnE5oWRnDZoWRnE2FsjOJsFkZxNgzdR2xpB2wd1TnBYs+AZa1dKQ2RxqYdtkjryNG6x508RuNG1rWWrhac9WhmOvgKdRXWh+XgapheJRVULZoXZzHcTmu22uG0QuVODg82RwqtKVKTjJaT1pCsyXL7ARS1HRIxaCe7gBqjl7Zo3AdY4xtLq4atnxs9aPRZPxHKwzZa1wKwAtFzfYWyi5IqgD2YIftdL/c0/wC41LU6Etz4Fdf3U/8Al8Dc1xjyJieXn4pVeNH+1Gu/hH/RHv4s6NGN4IgVouXKIWUXGURbJbjKJrexnhghoeikdXUuLydvoYu1g9bv1rj42pnVLbDm4qV522FuWMzGUbI+PGeoNMx31NObPA1ST7ZPi9bw528urhKShHOet8DrYOhmxz3rfAp1lrzjaoi2S5w2aFlGcNmi2RnDZoWUZxOaLZRnE5oWRnDZotlGcTmi2RnE5oWRnE2CyM4mxLZO4BNXSlkdmtbYyyuF2sB1aNsmxsN5V1Kygrsz4nEQoRvLuRdhsa02bpqKjPtrHQgy/i5t/SsvPZ7Ecr+VqX6K8/UpuUmTs1BIGvIfG+/QpmggOtrBHane0/DVSrqa0HUw2JhXjdaGtaH8jcbNHUtznfUSkMnaetF9Ak3s31X3lFeCqR+qFxuGVam7a1q9O/ibEuUeZIXLHDvpNDMwC72DosW7ns02HCLt/UrqE82aZqwVXkq0X1PQ+/8AbmNLqnqQQQCAPXg3ZdN/cQfuNS1OhLcyut7qe58DdFxjyJieXX4pVeOz9ti7mFf9Mf3rZ18NH+qP71kHZXZxoUQslzhlECDtaTtDdKjOHUT6BoKYQwxRN62ONkY4GgD3LhSlnNtnnZSzpN7TnEqsQQSzHSIo3yW3c1pNvQiKzmkTThnyUdrMEc4uJc43c4lznHWXHSTyrsZ1tR6VQS1CWS5w+aLZRnE5otlGcNmhmqM4nNFsozic06jjLiGtBc46mtBLjwAKHMlpJXZJQZOVzxdtJPb80ZZ7VkjqxXWUyxNCOua8fQ6lyarmi5pJv0szzyNuo5aO0I4qg9U1+7yPmgcx2a9rmO7l7S13IU2eaI2krp3OM1GeNYXNRnhY1TY2ia2guOufLIZN24sB6AFkru8jzmVW+Xs+pItSpOaVrZEjacNkJAux8Lo95xe1pt+lzldQdpo6GTG1iElsfD1MmIXQTPSGz5JVpnoKeQm7szMeTrLmEsJPDm341zasc2bR5TGU+TryitvHSS6rMxhGJU/QZ5ogLCOWSMeK1xA9AC7MHeKZ6+lPPhGW1JnnTDggD14P2VTf3EH7jUs+i9zK63u57nwN0XGPImK5cD+p1Xjs/bYuvh5f1R/es72Ej/TH96yDsrHI05otkrkMonrwmPOqadvdTwt5XtCrnL2XuFqK0JP6Pgb0uUeYIHLuXMwypO61jOJ72tPrVlHpo14GOdXiv3QrmN2W3PPS5otlGeTmi5qXPJzRc1RnjZo5BA57msY0ve42a1oJc47gCVzB2im27IvuA7HwsH1riTr+jxusBvPeNf6bcJVUqz6ji4jKvVRXe/svXwLrQ0EMDc2GJkTdsMaG34Tt8aqbb1nJqVZ1HebuelQVggBmppY5WlksbJGnW17Q5vIUJ2GhOUHeLsyo45kDE8F9I7oL9fQnEuidwHW30jeViqPrOthsrTjoqq629f5KBW0ckEhjlYY3t1tduboOojfCsUrndp1IVIqUHdE5kflL9Ce5kgLoJCC7N66N+rPA29AAI3hbcMTjnGLH4LnCTj0l5rYX4ZVYfmZ/0qO1r26oP5ls70KrMlsOFzDEXtmP9+uoomWeU4rS2KEFsDDnXdodK/UDbaAubcK00oZulnawGB5C8p9J+RVlemdA1DYzlzqFw7ieRo4C1jv5FZMR0jzuVY2rp7Uvui2qg5hjOWbM3EqofnaecxrveurQf9cT1GCd8PDd92QyuNQIA9WEdlU/l4P3GpZ9F7mV1vdz3PgbquMeRMXy2H9TqvHZ+2xdGlK1NHo8FH+iH71shbJnM15ouakcxs0kMnmXraT+5gPJI0+5JOehleIVqM9z4G4rEeTK3shn+myjdfCP/Rp9yeDszfkxXxMe/gzJs1W556fNFzUueTmi5qXPJzRyGBz3NYxpc9xDWtGtzjqCXPCVopylqRrGSmTUdFHnOAfUPH1km00dwzcHr5AIbueVxuNliJWWiK1L7v8AdBPqDCNVNRHE0vke2Ng1ue4NaOMoGhCU3mxV39CCqMtaBhsJHSEdxG4jlNgVF0dCGSsTLqtvaOIcuKBx0vkZvuicR/jdFyZZJxK1JPv9bE7RVsU7c6GRkjdsscHWO4dxSYKlKdN2mmj0IKyKygwOKtizHjNe25ilA6qN3vB2x79IlOxqwuKnh53jq61tMjxCikp5XxStzXsNjuEbRB2wRpVyZ6ulUjVgpx1M8yZMcROmQInTA0jYuP2Wcf8AfflYz4LPX1o89lj3sd33ZdFQckx/LxtsTqN/oR/8mD3LpYd/1r96z0+T3fDQ7+LIBaUbAQQerCOyqfy8HttSz6L3Mrre7nufA3VcY8iY3lqP6lVeOz9ti0wlaKPU4Bf54fvWyFDUOZszRQ1I5k5pKZMN+3Uvlo/WkcyjFq1Ce5m0pDyBWtkP8Pf5SL2lDdjpZJV8Stz4GWZqRzPVZp1mpXMmwualzybF72OsGFnVbxp0sp77Q1Pf/Hiduqynp0nn8s4nSqEd7+y+/gXpWHBITKbKFlFGNAfM8HoUd9Fu6duD1+kLKVjdgcDLEy2RWt/ZfXgZhiWITVL8+Z5e7TYHrWDca3UFVnXPV0aFOjHNgrfvWeSyLlgia4D1JVSQvEkT3RvGpzTY8B3RvHQmTK6lONSObNXRpWSWVIqx0KWzKhovo0NlaNZbuHdHGN5kzzOPye6Htw0x4fu39dmUnMKnsg4MJqf6QwfWwC7t10Otw/T13O3U0WdXJWJ5Opyb1S4/nV4GZKxM9IInTIETJgaLsXfcVHlW+yFVW1o8/lj3kN33LsqTjmSbII/qUu+2L2At+HfsHpsm/Dx7+JWytKZtBOB6sJ7Jp/Lw+21LPovcyqt7ue58DdVxjyJj+Wbf6jU+Oz9tinPsetyev80O/iyGDUjmbs06DUjmTmkpkw37dTeVYlU7tGbGr/PU3Gxq88YVrZB7Ad5SP1quq7ROpkf4lbmZlZZM49ZYLKLgK1hcQ1ou4kBo3SdACm4NpK7Npw+kbBDHE3VGxrBv2Gk8etbkrKx4OtVdWpKb63c7qZ2xRvkebMY1z3HcaBcobsrkU4OclGOt6DG8Urn1Mz5pOuebgXuGt7Vo4Asjld3Pb0KEaNNU49X7c8qLloim4BZMmQJZMmB3BM6N7XscWvYQ5jhtEJkxJwU4uMloZsuC4gKmnimGjPb1Q7l40OHEQVYjxeJoujVlTfVw6j1vaHAgi4IIIOog61JSm07oxLE6MwTyw97kcwX1loPUnjFjxpkz2tGpytOM9qPKnTLBE6ZBomxd9zUeVb7Krqa0efyz04bvuXZVnGMm2QvxGTxIvZW2g/ZPTZM+HW9laWhM3CJ0yD1YT2TT+Xh9tqmfRe5lVb3c9z4G6rjHkTI8sG/1Gp8Zn7bFnnOzPY5NX+WnufFkRmqpyN9hbJM4mxJ5M9nU3lWpqb9pGTHfDVNxr63HiSt7IHYJ8pH61TX6B1cjfErczMrLDc9aFkXAkcnYs+tpge/MdzTne5PT0zRlxss3D1H9H56DYF0Tw5Xsu5yygkA0Z7o2cWcCfQCFVWdoHTyRDOxUb9Sb8jL1iueuETXALKbkCWTJgImTIBMmQaHsaTk080Z7SXOG8HNGjlaeVXQZ5vLULVYy2rgy4pzimU5exZuIynu2xv8A8Q3+KLnq8lyvho/S687/AHK6mTOgInTIND2L/uajyjfZSzPPZZ6cN33LskOMZPshfiMniReytdF+yenyZ8Ot7K0r0zcIVYmQenCeyafy8PttUyfsvcyqt7ue58DdVyDyBk2WH4hU+Mz2GLFVftM9nk34WnufFkOqmzeFktwJPJrs6m8q1NSftoyY/wCGqbjXl0jxBW8v+wT5SP1rPiegdXI3xS3MzRc+564EXAksm3htbTE99a3ndSPWrKUvbRkx8c7DVF9H5aTXV1Dw5Xcvoi6gce4fG48F83+SoxHQOpkeVsUltT9fsZjZYLnrxLJrkApuAia5AWTJkCJkyDQdjOIiCd+06VrR+loP8lopajzeW5f2Qj9OL/BclacQyvL6QOxCQdwyJp4c3O/kEjek9XkqNsNF7W/T7FcTJnRETpkGhbGH3NR5Rvsokeey104bvuXZKcUyjZB/EZPEi9laaT0Hp8l/DreytFXJm8RWJkHpwrsmn8vD7bU0n7L3Mqre7nufA3Rco8eZNlf+IVPjM9hi59Z+2z2mTPhae58WRFlTc3ipbgSWTfZtN5Vqek/7ImXH/DVNzNdXVPDFcy+7Bd5SP1rNivdnWyL8UtzM0XMueuBRck6ikLHNe3rmODm+MDcepSpWdxZRUk4vU9Bs9LO2WNkjdLXta9vARcLtxakk0fP6kHTm4S1p2Oa6lbNFJE7rZGOYTti4tcKJRzk0TRqulUjNa07mO1dM+GR8Ugs9ji1w390bx1jeK5LvF2Z7ynUjUgpx1MZRccSym4CWTJkAnTAGtJIABJJAaBpJJ0ABMmK2krs1/J7DvotLFEeuAvIRtyO0u9JtwALdBWVjxOMr8vWlPq6t3USRKYymL4zV9HqZpRpD5HFh/INDf8QFRe7Pb4alyVGENi8+vzPCmTLhFYmQaFsYfc1HlG+ypPO5a6cN33Lqg4plGyD+IyeJF7Kvp6j1GS/hlvZW1cmbxCnTIPThXZNP5eH22pm/Ze4pre7nufA3Nc08eZRlf+IVHjM9hi5ld/2M9rkz4SnufFkOqGzeKluBI5Odm03lWetPRf8AZHeZccv81T/lmursnhSu5eD7C7x4/aWXGe6fcdXIvxS3PgZrmrk3PYXDNRcLhmouFy/ZAYpnRGmeerju6K/bRk6RxE8hC6WCq3WY+o8vlvC5s1Wjqeh7/wArgy3LccIrmVmTYq29Eis2oaLadDZW9yTtHcPEd7NiKGfpWs62Tco83eZPoPy+vr+3zeeB8bix7Sx7dDmuFnBcx3Tsz1kJxnFSi7pjalMYE6ZANYSQACSTZrQCXE7gA1pkyG0ldl/yPyWMJFRUD63/AGotfQ/zO3/Vw6t1GlbTI8zlPKaqJ0qWrre36L6cd2u4LQcMruW+LCnpSxp+tnBYy2trO3dyG3C4KupKyOnkvC8tWUnqjp7+pGWqhM9YIrEyBE6ZBoWxiPqKjyrfZCdHnMte8hu+5dFJxTKMv/xGXxYvZCthqPU5L+Gj38SuK1M3iFWJkHowrsmn8vD7bUzfsvcU1/dz3PgbmueeOMoyu/EKjxmewxcnEP8Aske2yZ8JT3PiyJss7ZvFAS3A9+BaKumP/fCOV4Cek/7I70ZcZpw9T/l8DXV3TwhA5bNvQybzoj/mAsuM90+7idPJDtio7nwM4zVxrnrrhmIuFwzEXC47STvhkbJGc17Ddp9x3iNHGmjNxaktYlWnGrBwmtDNPwPF46uLOboeLCWO+ljveDtFdujWjVjdd54zGYOeGnmvV1Pb+dpIq4yHjxHC4KkWmja+2p2p7eBw0hJOnGfSRooYqrQd6crcPDUV6oyDgJuyaVm87NeBwaAVmeDj1NnVhl2qulFPxRxDkDCD1c8rhuNDGeu6Fg49bJll6o+jBLxfoT+F4JTUumGIB23IbukP6jpHFoWiFKMNSOXiMbXr+8lo2dXgSKsMp48VxKKliMsrrNGgAdc9201o2yllJRV2X4fDzrzUIL8fVmTYxiUlVM6aTWdDWg3DGDU0cvKSsUpuTuz2eGw0MPTVOP8A69p4SpTLhE6ZAhViZBomxkPs05/7rcjGfFWxPNZa97Dd92XFMcYyXLp18Sn3uhD/AMmH3p4nq8mr/LDv4sr5VqZuEViZB6cJ7Jp/Lw+21M9TKa/up7nwNyWE8aZVlcP6hUeMz9ti42Jf9sv3qPbZL+Ep7nxZFBqz3NzZ2GqLitnswzRUQncliPI8FNTftx3riUYjTSmv/wAvga2vQHhCIytjzqGYbmYeR7SfUs2MV6Mv3rN+TJZuKh38GZvmrh3PXXFzUXIuJmouTcC1FwuOUdTJC8SROLHjbG2NwjbCeFSUHnRYlWnCrFwmrou+EZWwygNntDJ3R+6dx9rx8q6tHGwlonofkecxWSalPTS9pef57vAsbXAgEEEHUQbgranc5LTTsxUEAgAKAK9jOV1NTgtjInl7mM9QD+Z+ocVys9TEwjoWlnUwuSa1bTJZsfrr7l/4jPcVxOaqk6JM651NaNDGDcaNr1rFKo5u7PT4fC08PDNpr1e88KlMvETpkCFWJkCJ0yDSdjeO1G891O8jgDWN9YKvhqPL5ZleulsiuLLWnOQZBlk6+I1J/O0cjGD3Jkz12T1bDU933ZClWJmsQp0yD04T2TT+Xh9tqdvQymv7qe58DcVjPGmXZWN+31HjM/bYuJivey/eo9pkx/5KffxZGNas9zY2OBqi4rZ20EaRrGkcKW+wV6dDNagkD2NeNTmhw4CLr0sXnJNHhZxcZOL6hrEKfosMsfdsc0cJGhLVhnwlHah6FTk6kZ7GmZfmLzVz2dwzEXC4ZqLhcQtU3JuclqLk3OS1Tca47TVc0P3Uj49uzXENPCNRVkKkodF2EqUadXpxTJCPKqtb/uNf40bPcAtCxlVdZklkrCy+W3e/yJLlbXEaJGN32xtv/ldM8ZVfWTHJGFWuLfe/tYiK7Eqib72aR422lxDOaNHoVUqs5dJm6jhqNL3cEuPjrPDZQmaBFYmQIU6ZAidMgRWJkCFWJimtZIUpioIGnW5pkO71ZLxfiIHEtUFoPG5RqcpiZtbbeGgmUxiMTxefotTPIDcPlkc0/lLjm+iyEz21CGZShHYlwPGnTLBCrUyD04T2VT+Xg9tqbqZTX91Pc+BuCynjDM8qm/b5/GZ+2xcPFe+l+9SPY5Nf+Wn38WRrWrNc1tnbWpbitjgaouK2X/JSq6JStb20V4zwDS30EDiXcwNTPpJbNB5fKVLMrt9T0+vmTC2HPKLlNhpinLwPq5SXNO0HdsOXTxrg42i6dS61P9Z6XJ+J5SkovWtHd1ERmrHc33DNRcLiFqLk3OS1Tcm5wWqbjJnBapuMmNuamuMmNuapHTGnNTDpjbgmTHTOCnTAROmQIVYmQInTIJLJ3CTV1LY7HoYs6d20IxrF906hw32lfTWczFjcSsPSc+vUt/41mvAW1cS2HiiNykr/AKPRzSXs4NLY/KO6lvpN+JQ3ZGrB0eWrxh1X07lrMbslTPZMQqxECFWpinqwjsqm/uIP3Gp+plOI91P/AJfA29ZjxhnGVLft0/DH+2xcLF++l3cEeuya/wDLDv4sjWtWW5rbHGtS3EbHA1RcVsl8nK/oE3VG0clmv3Ae1dxeolasHiOSqadT1mDH0OWp6Na1fdF6XoDzQzWUrJmFjxdp5QdojcVdSnGpFxlqLKVWVKSlHWUzE8ElgJNi+Pae0ah+YbXqXBxGEqUnfWtvqegw+Np1VbU9noRuaslzZcQtU3Juclqm5NzgtU3GTOHNU3GTG3NTXHTGnNU3HTGnNTDpjTmpkOmNEJkxzlOmAhViYpJYNgNRVuHQ2Wj7aZ4IjA27HtjvD0LRTpylqMeKx1HDr23p2LX+O803BMIipIhHGLk6ZHnrnu3T8FvhBRVkeRxWKniJ58+5bCQTGYzfZBxgTSinYbshJMhGp02q36RccJO4qpS02PTZIwrpwdWWuWrd+fQqJQjriFWoURWIg9WDD7XTf3EH7jU/UyjEe5n/AMvgbcqDxhQ8sYrVhPdxsd62/wAVxMerVd6R6bJU74e2xv1+5DtasJ0Gx1rUtxGxwNUXEbOw1LcW5ZcAxiwEMp1aI3nc7k+5dbA41aKdR7n9mcfG4O7dSn3r7ljXYOSCAPHUYVBJpdE2+2W3aTxjWs9TC0Z9KP24Giniq0OjL78TxPyapzqMjeBw94KzvJtF6rrv9TQspVlsY07JaHvkn+HwS/xlPtPy9B1lSp2V5+pwclI++v5GqP4yHafkN/Kz7KOTklH31/I1T/GQ7TG/l59lHJyPj78/mtR/Gw7TJ/mJ9lHJyMi79JzWqf46PaZP8zPsrzOTkVF36TmtU/x8e0xv5up2F5nJyHh79LyM+CnmEdrJ/nKnYXmJ0iU+3NNxdDH8VPMYbX5B/O1uqMfP1HI8haQa3zu3nPYB/i0J1g6a62JLLmIepRXc/uyRpMmaKI3bTtcd2S8mnd6okDiVsaFOOpGSrlLFVNDm+7RwJYBXGEVAFTyvyoEAdBTuvOdD3jSIR83q1ncNVSpbQjs5Nya6rVSovZ6lt/HEzcqlHphCrUKIrEQcqxEEpkrD0SvpW/8AaH8wF/8AFO3oMeOlm4eb+nHR9zZFUeQKvltTXEUo2i5juPSPUeVcvKUNEZ9x2ckVbOcO8rDWrkHabHWtStlbY41qi4rY4GpbiNnYaouRclcOxiSIBrvrGDUCeqaN4/Fb8NlCdL2ZaV5mGvg4VNK0MnqbE4ZNTwD3L+pP/wB8S7FLG0auqVnsej97jmVMNUhrXgexajOCABAAgAQAIAEACABAAgAQAIAjcRx2lp79FmaHDtGnPk5o0jjVcqsI62a6GBr1uhF226l4spmOZayygspwYGHQZCfriN62hnFc74WaeIctEdB3sJkaFP2qrzns6vz+6CpFIjsCKxCiFWIg5ViFEKtRBbNjajz6t8pHUwx2HjvNh6A/lTSeg5GWKmbSUNr8l+o0tIebPNiVIJoXxnth1J3HDSDy2VVekqtNwLsPWdKoprqM/MZaS1ws4EhwOsEaCF5iSadmepzk1dDjWpGxGx1rVAjY41qW4rZ2GqLiXOg1Rci4uagLnccr29a9zfFcQFZCtOHRk13iSjGXSSY8MSqBqldxhp9YV6x2IXz8BObUX8ov/wAvU98/wZ8E6yhiO15L0I5pQ7Pm/U5ON1PdjmN+CdZRr7fInmVDZ5s5OPVPdt5jVP8AI19vkMsBQ2eY27KCq7tvMam/kK+3yGWT6GzzG3ZR1Xdt5jU3P623yHWTsPs8xt2UtX3bfNtU8/rbfIdZMw+zzGnZUVnfG+bZ8FPPq23yHWS8N2fNnnkyortqa3BHF72qeeVtvki2OS8L2PN+p5pcpK4/8h3E2NvqajnNV/NwLo5Nwi+ReL9SOqcRqJLiSeV4OtrpHlvJeyjlJy1tmqGGow6MEu5HjspRaxCrUQIrEKclWIgQq1CnJViIEKtQprWRuEmlpGhwtLIeiyg6wSBZvEABw3Us8llDEctWbWpaETqgwggCu5SYXcmdg2vrQNwdt8VycoYW/wDbHv8AU62AxVv6pd3oQLWrinTbHWtSiNjrWpbiNnYaouI2dhqi5Fxc1FyLiFqLk3OS1TclMbc1TcZMbc1MOmMuapRYmNOCdDpjLwmRYmMPCZFiYy8JkWJjDwnRahl4TIsQw4J0WI5KsRAhViIOVaiBCrEKcq1ECFWIUteQ2TxnkFTK36mN14wf92Qe5p9Ituq1HIypjVTjyUOk9f0Xq+HcaUpPMggAQAIAgMUwTSXwjfdH8vw//FxsZk59Ol4enp4HUw+N0ZtTx9fUiA22g6CNYOsLivRoZvbHWtSCNjjWqLiNnYaluLcXMRci4FqLk3OC1TclMbc1MOmMuamQ6Y04JkWJjDwmRYmMvCdFiYw8JkWoZeE6LEMPCZFiGHhOi1DDwmRYhsqxEiKxCnJVqIEKsRByVahS15NZHSTkS1IdHDrEZu2WX3tHp3La1fGJxsblSNO8KWmW3qXq/LgaNFG1jQ1jQ1rQGta0Wa0DUAFYealJybb1naCAQAIAEACAPNVUUcvXN090NDuXbWavhKVbprTt6y2nXnT1Mj5MGcOscCNx2g8oXJq5Imvdyvv0fvka441PpIZOHyjtOQgrFPJ+Jj8nAs5xTfWJ9GeO0dzSqHha6+SXgw5WO1B0B/cO5rkvN63Yl4P0DlI7UBp39w7mlHN63Yl4MnlI7UcOp39w7mlTyFbsPwYyqR2oadTP7h/Ncp5Cr2H4MdVI7V4jTqaTvb+Y5MqFXsPwY6qw2rxGX0sne38x3wTKjV7L8GWKrDtLxGX0kne5OY74J1Rqdl+DLFVh2l4oZfRy96k8274JlRqdl+DLFWp9peKGH0U3epfNv+CZUqnZfgyxVqfaXihl9DN3mXzb/gmVKp2X4MsVel2l4oZfQT94m80/4J1Sqdl+DLFiKXbXihh+HT94m8zJ8Eypz7L8GWLEUe2vFDLsNqPB5/MyfBOqc+y/BlixNHtx8V6jZwyp8GqPMS/BOqc+y/Bk85oduP8A9L1FGEVR1UtR5iUe5WRpz2PwFeLoL/8ApH/6XqemLJiufqpnjxixntEK6NGewollLCx1zXm+CJWiyCqHffSxxDcbeR/uA5Sr40H1mGrlukuhFvy9S1YPkvS0pDms6JINUstnOB/KNTeIXV8YJHHxOUa9fQ3ZbF+6SaTmAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACAP/2Q==',
                          href: 'https://www.instagram.com/gauriagarwal/'
                        },
                        {
                          title: 'YouTube',
                          img: 'data:image/png;base64,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',
                          href: 'https://www.youtube.com/@seedsofinnocence'
                        }
                      ].map((icon, idx) => (
                        <a key={idx} href={icon.href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-white h-8 w-8">
                          <img src={icon.img} alt={icon.title} className="h-4 w-4 object-contain" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </footer>
        <FloatingConsultButton onClick={() => setIsContactOpen(true)} />

      </main>
    </div>
  );
};

export default LandingPage;