import { createContext } from 'react'

interface IEpisode {
  title: string;
  member: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface IPlayerContextData {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
}

export const PlayerContext = createContext({} as IPlayerContextData)

