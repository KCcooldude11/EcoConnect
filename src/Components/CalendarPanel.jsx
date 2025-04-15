import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

function CalendarPanel({ selectedDate, setSelectedDate, rsvps }) {
  const formattedDay = format(selectedDate, "d");
  const formattedWeekday = format(selectedDate, "EEEE").toUpperCase();

  const eventsOnDate = rsvps.filter(
    (e) => new Date(e.start_time).toDateString() === selectedDate.toDateString()
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return rsvps.some(
        (e) => new Date(e.start_time).toDateString() === date.toDateString()
      )
        ? "event-tile"
        : null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden h-[750px] mt-16 w-[650px] min-w-[650px] max-w-[650px]">
      {/* Left Side */}
        <div className="bg-green-600 text-white p-6 w-[200px] min-w-[200px] max-w-[200px] flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-6xl font-bold">{formattedDay}</h1>
            <p className="text-xl">{formattedWeekday}</p>

            <div className="text-sm mt-4 text-center">
            <p className="opacity-80 mb-1">Current Events</p>
            {eventsOnDate.length === 0 ? (
                <p className="italic">No events</p>
            ) : (
                <ul className="text-base mt-2 list-disc list-inside space-y-1 font-medium">
                {eventsOnDate.map((e, i) => (
                    <li key={i}>{e.title}</li>
                ))}
                </ul>
            )}
            </div>
        </div>
        </div>
      {/* Calendar */}
      <div className="p-4 w-[450px] min-w-[450px] max-w-[450px] h-full">
        <div className="bg-white shadow-lg rounded-2xl p-4">
            <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={tileClassName}
            className="w-full h-full calendar-stretch"
            />
        </div>
        </div>
      <style>{`
        .react-calendar {
        height: auto;
        width: auto;
        display: flex;
        flex-direction: column;
        border: none !important;
        border-radius: 0.75rem; /* Optional: softer corners */
        padding: 1rem;
        background-color: white;
        }
        .react-calendar__month-view__days {
          flex: 1;
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          grid-auto-rows: 1fr;
        }
        .react-calendar__tile {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .event-tile {
          background-color: #bbf7d0 !important;
          border-radius: 50% !important;
        }
        .react-calendar__tile--active {
          background-color: #16a34a !important;
          color: white !important;
        }
        .react-calendar__tile--now {
          border: 2px solid #22c55e !important;
        }
        .react-calendar__navigation {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default CalendarPanel;
