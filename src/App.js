import React from 'react'
import LandingPage from './components/LandingPage/LandingPage';
import {Route, Routes} from 'react-router-dom';
import FootballPage from "./components/FootballPage/FootballPage";
import BasketballPage from "./components/BasketballPage/BasketballPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/american-football"} element={<FootballPage />} />
        <Route path={"/basketball"} element={<BasketballPage />} />
        <Route path={"/baseball"} element={<FootballPage />} />
      </Routes>
    </div>
  )
}

export default App
