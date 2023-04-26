import React from 'react'
import LandingPage from './components/LandingPage/LandingPage';
import {Route, Routes} from 'react-router-dom';
import FootballPage from "./components/FootballPage/FootballPage";
import BasketballPage from "./components/BasketballPage/BasketballPage";
import BaseballPage from "./components/BaseballPage/BaseballPage";

function App() {
  return (
    <div className="App" id={'app'}>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/american-football"} element={<FootballPage />} />
        <Route path={"/basketball"} element={<BasketballPage />} />
        <Route path={"/baseball"} element={<BaseballPage />} />
      </Routes>
    </div>
  )
}

export default App
