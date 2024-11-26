import { useState } from "react";
import {
  IoPlayOutline,
  IoPauseOutline,
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoInformationOutline,
  IoWarningOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import { useDummyData } from "./hooks/useDummyData";
import "./App.css";

export function App() {
  const { music, rooms, alert } = useDummyData();

  const [areGatesOpen, setAreGatesOpen] = useState(false);
  const [latchTime, setLatchTime] = useState("");

  function doAction(action: string) {
    console.log(action);
  }

  function handleLatchChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setLatchTime(event.target.value);
  }

  const isPlaying = music.playState === "playing";

  return (
    <div>
      <h1>Immersive smart office</h1>
      {alert ? (
        <div className={alert.variant}>
          <div>
            <IoInformationOutline />
            {/* or IoWarningOutline or IoAlertCircleOutline based on alert.variant */}
            <h2>{alert.title}</h2>
          </div>
          <p>{alert.description}</p>
        </div>
      ) : null}
      <div>
        <h2>Music</h2>
        <p>{isPlaying ? "Now playing" : "Up next"}:</p>
        <div>
          <img src={music.currentTrack.albumArt} alt="" />
          <div>
            <p>{music.currentTrack.title}</p>
            <p>by {music.currentTrack.artist}</p>
            <p>from {music.currentTrack.album}</p>
          </div>
        </div>
        <div>
          <button onClick={() => doAction("prevTrack")}>
            <IoPlayBackOutline />
          </button>
          <button onClick={() => doAction("togglePlayState")}>
            {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
          </button>
          <button onClick={() => doAction("nextTrack")}>
            <IoPlayForwardOutline />
          </button>
        </div>
      </div>

      <hr />

      <div>
        <h2>Gates</h2>
        {areGatesOpen ? (
          <span>Gates are open</span>
        ) : (
          <span>Gates are closed</span>
        )}
        <button onClick={() => setAreGatesOpen(!areGatesOpen)}>
          Open Gates
        </button>
        <div>
          <label htmlFor="latchTime">Latch open for:</label>
          <select id="latchTime" value={latchTime} onChange={handleLatchChange}>
            <option value="">Select time</option>
            <option value="10">10 mins</option>
            <option value="20">20 mins</option>
            <option value="60">1 hour</option>
          </select>
        </div>
      </div>

      <hr />

      <div>
        <h2>Lights</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.name}>
              <h3>{room.name}</h3>
              <ul>
                {room.lights.map((light) => (
                  <li key={light.id}>
                    <h4>{light.name}</h4>
                    <p>Reachable?: {light.state.reachable ? "Yes" : "No"}</p>
                    <p>Brightness: {light.state.brightness}%</p>
                    <button
                      disabled={!light.state.reachable}
                      onClick={() =>
                        doAction(
                          `turn ${light.name} ${light.state.on ? "off" : "on"}`
                        )
                      }
                    >
                      {light.state.on ? "On" : "Off"}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
