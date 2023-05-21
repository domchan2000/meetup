import {Route, Routes } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetup";
import ImportantPage from "./pages/Important";
import NewMeetupPage from "./pages/NewMeetup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Layout from "./components/layout/Layout";


function App() {

  return (
    
    <Layout> 
      <Routes>
        <Route path="/" element ={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/all" element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/important" element={<ImportantPage />} />
       
      </Routes>
    </Layout>
  );
}

export default App;
