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
  IconButton,
  VStack,
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
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  IoPlaySharp,
  IoPauseSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoInformation,
  IoWarning,
  IoAlertCircle,
  IoAlertCircleOutline,
  IoBulbOutline,
  IoBulb,
  IoSettingsSharp,
} from "react-icons/io5";
import { useDummyData } from "./hooks/useDummyData";

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
        return <IoInformation />;
      case "warning":
        return <IoWarning />;
      case "error":
        return <IoAlertCircle />;
      default:
        return undefined;
    }
  };

  const mainGateLatchTimes = gates[0].latchTimes;

  const latchTimes = createListCollection({
    items: mainGateLatchTimes,
  });

  return (
    <Container p="4" maxW="xl">
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
            <Group w="full" grow>
              <IconButton
                aria-label="Skip back"
                onClick={() => doAction("prevTrack")}
              >
                <IoPlaySkipBackSharp />
              </IconButton>
              <IconButton
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={() => doAction("togglePlayState")}
              >
                {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
              </IconButton>
              <IconButton
                aria-label="Skip forward"
                onClick={() => doAction("nextTrack")}
              >
                <IoPlaySkipForwardSharp />
              </IconButton>
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
            {areGatesOpen ? (
              <Alert
                status="error"
                title="Please close the gate when not in use"
              />
            ) : (
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
            )}
          </Card.Body>

          <Card.Footer gap="2">
            <Button
              aria-label={areGatesOpen ? "Close" : "Open"}
              w="full"
              onClick={() => setAreGatesOpen(!areGatesOpen)}
            >
              {areGatesOpen ? "Close" : "Open"}
            </Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Body gap="2">
            <Card.Title>Lights</Card.Title>
          </Card.Body>

          <Card.Footer gap="2">
            <List.Root variant="plain">
              <Flex gap="4" wrap="wrap">
                {rooms.map((room) => (
                  <List.Item key={room.name}>
                    <DialogRoot
                      size="cover"
                      placement="center"
                      motionPreset="slide-in-bottom"
                    >
                      <DialogTrigger asChild>
                        <VStack>
                          <IconButton
                            aria-label={`${room.name} light settings`}
                            variant="outline"
                            size="lg"
                          >
                            <IoSettingsSharp />
                          </IconButton>
                          <Heading as="h3" textStyle="xs">
                            {room.name}
                          </Heading>
                        </VStack>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{room.name}</DialogTitle>
                          <DialogCloseTrigger />
                        </DialogHeader>
                        <DialogBody>
                          <List.Root variant="plain">
                            <Flex wrap="nowrap" direction="column" gap="4">
                              {room.lights.map((light) => (
                                <List.Item key={light.id}>
                                  <VisuallyHidden>
                                    <Text>
                                      Reachable?:{" "}
                                      {light.state.reachable ? "Yes" : "No"}
                                    </Text>
                                    <Text>
                                      Brightness: {light.state.brightness}%
                                    </Text>
                                  </VisuallyHidden>

                                  <VStack>
                                    <IconButton
                                      aria-label={`${light.name} toggle`}
                                      variant="outline"
                                      size="lg"
                                      disabled={!light.state.reachable}
                                      onClick={() =>
                                        doAction(
                                          `turn ${light.name} ${
                                            light.state.on ? "off" : "on"
                                          }`
                                        )
                                      }
                                    >
                                      {light.state.reachable &&
                                        light.state.on && <IoBulb />}

                                      {light.state.reachable &&
                                        !light.state.on && <IoBulbOutline />}

                                      {!light.state.reachable && (
                                        <IoAlertCircleOutline />
                                      )}
                                    </IconButton>
                                    <Heading as="h3" textStyle="xs">
                                      {light.name}
                                    </Heading>
                                  </VStack>
                                </List.Item>
                              ))}
                            </Flex>
                          </List.Root>
                        </DialogBody>
                      </DialogContent>
                    </DialogRoot>
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
