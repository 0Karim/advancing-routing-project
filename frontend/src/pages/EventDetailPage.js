import { Await, redirect, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

function EventDetailPage(){
    // const data = useLoaderData();
    // console.log(data);
    // const event = data.event;

    const {event, events} = useRouteLoaderData('event-detail');


    return(
        <>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={event}>
                {(loadedEvent) => <EventItem event={loadedEvent} />}
            </Await>
        </Suspense>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>        
        </>
    );

    // console.log(data);
    // const event = data.event;    
    // return(
    //     <>
    //         <EventItem event={event} />
    //     </>
    // );   
}

export default EventDetailPage;

async function loadEvents(){
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return {isError : true, message: 'Could not load data'};
        // throw {message: 'Could not fetch events'};
        throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500});
        // return json({message: 'Could not fetch events.'}, {status: 500}) //older version v6
    } else {
        // return response;
        const resData = await response.json();
        return resData.events;
    }
}


async function loadEvent (id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    if(!response.ok)
        throw new Response (JSON.stringify({message: "Could not load event details"} , {status:500}));
    else
    {
        const resData = await response.json();
        return resData.event;        
    }
}


export async function loader({request, params}){
    const id = params.eventId;
    return({
        event: await loadEvent(id),
        events: loadEvents()        
    })
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