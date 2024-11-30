import {
  Heading,
  Text,
  Image,
  Badge,
  Group,
  List,
  Flex,
  Stack,
  Container,
  Card,
  createListCollection,
  VisuallyHidden,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
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
  const { music, rooms, alert, gates } = useDummyData();

  const [areGatesOpen, setAreGatesOpen] = useState(false);
  const [latchTime, setLatchTime] = useState<string[]>([]);

  function doAction(action: string) {
    console.log(action);
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

  const mainGateLatchTimes = gates[0].latchTimes;

  const latchTimes = createListCollection({
    items: mainGateLatchTimes,
  });

  return (
    <Container p="4">
      <VisuallyHidden>
        <Heading as="h1">Immersive smart office</Heading>
      </VisuallyHidden>

      <Stack gap="4">
        <Card.Root>
          {alert ? (
            <Alert
              status={alert?.variant}
              title={alert?.title}
              icon={renderAlertIcon(alert?.variant)}
            >
              <Text>{alert?.description}</Text>
            </Alert>
          ) : (
            <Center h="full" p="4">
              <Spinner size="xl" />
            </Center>
          )}
        </Card.Root>

        <Card.Root>
          <Image
            src={music.currentTrack.albumArt}
            alt={`Album art for ${music.currentTrack.album}`}
          />

          <Card.Body gap="2">
            <VisuallyHidden>
              <Card.Title>Music</Card.Title>
              <Text>{isPlaying ? "Now playing" : "Up next"}:</Text>
            </VisuallyHidden>

            <Stack>
              <Text textStyle="lg">{music.currentTrack.title}</Text>
              <Text textStyle="md">by {music.currentTrack.artist}</Text>
              <Text textStyle="sm">from {music.currentTrack.album}</Text>
            </Stack>
          </Card.Body>

          <Card.Footer gap="2">
            <Group>
              <Button onClick={() => doAction("prevTrack")}>
                <IoPlayBackOutline />
              </Button>
              <Button onClick={() => doAction("togglePlayState")}>
                {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
              </Button>
              <Button onClick={() => doAction("nextTrack")}>
                <IoPlayForwardOutline />
              </Button>
            </Group>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Header gap="2">
            <Flex justifyContent="space-between">
              <Card.Title>Gates</Card.Title>
              <Badge
                colorPalette={areGatesOpen ? "green" : "red"}
                variant="solid"
                size="sm"
              >
                {areGatesOpen ? "Open" : "Closed"}
              </Badge>
            </Flex>
          </Card.Header>

          <Card.Body gap="2">
            <SelectRoot
              collection={latchTimes}
              value={latchTime}
              onValueChange={(e) => setLatchTime(e.value)}
            >
              <VisuallyHidden>
                <SelectLabel>Select latch time</SelectLabel>
              </VisuallyHidden>
              <SelectTrigger>
                <SelectValueText placeholder="Latch" />
              </SelectTrigger>
              <SelectContent>
                {latchTimes.items.map((duration) => (
                  <SelectItem item={duration} key={duration.value}>
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Card.Body>

          <Card.Footer gap="2">
            <Button onClick={() => setAreGatesOpen(!areGatesOpen)}>
              Open Gates
            </Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Body gap="2">
            <Card.Title>Lights</Card.Title>
          </Card.Body>

          <Card.Footer gap="2">
            <List.Root variant="plain">
              <Flex width="100%" overflowX="auto" wrap="nowrap" gap="4">
                {rooms.map((room) => (
                  <List.Item key={room.name}>
                    <Flex direction="column" gap="4">
                      <Heading as="h3">{room.name}</Heading>

                      <List.Root variant="plain">
                        {room.lights.map((light) => (
                          <List.Item key={light.id}>
                            <VisuallyHidden>
                              <Text>
                                Reachable?:{" "}
                                {light.state.reachable ? "Yes" : "No"}
                              </Text>
                              <Text>Brightness: {light.state.brightness}%</Text>
                            </VisuallyHidden>

                            <Button
                              disabled={!light.state.reachable}
                              onClick={() =>
                                doAction(
                                  `turn ${light.name} ${
                                    light.state.on ? "off" : "on"
                                  }`
                                )
                              }
                            >
                              <Heading as="h4">{light.name}</Heading>
                              {/* {light.state.on ? "On" : "Off"} */}
                              {/* TODO: icon to show on or off */}
                            </Button>
                          </List.Item>
                        ))}
                      </List.Root>
                    </Flex>
                  </List.Item>
                ))}
              </Flex>
            </List.Root>
          </Card.Footer>
        </Card.Root>
      </Stack>
    </Container>
  );
}
