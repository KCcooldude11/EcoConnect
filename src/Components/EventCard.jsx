// Updated EventCard.jsx with modal logic
import { useState, useRef, useEffect } from "react";

function EventCard({ event, isRSVPd, onRSVP }) {
  const {
    title = "",
    address = "",
    start_time = "",
    description = ""
  } = event || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const el = descRef.current;
      if (el && !isExpanded) {
        setShouldShowReadMore(el.scrollHeight > el.offsetHeight + 1);
      }
    };
    checkOverflow();
  }, [description, isExpanded]);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between h-[360px] cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div
          className="h-32 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/event-banner.jpg')` }}
        ></div>
        <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-base text-gray-600 mb-1">{address}</p>
                <p className="text-base text-gray-500 mb-3">{start_time}</p>
                <div
                    ref={descRef}
                    className={`text-base text-gray-700 overflow-hidden ${
                    isExpanded ? '' : 'line-clamp-3'
                    }`}
                    style={{ maxHeight: isExpanded ? 'none' : '4.5em' }}
                >
                    {description}
                </div>
            </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRSVP();
            }}
            disabled={isRSVPd}
            className={`mt-4 px-4 py-2 text-sm font-semibold rounded-lg w-full transition-all duration-200 ${
              isRSVPd
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isRSVPd ? "RSVP'd" : "RSVP"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-500 mb-1">{address}</p>
            <p className="text-sm text-gray-600 mb-4">{start_time}</p>
            <p className="text-gray-700 mb-4">{description}</p>
            <button
              onClick={() => {
                onRSVP();
                setShowModal(false);
              }}
              disabled={isRSVPd}
              className={`mt-2 px-4 py-2 text-sm font-semibold rounded-lg w-full transition-all duration-200 ${
                isRSVPd
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isRSVPd ? "RSVP'd" : "RSVP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EventCard;