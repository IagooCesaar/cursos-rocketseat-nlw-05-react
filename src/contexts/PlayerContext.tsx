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
  isPlaying: boolean;
  play(episode: IEpisode): void;
  togglePlay(): void;
  setPlayingState(state: boolean): void;
  playList(list: IEpisode[], index: number);
  playNext(): void;
  playPrevious(): void;
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

  function playList(list: IEpisode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    if (nextEpisodeIndex < episodeList.length) {
      setCurrentEpisodeIndex(nextEpisodeIndex)
    }
  }

  function playPrevious() {
    const previousEpisodeIndex = currentEpisodeIndex - 1;
    if (previousEpisodeIndex >= 0) {
      setCurrentEpisodeIndex(previousEpisodeIndex)
    }
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      play,
      togglePlay,
      setPlayingState,
      playList,
      playNext,
      playPrevious,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}