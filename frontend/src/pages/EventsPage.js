import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    const data = useLoaderData();
    const events = data.events;

    if(data.isError){
        return <p>{data.message}</p>
    }

    return (
    <>
      {<EventsList events={events} />}
    </>
  );
}

export default EventsPage;


export async function loader(){
    const response = await fetch('http://localhost:8080/eventsdmdlmd');

    if (!response.ok) {
        // return {isError : true, message: 'Could not load data'};
        throw {message: 'Could not fetch events'};
    } else {
        return response;
        // const resData = await response.json();
        // return resData.events;
    }    
}