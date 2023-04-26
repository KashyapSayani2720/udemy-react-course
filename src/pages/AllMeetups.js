import { useEffect, useState } from "react";
import MeetupList from "../components/meetup/MeetupList";

function AllMeetupsPage() {

    const [isLoading,setIsLoading] = useState(true);
    const [meetups, setMeetups] = useState();

    useEffect(() => {
        setIsLoading(true);
        fetch(
                'https://api-for-react-b4904-default-rtdb.firebaseio.com/meetup.json'
        )
        .then((response) => {
               return response.json()
            }
        )
        .then(data => {
                const meetup_list = [];

                for(const key in data){
                    const meetup = {
                        id : key,
                        ...data[key]
                    }

                    meetup_list.push(meetup);
                }
                
                setMeetups(meetup_list);
                setIsLoading(false);

            }
        )
    },[]);

    if(isLoading){
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
                <MeetupList meetups={meetups} />
            </section>
        )
    }

    
}

export default AllMeetupsPage;