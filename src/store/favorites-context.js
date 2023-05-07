import { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  isLoading: true,
  getFavorites: () => { },
  getTotalFavorites: () => { },
  updateIsFavorite: () => { }
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = "https://api-for-react-b4904-default-rtdb.firebaseio.com";
  const [totalFavorites, setTotalFavorites] = useState(0);

  async function getFavorites() {

    setIsLoading(true);

    fetch(`${baseUrl}/meetup.json?orderBy="isFav"&equalTo=true`).then((response) => {
      return response.json()
    }).then((data) => {
      const meetup_list = [];

      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        }

        meetup_list.push(meetup);
      }

      setUserFavorites(meetup_list)

      setIsLoading(false)
    });
  }

  async function getTotalFavorites() {
    fetch(`${baseUrl}/meetup.json?orderBy="isFav"&equalTo=true`)
      .then(response => response.json())
      .then(data => {
        const meetupIds = Object.keys(data);
        const count = meetupIds.length;
        setTotalFavorites(count)
      });
  }

  async function updateIsFavorite(meetupId, isFav) {

    fetch(`${baseUrl}/meetup/${meetupId}.json`, {
      method: 'PATCH', // use PATCH to update only the isFav property
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isFav: !isFav // set the isFav property to the new value
      })
    })
      .then(response => response.json())
      .then(data => { 
                      if(!isFav){
                        setTotalFavorites(totalFavorites+1);
                      } 
                      else{
                        setTotalFavorites(totalFavorites-1);

                      }

                      setUserFavorites(prevFavorites => {
                        // Filter out the meetup with the specified id
                        const updatedFavorites = prevFavorites.filter(meetup => meetup.id !== meetupId);
                        // Return the updated array
                        return updatedFavorites;
                      });

                      return data; 
                    }
            )
      .catch(error => console.error(error));
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: totalFavorites,
    isLoading: isLoading,
    getFavorites: getFavorites,
    getTotalFavorites: getTotalFavorites,
    updateIsFavorite: updateIsFavorite
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;