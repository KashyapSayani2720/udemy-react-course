import { useContext } from "react";
import MeetupList from "../components/meetup/MeetupList";
import FavoritesContext from "../store/favorites-context";

function FavoritesPage() {

    const favContext = useContext(FavoritesContext);

    favContext.getFavorites();

    if(favContext.isLoading){
        return (
            <section>
                <p>Loading ...</p>
            </section>
        )
    }
    return (
        <section>
            <h2 className="">Favorites !!!</h2>
            <MeetupList meetups={favContext.favorites} />
        </section>
    );
}

export default FavoritesPage;