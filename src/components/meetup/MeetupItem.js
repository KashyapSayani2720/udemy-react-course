import { useContext, useState } from 'react';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites-context';

function MeetupItem(props) {

    let { id, image, title, address, description, isFav } = props.meetup;

    const favContext = useContext(FavoritesContext);

    const [isItemFav,setIsItemFav] = useState(isFav);
        

    function handleFavorite() {
        setIsItemFav(!isItemFav);
        favContext.updateIsFavorite(id,isItemFav);
    }

    return (
        <li key={id} className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={image} alt={title} />
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <address>{address}</address>
                    <p>{description}</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={handleFavorite}>{isItemFav ? "Remove From Favorite" : "Add To Favorite"}</button>
                </div>
            </Card>
        </li>
    );
}

export default MeetupItem;