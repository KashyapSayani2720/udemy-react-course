import { createContext, useState } from 'react';

const MeetupsContext = createContext({
    meetups: [],
    totalMeetups: 0,
    isLoading: true,
    getMeetups: () => {},
    addMeetup: () => {},
    removeMeetup: () => {}
});

export function MeetupsContextProvider(props) {
  const [userMeetups, setUserMeetups] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  async function getMeetups(){
    
    setIsLoading(true);

    fetch('https://api-for-react-b4904-default-rtdb.firebaseio.com/meetup.json').then((response) => {
      return response.json()
    }).then((data)=> {
      const meetup_list = [];
  
      for(const key in data){
        const meetup = {
          id : key,
          ...data[key]
        }
        
        meetup_list.push(meetup);
      }
      
      setUserMeetups(meetup_list);
      console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
      setIsLoading(false);
    });
  }


  function addMeetupHandler(meetup) {
    setUserMeetups((prevUserMeetups) => {
      return prevUserMeetups.concat(meetup);
    });
  }

  function removeMeetupHandler(meetupId) {
    setUserMeetups(prevUserMeetups => {
      return prevUserMeetups.filter(meetup => meetup.id !== meetupId);
    });
  }
  
  const context = {
    meetups: userMeetups,
    totalMeetups: userMeetups.length,
    isLoading: isLoading,
    getMeetups: getMeetups,
    addMeetup: addMeetupHandler,
    removeMeetup: removeMeetupHandler
  };

  return (
    <MeetupsContext.Provider value={context}>
      {props.children}
    </MeetupsContext.Provider>
  );
}

export default MeetupsContext;