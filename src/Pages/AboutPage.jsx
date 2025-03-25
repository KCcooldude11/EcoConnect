function AboutPage() {
    return (
      <div className="p-10 pt-28">
        <h1 className="text-4xl font-bold mb-4">About EcoConnect</h1>
        <p>
          EcoConnect is a platform to connect people with local sustainability events,
          cleanups, and organizations.
        </p>
        {/* Animated Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {['Beach Cleanup', 'Tree Planting', 'Eco Workshop'].map((event, idx) => (
          <div
            key={idx}
            className="group w-80 p-6 rounded-2xl shadow-lg bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">{event}</h2>
            <p className="text-gray-600">
              Learn more about {event.toLowerCase()} happening near you.
            </p>
          </div>
        ))}
      </div>
      </div>
    );
  }
  
  export default AboutPage;
  