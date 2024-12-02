import { IAlert, ILight, IMusicData, IRoom, IGate } from "./hooks/useDummyData";

interface IDummyMusicData {
  playStates: IMusicData["playState"][];
  tracks: IMusicData["currentTrack"][];
}

export const dummyMusicData: IDummyMusicData = {
  playStates: ["playing", "paused"],
  tracks: [
    {
      title: "The Less I Know The Better",
      artist: "Tame Impala",
      album: "Currents",
      albumArt:
        "https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79",
    },
    {
      title: "Messy",
      artist: "Lola Young",
      album: "This wasn't meant for you anyway",
      albumArt:
        "https://i.scdn.co/image/ab67616d00001e026aa2a180c7b009ca8454ef89",
    },
    {
      title: "Cerca De Ti",
      artist: "Hermanos Gutiérrez",
      album: "Hoy Como Ayer",
      albumArt:
        "https://i.scdn.co/image/ab67616d00001e02194816f8a9e58f3166743897",
    },
  ],
};

function getRandomLightState(): ILight["state"] {
  return {
    reachable: Math.random() < 0.5,
    on: Math.random() < 0.5,
    brightness: Math.floor(Math.random() * 100),
  };
}

export function generateDummyAlertData(): IAlert | null {
  const alerts: (IAlert | null)[] = [
    {
      variant: "info",
      title: "New service available",
      description: "A new service is now available, check it out!",
      link: "https://example.com",
    },
    {
      variant: "warning",
      title: "Connection is unstable",
      description:
        "Your internet connection is unstable, services may struggle to connect.",
    },
    {
      variant: "error",
      title: "Failed to connect to music service",
      description: "lorem ipsum dolor sit amet consectetur",
      link: "https://example.com",
    },
    null,
    null,
    null,
  ];

  return alerts[Math.floor(Math.random() * alerts.length)];
}

export function generateDummyRoomData(): IRoom[] {
  return [
    {
      name: "Hot desk area",
      lights: [
        {
          id: "1",
          name: "Ceiling light",
          state: getRandomLightState(),
        },
        {
          id: "2",
          name: "Floor lamp",
          state: getRandomLightState(),
        },
      ],
    },
    {
      name: "Meeting room",
      lights: [
        {
          id: "3",
          name: "Floor lamp",
          state: getRandomLightState(),
        },
        {
          id: "4",
          name: "Ceiling light",
          state: getRandomLightState(),
        },
      ],
    },
    {
      name: "Reception",
      lights: [
        {
          id: "5",
          name: "Ceiling light",
          state: getRandomLightState(),
        },
      ],
    },
    {
      name: "Quiet room",
      lights: [
        {
          id: "6",
          name: "Mirror light",
          state: getRandomLightState(),
        },
        {
          id: "7",
          name: "Ceiling light",
          state: getRandomLightState(),
        },
      ],
    },
    {
      name: "Auditorium",
      lights: [
        {
          id: "8",
          name: "Desk lamp",
          state: getRandomLightState(),
        },
        {
          id: "9",
          name: "Ceiling light",
          state: getRandomLightState(),
        },
        {
          id: "10",
          name: "Wall light",
          state: getRandomLightState(),
        },
        {
          id: "11",
          name: "Table lamp",
          state: getRandomLightState(),
        },
      ],
    },
    {
      name: "Storage room",
      lights: [
        {
          id: "12",
          name: "Ceiling light",
          state: getRandomLightState(),
        },
      ],
    },
  ];
}

export function generateDummyGateData(): IGate[] {
  return [
    {
      name: "Main Gate",
      latchTimes: [
        { label: "Open for 10 mins", value: "10" },
        { label: "Open for 20 mins", value: "20" },
        { label: "Open for 1 hour", value: "60" },
      ],
    },
  ];
}
