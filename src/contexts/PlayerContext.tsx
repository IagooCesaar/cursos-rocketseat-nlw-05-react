import { createContext, useState, ReactNode } from 'react'

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
  togglePlay(): void;
  setPlayingState(state: boolean): void;
  isPlaying: boolean;
}

interface IPlayerContextProviderProps {
  children: ReactNode
}

export const PlayerContext = createContext({} as IPlayerContextData)

export function PlayerContextProvider({ children }: IPlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: IEpisode) {
    console.log('PLayer => change episode...')
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      play,
      togglePlay,
      setPlayingState
    }}>
      {children}
    </PlayerContext.Provider>
  )
}