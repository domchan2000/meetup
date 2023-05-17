import { useContext } from "react";
import FavoritesContext from "../../store/favourites-context";

import Card from "../UI/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  }

  function deleteHandler() {
    fetch(
      `https://meetup-b9b58-default-rtdb.firebaseio.com/meetups/${props.id}.json`, {
        method: 'DELETE',
        headers: {
          body: JSON.stringify(props),
          headers: {
            "Content-Type": "application/json",
          },
        }
      }
    ).then(response => {
     if (response.ok) {
          window.alert('Data deleted successfully.');
          window.location.reload();
        } else {
          throw new Error('Failed to delete data.');
        }
      })
      .catch(error => {
        window.alert('Error deleting data: ' + error.message);
      });
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}</button>
        </div>
        <div className={classes.actions}>
          <button onClick={()=>deleteHandler('dataIdToDelete')}>Delete Data</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
