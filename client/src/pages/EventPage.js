import React from "react"
import {useParams} from "react-router-dom"
import { useQuery } from "@apollo/client";
import { QUERY_EVENT   } from "../utils/queries";

function EventPage () {
    const{_id} = useParams(); //This gets the id from the URL
    const {data} = useQuery(QUERY_EVENT, {
        variables: {_id:_id} //This uses the id field to fetch the event
    });

    let event;
    if(data) {
        event = data.event;
    }

    return (
        <div>
          {event ? (
            <div>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
          ) : (
            <h2>No event found with this ID</h2>
          )}
        </div>
      );

}
export default EventPage;

//Components
//IF UserType = Charity
    //Photo
    //Event information (editable)
    //IF CREATING NEW EVENT
        //Sticky footer:  "Create Event Button"
            //"Event successfully created" popup
        //ELSE
        ///"See Volunteers" button
            //Volunteer popup Modal

//ELSE
    //Photo
    //Event information (static)
    //Sticky footer: Date/Time and Sign Up button
