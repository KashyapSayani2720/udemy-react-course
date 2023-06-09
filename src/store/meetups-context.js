import { createContext, useState } from 'react';

const MeetupsContext = createContext();

export function MeetupsContextProvider(props) {
  const [userMeetups, setUserMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = "https://api-for-react-b4904-default-rtdb.firebaseio.com";

  async function getMeetups() {

    setIsLoading(true);

    fetch(`${baseUrl}/meetup.json`).then((response) => {
      return response.json();
    }).then((data) => {
      const meetup_list = [];

      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        }

        meetup_list.push(meetup);
      }

      setUserMeetups(meetup_list);
      setIsLoading(false);
    })
      .catch(error => console.error(error));;
  }

  async function addMeetup(meetup) {

    fetch(
      `${baseUrl}/meetup.json`,
      {
        method: 'POST',
        body: JSON.stringify(meetup),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      if (response.ok) {
        setUserMeetups(prevUserMeetups => {
          return [
            ...prevUserMeetups,
            {
              id: meetup.id,
              title: meetup.title,
              image: meetup.image,
              address: meetup.address,
              description: meetup.description,
              isFav: meetup.isFav
            }
          ];
        })
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  async function updateMeetup(meetupId, meetup) {
    try {
      const response = await fetch(`${baseUrl}/meetup/${meetupId}.json`, {
        method: 'PATCH', // use PATCH to update only the isFav property
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: meetup.title,
          image: meetup.image,
          description: meetup.description,
          address: meetup.address,
        })
      });
  
      if (response.ok) {
        // Fetch the updated data from the server
        const updatedResponse = (await fetch(`${baseUrl}/meetup/${meetupId}.json`)).json();

       const meetup_list = [];

      for (const key in updatedResponse) {
        const meetup = {
          id: key,
          ...updatedResponse[key]
        }

        meetup_list.push(meetup);
      }

      setUserMeetups(meetup_list);
      } else {
        console.error('Failed to update Meetup');
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  async function deleteMeetup(meetupId) {
    const url = `${baseUrl}/meetup/${meetupId}.json`;

    fetch(url, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          setUserMeetups(prevUserMeetups => {
            return prevUserMeetups.filter(meetup => meetup.id !== meetupId);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const context = {
    meetups: userMeetups,
    totalMeetups: userMeetups.length,
    isLoading: isLoading,
    getMeetups: getMeetups,
    addMeetup: addMeetup,
    updateMeetup: updateMeetup,
    deleteMeetup: deleteMeetup
  };

  return (
    <MeetupsContext.Provider value={context}>
      {props.children}
    </MeetupsContext.Provider>
  );
}

export default MeetupsContext;