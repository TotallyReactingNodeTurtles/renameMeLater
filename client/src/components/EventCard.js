import { Link } from "react-router-dom";
import { ADD_VOLUNTEER_EVENT } from "../utils/mutations";
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";

function EventCard({ event }) {
  const [userToken, setUserToken] = useState(Auth.getToken());
  
  const [addVolunteerEvent, { error }] = useMutation(ADD_VOLUNTEER_EVENT, {
    context: { token: userToken }, // Pass the JWT token in the context here
    update: (cache, { data: { addVolunteerEvent } }) => {
      
      // Update the cache
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleAddEvent = async (e) => { // Make the function async
    const eventId = e.target.dataset.id;
    console.log(eventId, userToken);
  
    try {
      const { data } = await addVolunteerEvent({
        variables: { eventId },
        update: (cache, { data: { addVolunteerEvent } }) => {
          // ...
        },
      });
  
      console.log('Mutation response data:', data); // Add this line
    } catch (error) {
      console.error('Error in addVolunteerEvent mutation:', error); // Add this line
    }
  };

  useEffect(() => {
    console.log(event);
  }, [event]);

  // create state to hold saved bookId values
  // const [savedEventIds, setSavedEventIds] = useState(getSavedEventIds());
  // // new
  // const [savedEvent] = useMutation(ADD_EVENT);

  // useEffect(() => {
  //   return () => saveEventIds(savedEventIds);
  // });

  
  if (!event) {
    return <h3>No events match this search, check again later!</h3>
  }

  return (
    
      <div className="flex mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 mb-4   transform hover:-translate-y-2 transition-transform duration-500 ease-in-out">
        <Link to={`/event/${event._id}`}>
          <img
            className="rounded-t-lg"
            src= {event.image}
            alt=""
          />
        </Link>
        <div className="p-5">
          <Link to={`/event/${event._id}`}>
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              {event.title}
            </h5>
          </Link>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            <Link to={ `/charity/${event.savedCharity._id}`}>{event.savedCharity}</Link>
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
            <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-4xl px-6 py-8 text-center m-2"
            data-te-ripple-init
            data-te-ripple-color="light"
            data-id={event._id} onClick={handleAddEvent}>
            Sign up!
          </button>
          </div>
        </div>
      </div>
  );
}

export default EventCard;
