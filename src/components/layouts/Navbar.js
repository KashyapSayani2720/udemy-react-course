import { Link } from "react-router-dom";
import classes from './Navbar.module.css';
import { useContext, useEffect } from "react";
import FavoritesContext from "../../store/favorites-context";

function Navbar() {

    const favContext = useContext(FavoritesContext);
    useEffect(()=>{
        favContext.getTotalFavorites();
    })

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                React Meetups
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>All Meetups</Link>
                    </li>
                    <li>
                        <Link to='/new-meetup'>Add New Meetups</Link>
                    </li>
                    <li>
                        <Link to='/favorites'>My Favorites <span className={classes.badge}>{favContext.totalFavorites}</span></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;