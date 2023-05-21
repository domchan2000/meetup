import { createContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../store/firebase.js";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const user = auth.currentUser;

  
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "data", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserFavorites(userData.favorites || []);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    const saveFavorites = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, { favorites: userFavorites });
        } catch (error) {
          console.error("Error saving favorites:", error);
        }
      }
    };

    saveFavorites();
  }, [user, userFavorites]);


  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }

  async function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      const updatedFavorites = prevUserFavorites.filter(
        (meetup) => meetup.id !== meetupId
      );
      // Update Firestore with the updated favorites array
      updateFavoriteInFirestore(updatedFavorites);
      return updatedFavorites;
    });
  }

  async function updateFavoriteInFirestore(updatedFavorites) {
    if (user) {
      try {
        const userDocRef = doc(db, "data", user.uid);
        await updateDoc(userDocRef, { favorites: updatedFavorites });
      } catch (error) {
        console.error("Error updating favorites in Firestore:", error);
      }
    }
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
