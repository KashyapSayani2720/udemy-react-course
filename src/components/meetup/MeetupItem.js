import { useContext, useState } from 'react';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import MeetupsContext from '../../store/meetups-context';
import { useNavigate } from 'react-router-dom';
import DeleteModel from './DeleteModel';

function MeetupItem(props) {
  let { id, image, title, address, description, isFav } = props.meetup;

  const favContext = useContext(FavoritesContext);
  const meetupContext = useContext(MeetupsContext);

  const [isItemFav, setIsItemFav] = useState(isFav);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function handleFavorite() {
    await favContext.updateIsFavorite(id, isItemFav);
    setIsItemFav(!isItemFav);
  }

  async function handleUpdate(){
    navigate("/new-meetup", {state: {meetup: props.meetup}});
  }

  function handleDelete() {
    setShowModal(true);
  }

  async function handleConfirmDelete() {
    await meetupContext.deleteMeetup(id);
    setShowModal(false);
  }

  return (
    <>
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
          <div className={classes.modal__buttons}>
            <button className={`${classes.modal__button} ${classes['modal__button--cancel']}`} onClick={handleFavorite}>
              {isItemFav ? 'Remove From Favorite' : 'Add To Favorite'}
            </button>
            <button
                className={`${classes.modal__button} ${classes['modal__button--update']}`}
                onClick={handleUpdate}
              >Update Meetup</button>
            <button className={`${classes.modal__button} ${classes['modal__button--confirm']}`} onClick={handleDelete}>Delete Meetup</button>
          </div>
        </Card>
      </li>
      {showModal && (
        <DeleteModel handleConfirmDelete={handleConfirmDelete} setShowModal={setShowModal}/>
      )}
    </>
  );
}

export default MeetupItem;