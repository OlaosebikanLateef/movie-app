

  const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Contact Us
        </h1>

        <p className="text-gray-400 mb-8">
          We'd love to hear from you. Fill out the form below and we'll get back to you.
        </p>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-white mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-white mb-2">
              Gender
            </label>
            <select
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;