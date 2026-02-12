import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage(){
    const data = useRouteLoaderData('event-detail');
    console.log(data);
    const event = data.event;
    return (
        <EventForm method="patch" event={event}/> 
    );
}

export default EditEventPage;