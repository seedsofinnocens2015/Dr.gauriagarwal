import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    husbandName: '',
    wifeName: '',
    email: '',
    typeOfService: '',
    preferredDate: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can add API call or form handling logic here
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16">
          {/* Left Section - Heading */}
          <div className="w-full lg:w-1/5 flex-shrink-0 sm:mt-8">
            <h2 className="text-blue-900 font-bold" style={{ fontFamily: 'sans-serif' }}>
              <span className="block text-base sm:text-lg lg:text-xl xl:text-2xl mb-2">
                REQUEST FOR YOUR
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                Consultation
              </span>
            </h2>
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-4/5">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Husband Name */}
                <div>
                  <input
                    type="text"
                    name="husbandName"
                    placeholder="Husband Name"
                    value={formData.husbandName}
                    onChange={handleChange}
                    className="w-full px-6 py-3 sm:py-4 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    style={{ fontFamily: 'sans-serif', minWidth: '250px' }}
                  />
                </div>

                {/* Wife Name */}
                <div>
                  <input
                    type="text"
                    name="wifeName"
                    placeholder="Wife Name"
                    value={formData.wifeName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    style={{ fontFamily: 'sans-serif' }}
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    style={{ fontFamily: 'sans-serif' }}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Type of Service */}
                <div>
                  <input
                    type="text"
                    name="typeOfService"
                    placeholder="Type of Service"
                    value={formData.typeOfService}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    style={{ fontFamily: 'sans-serif' }}
                  />
                </div>

                {/* Preferred Date */}
                <div>
                  <input
                    type="date"
                    name="preferredDate"
                    placeholder="Preferred Date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    style={{ fontFamily: 'sans-serif' }}
                  />
                </div>

                {/* Book Appointment Button */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <button
                    type="submit"
                    className="w-full bg-blue-900 text-white font-bold px-6 py-3 sm:py-4 hover:bg-blue-800 transition-colors text-base sm:text-lg cursor-pointer"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    Book appointment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm