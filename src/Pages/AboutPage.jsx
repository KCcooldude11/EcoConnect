function AboutPage() {
  return (
    <div className="h-screen w-full grid grid-rows-[1fr_auto_2fr] gap-6 py-28">
      {/* Full-row for the heading */}
      <div className="flex items-center justify-center bg-gray-100 shadow-lg">
        <h1 className="text-4xl font-bold">About EcoConnect: Join the Movement!</h1>
      </div>

      {/* Full-row for the paragraph */}
      <p className="text-center text-lg m-5 mx-20">
        Hey! We're EcoConnect, and we're here to make it easier for people to take meaningful action for the planet. We believe that collective effort can create real change, and we're building a platform to make that happen.
      </p>

    {/* Two-column grid with 1/3 and 2/3 width */}
<div className="grid grid-cols-[1fr_2fr] gap-4 px-6 ml-20">
{/* Animated cards in the first column */}
<div className="grid grid-rows-3 gap-4">
  {['Beach Cleanup', 'Tree Planting', 'Eco Workshop'].map((event, idx) => (
    <div
      key={idx}
      className="group w-full p-6 rounded-2xl shadow-lg bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">{event}</h2>
      <p className="text-gray-600">
        Learn more about {event.toLowerCase()} happening near you.
      </p>
    </div>
  ))}
</div>

{/* Content for the second column */}
<div className="ml-10 mr-20 mt-10">
  <p className="text-base/7 font-bold whitespace-pre-wrap">What We're Doing:</p>
  <ul className="text-base/7  tracking-wide list-inside list-disc">
  <li>Find Local Projects: Discover and join sustainability initiatives happening in your area. We're connecting you with real-world projects, 
  from community cleanups to practical workshops, so you can get involved where it matters.</li>
  <li>Support Impactful Organizations: We partner with trusted environmental organizations working on critical projects worldwide. 
  Your donations directly support their efforts, ensuring that your contributions make a tangible difference.</li>
  </ul>
</div>
</div>
</div>
  );
}

export default AboutPage;