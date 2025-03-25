import nature from '../assets/nature.png';
import mountain from '../assets/mountain2.png';
import giving from '../assets/giving.png';
import donate from '../assets/donate.png';

function HomePage() {
  const sections = [
    {
        heading: "EcoConnect",
        text: "Connecting communities to sustainability efforts",
        image: nature,
    },
    {
        heading: "Our Mission",
        text: "EcoConnect helps people take action for the planet.",
        image: mountain,
    },
    {
        heading: "Find Events & Communities",
        text: "Join sustainability projects near you.",
        image: giving,
    },
    {
        heading: "Donate to Trusted Organizations",
        text: "Support real environmental projects around the world.",
        image: donate,
    },
  ];

  return (
    <div className="scroll-smooth relative">
      <div className="">
        {sections.map((section, index) => (
          <div
            key={index}
            id={`section${index + 1}`}
            className="w-full h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${section.image})`,
            }}
          >
            <div className="text-center px-6 text-white drop-shadow-lg">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.heading}</h1>
              <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto">
                {section.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;