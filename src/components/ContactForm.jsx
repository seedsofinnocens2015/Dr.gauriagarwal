import React, { useState, useEffect } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    husbandName: '',
    wifeName: '',
    phone: '',
    typeOfService: '',
    preferredDate: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Check if user has already submitted with this phone number
  useEffect(() => {
    const checkSubmission = () => {
      const submittedPhones = JSON.parse(localStorage.getItem('submittedPhones') || '[]')
      const currentPhone = formData.phone.trim().replace(/\D/g, '') // Remove non-digits for comparison
      
      if (currentPhone && submittedPhones.includes(currentPhone)) {
        setIsSubmitted(true)
        setSubmitMessage('You have already submitted a consultation request with this phone number. Please use a different phone number or contact us directly.')
        setSubmitError(true)
      } else {
        setIsSubmitted(false)
        if (submitMessage && submitMessage.includes('already submitted')) {
          setSubmitMessage('')
          setSubmitError(false)
        }
      }
    }

    if (formData.phone) {
      checkSubmission()
    }
  }, [formData.phone])

  // Auto refresh page after successful submission
  useEffect(() => {
    if (submitMessage && !submitError && submitMessage.includes('successfully')) {
      const timer = setTimeout(() => {
        window.location.reload()
      }, 3000) // 3 seconds delay

      return () => clearTimeout(timer)
    }
  }, [submitMessage, submitError])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear message when user starts typing
    if (submitMessage) {
      setSubmitMessage('')
      setSubmitError(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if already submitted
    const submittedPhones = JSON.parse(localStorage.getItem('submittedPhones') || '[]')
    const currentPhone = formData.phone.trim().replace(/\D/g, '') // Remove non-digits for comparison
    
    if (submittedPhones.includes(currentPhone)) {
      setSubmitMessage('You have already submitted a consultation request with this phone number. Please use a different phone number or contact us directly.')
      setSubmitError(true)
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitError(false)

    try {
      // API endpoint - adjust this URL based on your backend deployment
      const API_URL = 'https://dr-gauriagarwal-backend.vercel.app/api/contact'
      // const API_URL = 'http://localhost:5000/api/contact'
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store phone in localStorage to prevent duplicate submissions
        submittedPhones.push(currentPhone)
        localStorage.setItem('submittedPhones', JSON.stringify(submittedPhones))
        
        setSubmitMessage(data.message || 'Your consultation request has been submitted successfully!')
        setSubmitError(false)
        setIsSubmitted(true)
        
        // Reset form
        setFormData({
          husbandName: '',
          wifeName: '',
          phone: '',
          typeOfService: '',
          preferredDate: ''
        })
      } else {
        setSubmitMessage(data.message || 'Something went wrong. Please try again.')
        setSubmitError(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Failed to submit your request. Please check your internet connection and try again.')
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16">
          {/* Left Section - Heading */}
          <div className="w-full lg:w-1/5 flex-shrink-0 sm:mt-8">
            <h2 className="text-blue-900 font-bold">
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-2 sm:block">
                REQUEST FOR YOUR <span className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl">Consultation</span>
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
                    style={{ minWidth: '250px' }}
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
                  />
                </div>

                {/* Phone Number */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
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
                  />
                </div>

                {/* Book Appointment Button */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full bg-blue-900 text-white font-bold px-6 py-3 sm:py-4 hover:bg-blue-800 transition-colors text-base sm:text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : isSubmitted ? 'Already Submitted' : 'Book appointment'}
                  </button>
                </div>
              </div>

              {/* Success/Error Message */}
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg ${submitError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                  <p className="text-sm sm:text-base">
                    {submitMessage}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm