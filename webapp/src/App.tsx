import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './App.css';
import Feed from './components/feed';
import LecturePage from './pages/LecturePage';

function App() {
  return (
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<LecturePage/>}/>
                <Route path="/feed/" element={<Feed/>}/>
            </Routes>
      </BrowserRouter>
  );
}

export default App;
