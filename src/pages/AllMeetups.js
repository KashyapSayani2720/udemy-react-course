import { useEffect, useState } from "react";
import MeetupList from "../components/meetup/MeetupList";

const DUMMY_DATA = [
    {
        id: 'm1',
        title: 'This is a first meetup',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Meetupstreet 5, 12345 Meetup City',
        description:
            'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    },
    {
        id: 'm2',
        title: 'This is a second meetup',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Meetupstreet 5, 12345 Meetup City',
        description:
            'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    },
];

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