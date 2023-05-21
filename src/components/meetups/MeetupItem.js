import { useContext } from "react";
import ImportantContext from "../../store/important-context";
import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../store/firebase.js";

import Card from "../UI/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  // const importantCtx = useContext(ImportantContext);

  // const itemIsImportant = importantCtx.itemIsImportant(props.id);

  // function toggleImportantStatusHandler() {
  //   if (itemIsImportant) {
  //     importantCtx.removeImportant(props.id);
  //   } else {
  //     importantCtx.addImportant({
  //       id: props.id,
  //       title: props.title,
  //       description: props.description,
  //       image: props.image,
  //       address: props.address,
  //       userId: auth.currentUser.uid
  //     });
  //   }
  // }

  async function deleteHandler() {
    const userId = auth.currentUser.uid;

    const meetupRef = doc(db, `data/${userId}/meetups/${props.id}`);
  
    try {
      await deleteDoc(meetupRef);
      // Remove the meetup from important as well
      // if (itemIsImportant) {
      //   importantCtx.removeImportant(props.id);
      // }
    } catch (error) {
      window.alert('Error deleting data: ' + error.message);
    }
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
          {/* <button onClick={toggleImportantStatusHandler}>{itemIsImportant ? 'Remove from Important' : 'To Important'}</button> */}
          <button onClick={()=>deleteHandler('dataIdToDelete')}>Delete Data</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
