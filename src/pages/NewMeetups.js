import { useContext } from "react";
import NewMeetupForm from "../components/meetup/NewMeetupForm";
import { useNavigate } from "react-router-dom";
import MeetupsContext from "../store/meetups-context";
import { useLocation } from 'react-router-dom';

function NewMeetupsPage() {
    
    const navigate = useNavigate();
    const meetupContext = useContext(MeetupsContext);
    const location = useLocation();
    const meetupData = location.state?.meetup;

    async function handleSubmit(meetup){
        if(meetup.id){
            await meetupContext.updateMeetup(meetup.id,meetup);
        }
        else{
            await meetupContext.addMeetup(meetup);
        }
        navigate("/");
        
    }
    
    return (
        <section>
            <h1>New Meetups !!!</h1>
            <NewMeetupForm onAddMeetup={handleSubmit} onUpdateMeetup={handleSubmit} meetup={meetupData} />
        </section>
    );
}

export default NewMeetupsPage;