// src/App.js
import React from "react";
import "react-h5-audio-player/lib/styles.css";
import Logo from "./img/logo.svg";
import "./css/style.css";
import MusicPlayer from "./AudioPlayer";

function App() {
  return (
    <div className="App">
      <div className="page-wrapper">
        <div className="header-block">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="body-block">
          <div className="player-block">
            <MusicPlayer />
          </div>
        </div>
        <div className="footer-block">
          <p>2024 Spericorn Technology Inc. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default App;
