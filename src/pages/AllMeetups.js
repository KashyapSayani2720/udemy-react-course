import { useContext, useEffect } from "react";
import MeetupList from "../components/meetup/MeetupList";
import MeetupsContext from "../store/meetups-context";

function AllMeetupsPage() {

    const meetupsContext = useContext(MeetupsContext);

    useEffect(() => {
        meetupsContext.getMeetups();
        // eslint-disable-next-line
    },[]);
    
    if(meetupsContext.isLoading){
        return (
            <section>
                <p>Loading ...</p>
            </section>
        )
    }
    else{
        return (
            <section>
                <h2 className="">All Meetups !!!</h2>
                <MeetupList meetups={meetupsContext.meetups} />
            </section>
        )
    }    
}

export default AllMeetupsPage;