import NewMeetupForm from "../components/meetup/NewMeetupForm";
import { useNavigate } from "react-router-dom";

function NewMeetupsPage() {
    
    const navigate = useNavigate();

    function handleSubmit(meetup){
        fetch(
            'https://api-for-react-b4904-default-rtdb.firebaseio.com/meetup.json',
            {
                method: 'POST',
                body: JSON.stringify(meetup),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(
            navigate('/')        
        );
    }
    
    return (
        <section>
            <h1>New Meetups !!!</h1>
            <NewMeetupForm onAddMeetup={handleSubmit} />
        </section>
    );
}

export default NewMeetupsPage;