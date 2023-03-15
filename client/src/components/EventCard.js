import { Link } from "react-router-dom";

function EventCard({ event }) {
  if (!event) {
    return <h3>No events match this search, check again later!</h3>;
  }

  return (
    <div className="mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 mb-4">
      <>
        <img className="rounded-t-lg" src={event.image} alt="" />
      </>
      <div className="p-5">
        <Link to={`/Event/${event._id}`}>
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
            {event.title}
          </h5>
        </Link>
        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
{/* 
          Will need to figure out the way to retrieve charity id in order for the following link to work */}
          <Link href="/charity/:id</p>">{event.savedCharity}</Link>
        </p>

        <div className="flex space-x-1 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>{" "}
          <p className="font-normal text-gray-400 ">{event.date}</p>
        </div>

        <div className="flex space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <p className="font-normal text-gray-400 ">{event.address}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
