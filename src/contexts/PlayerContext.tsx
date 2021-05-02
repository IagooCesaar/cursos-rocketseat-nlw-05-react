import { createContext } from 'react'

interface IEpisode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface IPlayerContextData {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
  play(episode: IEpisode): void;
}

export const PlayerContext = createContext({} as IPlayerContextData)

