import { Await, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
    const { events } = useLoaderData();
    console.log('events1');    
    console.log(events);
    // const events = data.events;

    // if(data.isError){
    //     return <p>{data.message}</p>
    // }

//     return (
//     <>
//       {<EventsList events={events} />}
//     </>
//   );

return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
    </Suspense>
)
}

export default EventsPage;


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

export function loader(){
    return {
        events: loadEvents()
    }
}