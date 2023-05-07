import { useContext, useState } from 'react';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import MeetupsContext from '../../store/meetups-context';

function MeetupItem(props) {
  let { id, image, title, address, description, isFav } = props.meetup;

  const favContext = useContext(FavoritesContext);
  const meetupContext = useContext(MeetupsContext);

  const [isItemFav, setIsItemFav] = useState(isFav);
  const [showModal, setShowModal] = useState(false);

  async function handleFavorite() {
    await favContext.updateIsFavorite(id, isItemFav);
    setIsItemFav(!isItemFav);
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
                onClick={handleConfirmDelete}
              >Update Meetup</button>
            <button className={`${classes.modal__button} ${classes['modal__button--confirm']}`} onClick={handleDelete}>Delete Meetup</button>
          </div>
        </Card>
      </li>
      {showModal && (
        <div className={classes.modal}>
          <div className={classes.modal__content}>
            <div className={classes.modal__title}>
              Are you sure you want to delete this meetup?
            </div>
            <div className={classes.modal__buttons}>
              <button
                className={`${classes.modal__button} ${classes['modal__button--confirm']}`}
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className={`${classes.modal__button} ${classes['modal__button--cancel']}`}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MeetupItem;