import { redirect, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage(){
    // const data = useLoaderData();
    // console.log(data);
    // const event = data.event;

    const data = useRouteLoaderData('event-detail');
    console.log(data);
    const event = data.event;    
    return(
        <>
            <EventItem event={event} />
        </>
    );   
}

export default EventDetailPage;

export async function loader({request, params}){
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);
    if(!response.ok)
        throw new Response (JSON.stringify({message: "Could not load event details"} , {status:500}));
    else
        return response;
}

export async function action({request, params}) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId,
    {
        method: request.method
    });

    if(!response.ok)
        throw new Response (JSON.stringify({message: "Could not delete event details"} , {status:500}));

    return redirect('/events');
}