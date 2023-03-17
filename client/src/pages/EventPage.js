import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../utils/queries";

const EventPage = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { _id: id },
  });
  console.log(data);
  const event = data?.event;
  console.log(event);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : !event ? (
        <p>Event not found</p>
      ) : (
        <div>
          <img className="rounded-t-lg" src={event.image} alt="" />
          <h1>{event.title}</h1>
          <p>{event.savedCharityID.charityName}</p>
          <p>{event.date}</p>
          <p>{event.address}</p>
          <p>{event.description}</p>
        </div>
      )}
    </div>
  );
};

export default EventPage;
