import {Route, Routes, useLocation } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetup";
import FavoritesPage from "./pages/Favourites";
import NewMeetupPage from "./pages/NewMeetup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Layout from "./components/layout/Layout";
import { GoogleLogin } from '@react-oauth/google';


function App() {
  const location = useLocation();

  return (
    <Layout> 
      <Routes>
        <Route path="/" element ={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/all" element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
       
      </Routes>
</Layout>
  );
}

export default App;
