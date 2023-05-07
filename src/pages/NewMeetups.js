import { useContext } from "react";
import NewMeetupForm from "../components/meetup/NewMeetupForm";
import { useNavigate } from "react-router-dom";
import MeetupsContext from "../store/meetups-context";

function NewMeetupsPage(props) {
    
    const navigate = useNavigate();
    const meetupContext = useContext(MeetupsContext);

    const { meetupdata } = props;

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
            <NewMeetupForm onAddMeetup={handleSubmit} onUpdateMeetup={handleSubmit} meetup={meetupdata} />
        </section>
    );
}

export default NewMeetupsPage;