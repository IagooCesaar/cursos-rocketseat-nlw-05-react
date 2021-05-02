import { createContext, useState, ReactNode, useContext } from 'react'

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
  isLooping: boolean;
  hasPrevious: boolean;
  hasNext: boolean;

  play(episode: IEpisode): void;
  togglePlay(): void;
  toggleLoop(): void;
  setPlayingState(state: boolean): void;
  playList(list: IEpisode[], index: number);
  playNext(): void;
  playPrevious(): void;
}

interface IPlayerContextProviderProps {
  children: ReactNode
}

export const PlayerContext = createContext({} as IPlayerContextData)

export const usePlayerContext = () => {
  return useContext(PlayerContext)
}

export function PlayerContextProvider({ children }: IPlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

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

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      isLooping,
      hasPrevious,
      hasNext,

      play,
      toggleLoop,
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