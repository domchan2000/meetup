import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, auth } from "../store/firebase.js"

import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const userId = storedUserId || auth.currentUser?.uid;

        if (!userId) {
          setIsLoading(false);
          return;
        }

        const meetupCollection = collection(db, `users/${userId}/meetups`);
        const q = query(meetupCollection);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const meetupsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLoadedMeetups(meetupsData);
          setIsLoading(false);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching meetups:", error);
      }
    };

    fetchMeetups();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      localStorage.setItem("userId", user.uid);
    } else {
      localStorage.removeItem("userId");
    }
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  const isMeetupsEmpty = loadedMeetups.length === 0;

  return (
    <div>
      <h1>All Meetups</h1>
      {isMeetupsEmpty ? (
        <p>No meetups found</p>
      ) : (
        <MeetupList meetups={loadedMeetups} />
      )}
    </div>
  );
}

export default AllMeetupsPage;
