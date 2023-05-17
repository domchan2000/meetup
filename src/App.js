import { Routes, Route } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetup";
import FavoritesPage from "./pages/Favourites";
import NewMeetupPage from "./pages/NewMeetup";
import Layout from "./components/layout/Layout";

function App() {
  return (
      <Layout>
      <Routes>
        <Route path="/" element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      </Layout>
  );
}

export default App;
