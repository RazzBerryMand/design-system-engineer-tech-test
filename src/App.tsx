import { Heading, Text, Image, Badge, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
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

  const renderAlertIcon = (variant: string) => {
    switch (variant) {
      case "info":
        return <IoInformationOutline />;
      case "warning":
        return <IoWarningOutline />;
      case "error":
        return <IoAlertCircleOutline />;
      default:
        return undefined;
    }
  };

  return (
    <div>
      <Box display={{ base: "none" }}>
        <Heading as="h1">Immersive smart office</Heading>
      </Box>

      {alert && (
        <Alert
          status={alert?.variant}
          title={alert?.title}
          icon={renderAlertIcon(alert?.variant)}
        >
          <Text>{alert?.description}</Text>
        </Alert>
      )}

      <div>
        <Box display={{ base: "none" }}>
          <Heading as="h2">Music</Heading>
          <Text>{isPlaying ? "Now playing" : "Up next"}:</Text>
        </Box>

        <div>
          <Image
            src={music.currentTrack.albumArt}
            alt={`Album art for ${music.currentTrack.album}`}
          />
          <div>
            <Text textStyle="lg">{music.currentTrack.title}</Text>
            <Text textStyle="md">by {music.currentTrack.artist}</Text>
            <Text textStyle="sm">from {music.currentTrack.album}</Text>
          </div>
        </div>

        <div>
          <Button onClick={() => doAction("prevTrack")}>
            <IoPlayBackOutline />
          </Button>
          <Button onClick={() => doAction("togglePlayState")}>
            {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
          </Button>
          <Button onClick={() => doAction("nextTrack")}>
            <IoPlayForwardOutline />
          </Button>
        </div>
      </div>

      <div>
        <Heading as="h2">Gates</Heading>

        {areGatesOpen ? (
          <Badge colorPalette="green" variant="solid" size="sm">
            Open
          </Badge>
        ) : (
          <Badge colorPalette="red" variant="solid" size="sm">
            Closed
          </Badge>
        )}

        <Button onClick={() => setAreGatesOpen(!areGatesOpen)}>
          Open Gates
        </Button>

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

      <div>
        <Heading as="h2">Lights</Heading>
        <ul>
          {rooms.map((room) => (
            <li key={room.name}>
              <Heading as="h3">{room.name}</Heading>
              <ul>
                {room.lights.map((light) => (
                  <li key={light.id}>
                    <Heading as="h4">{light.name}</Heading>

                    <Box display={{ base: "none" }}>
                      <Text>
                        Reachable?: {light.state.reachable ? "Yes" : "No"}
                      </Text>
                      <Text>Brightness: {light.state.brightness}%</Text>
                    </Box>

                    <Button
                      disabled={!light.state.reachable}
                      onClick={() =>
                        doAction(
                          `turn ${light.name} ${light.state.on ? "off" : "on"}`
                        )
                      }
                    >
                      {light.state.on ? "On" : "Off"}
                    </Button>
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
