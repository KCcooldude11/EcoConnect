import background from '../assets/green-leaves-plants.jpg';
import FAQ from '../Components/FAQ';
import treePlanting from '../assets/tree-planting.jpg'; // Import the image

function AboutPage() {
  return (
    <div className="h-screen w-full grid grid-rows-[1fr_auto_2fr] gap-6 py-28">
      {/* Full-row for the heading */}
      <div
        className="flex items-center justify-center bg-gray-100 shadow-lg bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${background})` }}
      >
        <h1 className="text-4xl font-bold text-white">About EcoConnect: Join the Movement!</h1>
      </div>

      {/* Full-row for the paragraph */}
      <div>
        <p className="text-center text-lg m-5 mx-20">
          Hey! We're EcoConnect, and we're here to make it easier for people to take meaningful action for the planet. We believe that collective effort can create real change, and we're building a platform to make that happen.
        </p>
      </div>

      {/* Two-column grid with 1/3 and 2/3 width */}
      <div className="grid grid-cols-[1fr_3fr] gap-4 px-6">
        {/* Animated cards in the first column */}
        <div className="grid grid-rows-20 gap-2">
          <div className="fixed">
            {[
              { title: "What we're doing", target: "what-we-are-doing" },
              { title: "Our Mission", target: "our-mission" },
              { title: "FAQ's", target: "faqs" },
            ].map((event, idx) => (
              <div
                key={idx}
                className="group w-full bg-white hover:scale-105 transition-all duration-300"
              >
                <h2
                  className="text-xl font-semibold group-hover:text-green-600 cursor-pointer"
                  onClick={() => {
                    document.getElementById(event.target).scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {event.title}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Content for the second column */}
        <div className="ml-10 mr-20">
          <div id="what-we-are-doing" className="mb-4 scroll-mt-20">
            <p className="text-base/7 font-bold whitespace-pre-wrap">What We're Doing:</p>
            <ul className="text-base/7 tracking-wide list-inside list-disc">
              <li>
                Find Local Projects: Discover and join sustainability initiatives happening in your area. We're connecting you with real-world
                projects, from community cleanups to practical workshops, so you can get involved where it matters.
              </li>
              <li>
                Support Impactful Organizations: We partner with trusted environmental organizations working on critical projects worldwide. Your
                Donations directly support their efforts, ensuring that your contributions make a tangible difference.
              </li>
            </ul>
            <div className="flex justify-center items-center">
              <img className="p-10 w-150" src={treePlanting} alt="Tree Planting" />
            </div>
          </div>

          <div id="our-mission" className="mb-4 scroll-mt-20 bg-green-700 text-white p-6 rounded-lg shadow-lg">
            <p className="text-center font-bold text-xl whitespace-pre-wrap">Our Mission:</p>
            <p>
              EcoConnect helps people take action for the planet by connecting them with local projects, trusted organizations, and sustainability
              resources.
            </p>
          </div>

          <div id="faqs" className="mb-4 scroll-mt-20">
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
</div>
  );
}

export default AboutPage;
