import { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites : [],
  totalFavorites : 0,
  isLoading : true,
  getFavorites : () => {},
  addFavorite : (favoriteMeetup) => {},
  removeFavorite : (meetupId) => {},
  itemIsFavorite : (meetupId) => {}
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  async function getFavorites(){
    
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
      
      setUserFavorites(meetup_list)

      setIsLoading(false)
    });
  }


  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
    });
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some(meetup => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    isLoading: isLoading,
    getFavorites: getFavorites,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;