import {useNavigate} from 'react-router-dom'
import { collection, addDoc} from "firebase/firestore";
import { auth,db } from '../store/firebase'


import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {

  const navigate = useNavigate();

  const addMeetupHandler = async (meetupData) => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;
      meetupData['userId'] = userId;

      await addDoc(collection(db, `users/${userId}/meetups`), meetupData);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error("Error adding meetup:", error);
    }
  };

  return (
    <section>
      <h1>New Meetup Page</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
