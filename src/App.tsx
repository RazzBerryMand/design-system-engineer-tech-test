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
  IoWifiSharp,
  IoBulbOutline,
  IoBulb,
  IoSettingsSharp,
} from "react-icons/io5";
import { ILight, useDummyData } from "./hooks/useDummyData";

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
      case "success":
        return <IoWifiSharp />;
      default:
        return undefined;
    }
  };

  const renderLightButtonContent = (light: ILight) => {
    return (
      <>
        {light.state.reachable ? (
          <>
            <Text textStyle="xs">Brightness: {light.state.brightness}%</Text>
            {light.state.on ? (
              <IoBulb
                style={{
                  transform: "rotate(180deg)",
                }}
              />
            ) : (
              <IoBulbOutline />
            )}
          </>
        ) : (
          <>
            <Text textStyle="xs">TOO FAR AWAY</Text>
            <IoAlertCircleOutline />
          </>
        )}
      </>
    );
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
            <Alert
              status="success"
              title="Connection is stable"
              icon={renderAlertIcon("success")}
            >
              <Text>Music is currently {music.playState}</Text>
            </Alert>
          )}
        </Card.Root>

        <Card.Root>
          <Image
            src={music.currentTrack.albumArt}
            alt={`Album art for ${music.currentTrack.album}`}
          />

          <Card.Body>
            <VisuallyHidden>
              <Card.Title>Music</Card.Title>
            </VisuallyHidden>

            <Stack>
              <Text textStyle="lg">{music.currentTrack.title}</Text>
              <Text textStyle="md">by {music.currentTrack.artist}</Text>
              <Text textStyle="sm">from {music.currentTrack.album}</Text>
            </Stack>
          </Card.Body>

          <Card.Footer>
            <Group w="full" grow>
              <IconButton
                variant="subtle"
                aria-label="Skip back"
                onClick={() => doAction("prevTrack")}
              >
                <IoPlaySkipBackSharp />
              </IconButton>
              <IconButton
                variant="solid"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={() => doAction("togglePlayState")}
              >
                {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
              </IconButton>
              <IconButton
                variant="subtle"
                aria-label="Skip forward"
                onClick={() => doAction("nextTrack")}
              >
                <IoPlaySkipForwardSharp />
              </IconButton>
            </Group>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Header>
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

          <Card.Body>
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

          <Card.Footer>
            <Button
              aria-label={areGatesOpen ? "Close" : "Open"}
              variant={areGatesOpen ? "subtle" : "solid"}
              w="full"
              onClick={() => setAreGatesOpen(!areGatesOpen)}
            >
              {areGatesOpen ? "Close" : "Open"}
            </Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Lights</Card.Title>
          </Card.Header>

          <Card.Body>
            <List.Root variant="plain">
              <Group w="full" wrap="wrap" grow justifyContent="center">
                {rooms.map((room) => (
                  <List.Item key={room.name}>
                    <DialogRoot
                      size="xs"
                      placement="center"
                      motionPreset="slide-in-bottom"
                    >
                      <DialogTrigger asChild>
                        <VStack mb="6">
                          <IconButton
                            aria-label={`${room.name} light settings`}
                            variant="outline"
                            size="lg"
                            px="8"
                            py="10"
                            mx="4"
                          >
                            <IoSettingsSharp />
                          </IconButton>
                          <Heading
                            as="h3"
                            textStyle="xs"
                            fontWeight="normal"
                            textAlign="center"
                          >
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
                            <Group
                              w="full"
                              wrap="wrap"
                              grow
                              justifyContent="center"
                            >
                              {room.lights.map((light) => (
                                <List.Item key={light.id}>
                                  <VStack mb="6">
                                    <IconButton
                                      w="xs"
                                      py="8"
                                      aria-label={`${light.name} is ${
                                        light.state.on ? "on" : "off"
                                      }`}
                                      variant={
                                        light.state.on ? "solid" : "outline"
                                      }
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
                                      {renderLightButtonContent(light)}
                                    </IconButton>
                                    <Heading
                                      as="h3"
                                      textStyle="xs"
                                      fontWeight="normal"
                                      textAlign="center"
                                    >
                                      {light.name}
                                    </Heading>
                                  </VStack>
                                </List.Item>
                              ))}
                            </Group>
                          </List.Root>
                        </DialogBody>
                      </DialogContent>
                    </DialogRoot>
                  </List.Item>
                ))}
              </Group>
            </List.Root>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Container>
  );
}
