import React from 'react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/sl.png")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center space-y-4">
          <h1 className="text-5xl font-bold leading-tight">Welcome to Serene Tours</h1>
          <p className="text-xl md:text-2xl max-w-xl">Explore the world with serene luxury. Tailor your perfect getaway with us.</p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition duration-300">Start Your Journey</button>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Serene Tours</h2>
          <p className="text-lg text-gray-700">
            At Serene Tours, we believe in offering the best travel experiences to our customers. Whether you're looking for a peaceful getaway or an adventure filled with thrilling activities, we have tailored packages just for you. 
            Join us for an unforgettable experience in the world's most beautiful destinations.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-screen-lg mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h2>
          <p className="text-lg text-gray-700 mb-12">We offer a variety of travel services designed to create the best possible experiences for our customers.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/cus.png" alt="Custom Tour" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Custom Tours</h3>
              <p className="text-gray-600 mt-2">Personalized tours that suit your travel style and preferences.</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/cus2.png" alt="Adventure Tours" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Adventure Tours</h3>
              <p className="text-gray-600 mt-2">Join our action-packed tours to experience the thrills of the wild.</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/cus3.png" alt="Luxury Getaways" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Luxury Getaways</h3>
              <p className="text-gray-600 mt-2">Indulge in high-end, luxurious vacations to the world's finest destinations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-6">Get in touch with us for more details or to start planning your next adventure.</p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">Contact Us</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
