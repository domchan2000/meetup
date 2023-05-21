import { createContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc,onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase.js";

const ImportantContext = createContext({
  important: [],
  totalImportant: 0,
  addImportant: (importantMeetup) => {},
  removeImportant: (meetupId) => {},
  itemIsImportant: (meetupId) => {},
});

export function ImportantContextProvider(props) {
  const [userImportant, setUserImportant] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchImportant = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "data", user.uid);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userImportantData = userData.important || [];
  
            // Filter important items by user ID
            const filteredImportant = userImportantData.filter(
              (important) => important.userId === user.uid
            );
  
            setUserImportant(filteredImportant);
          }
        } catch (error) {
          console.error("Error fetching important:", error);
        }
      }
    };
  
    fetchImportant();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "status", "database"), (doc) => {
      const data = doc.data();
      const isConnected = data && data.connected;

      if (!isConnected) {
        setUserImportant([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const updateImportantInFirestore = async (updatedImportant) => {
    if (user) {
      try {
        const userDocRef = doc(db, "data", user.uid);
        await updateDoc(userDocRef, { important: updatedImportant });
      } catch (error) {
        console.error("Error updating important in Firestore:", error);
      }
    }
  };

  const addImportantHandler = (importantMeetup) => {
    setUserImportant((prevUserImportant) => {
      const updatedImportant = [...prevUserImportant, importantMeetup];
      updateImportantInFirestore(updatedImportant);
      return updatedImportant;
    });
  };

  const removeImportantHandler = (meetupId) => {
    setUserImportant((prevUserImportant) => {
      const updatedImportant = prevUserImportant.filter(
        (meetup) => meetup.id !== meetupId
      );
      updateImportantInFirestore(updatedImportant);
      return updatedImportant;
    });
  };

  const itemIsImportantHandler = (meetupId) => {
    return userImportant.some((meetup) => meetup.id === meetupId);
  };

  const context = {
    important: userImportant,
    totalImportant: userImportant.length,
    addImportant: addImportantHandler,
    removeImportant: removeImportantHandler,
    itemIsImportant: itemIsImportantHandler,
  };

  return (
    <ImportantContext.Provider value={context}>
      {props.children}
    </ImportantContext.Provider>
  );
}

export default ImportantContext;
