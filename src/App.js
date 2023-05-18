import { Routes, Route } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetup";
import FavoritesPage from "./pages/Favourites";
import NewMeetupPage from "./pages/NewMeetup";
import Layout from "./components/layout/Layout";
import { GoogleLogin } from '@react-oauth/google';


function App() {
  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};

  return (
      <Layout>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      <Routes>
        <Route path="/" element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      </Layout>
  );
}

export default App;
