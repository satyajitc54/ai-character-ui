import { useState } from "react";
import CharacterView from "./components/CharacterView";
import ChatInput from "./components/ChatInput";
import VideoBackground from "./components/VideoBackground";
import BackgroundSelector from "./components/BackgroundSelector";
import "./App.css";

import Scifi from "./assets/Scifi.mp4";
import platform from "./assets/platform.mov";

const backgrounds = {
  Scifi,
  platform,
};

function App() {
  const [bg, setBg] = useState("Scifi");

  return (
    <div className="app-root">
      {/* VIDEO LAYER */}
      <VideoBackground key={bg} src={backgrounds[bg]} />

      {/* UI LAYER */}
      <div className="ui-layer">
        <BackgroundSelector value={bg} onChange={setBg} />

        {/* STAGE */}
        <div className="stage">
          <CharacterView />
        </div>

        {/* INPUT */}
        <ChatInput />
      </div>
    </div>
  );
}

export default App;
