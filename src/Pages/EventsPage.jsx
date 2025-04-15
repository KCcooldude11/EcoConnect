import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { eventData } from "../data/eventData";
import { useAuth } from "../Components/AuthContext";
import CalendarPanel from "../Components/CalendarPanel";
import EventCard from "../Components/EventCard";

function EventsPage() {
  const { user } = useAuth();
  const location = useLocation();
  const [rsvps, setRsvps] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const highlightedRef = useRef(null);

  const handleRSVP = (event) => {
    if (!user) return alert("Please log in to RSVP.");
    const alreadyRSVPd = rsvps.some(
      (e) => e.title === event.title && e.start_time === event.start_time
    );
    if (!alreadyRSVPd) {
      setRsvps((prev) => [...prev, event]);
    }
  };

  const filteredEvents = eventData.filter((event) => {
    const textMatch =
      event.title.toLowerCase().includes(filterText.toLowerCase()) ||
      event.description.toLowerCase().includes(filterText.toLowerCase());
    return textMatch;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const start = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(start, start + eventsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetTitle = params.get("event");

    if (targetTitle && highlightedRef.current) {
      highlightedRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-4 sm:px-6 lg:px-8 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <CalendarPanel
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            rsvps={rsvps}
          />

          <div className="w-full lg:w-2/3">
            <div className="mb-6">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search by title or description"
                className="w-full sm:w-[80%] lg:w-[70%] xl:w-[60%] px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentEvents.map((event) => {
                const isTarget =
                  new URLSearchParams(location.search).get("event") === event.title;

                return (
                  <div
                    key={`${event.title}-${event.start_time}`}
                    ref={isTarget ? highlightedRef : null}
                    className={isTarget ? "ring-2 ring-green-400 rounded-lg" : ""}
                  >
                    <EventCard
                      event={event}
                      isRSVPd={rsvps.some(
                        (e) => e.title === event.title && e.start_time === event.start_time
                      )}
                      onRSVP={() => handleRSVP(event)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Prev
              </button>
              <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50 flex items-center gap-1"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
