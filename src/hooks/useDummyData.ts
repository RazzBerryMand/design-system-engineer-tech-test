import { useEffect, useState } from "react";
import {
  dummyMusicData,
  generateDummyAlertData,
  generateDummyRoomData,
  generateDummyGateData,
} from "../dummyData";

export interface ITrack {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
}
export interface IMusicData {
  playState: "playing" | "paused";
  currentTrack: ITrack;
}

export interface ILight {
  id: string;
  name: string;
  state: {
    reachable: boolean;
    on: boolean;
    brightness: number;
  };
}

export interface IRoom {
  name: string;
  lights: ILight[];
}

export interface ILatchTime {
  label: string;
  value: string;
}

export interface IGate {
  name: string;
  latchTimes: ILatchTime[];
}

export interface IAlert {
  variant: "info" | "warning" | "error";
  title: string;
  description: string;
  link?: string;
}

export interface IUseDummyData {
  music: IMusicData;
  rooms: IRoom[];
  alert: IAlert | null;
  gates: IGate[];
}

function randomNumberUpTo(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * # useDummyData
 * Provides dummy dat for use in the app
 * @param autoUpdate toggle automatic updates of data - when true data will
 * change every intervalDuration milliseconds
 * @param intervalDuration How often the data will change in milliseconds
 * @returns
 */
export function useDummyData(
  autoUpdate: boolean = true,
  intervalDuration = 5000
): IUseDummyData {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [rooms, setRooms] = useState(generateDummyRoomData());
  const [alert, setAlert] = useState<IAlert | null>(null);
  const [gates, setGates] = useState(generateDummyGateData());

  function chooseRandomTrack() {
    return Math.floor(Math.random() * dummyMusicData.tracks.length);
  }
  useEffect(function rotateData() {
    if (autoUpdate) {
      const interval = setInterval(() => {
        setCurrentTrackIndex(chooseRandomTrack());
        setRooms([...generateDummyRoomData()]);
        setAlert(generateDummyAlertData());
        setGates([...generateDummyGateData()]);
      }, intervalDuration);
      return () => clearInterval(interval);
    }
  }, []);

  const music: IMusicData = {
    playState: dummyMusicData.playStates[randomNumberUpTo(2)],
    currentTrack: dummyMusicData.tracks[currentTrackIndex],
  };

  return { music, rooms, alert, gates };
}
