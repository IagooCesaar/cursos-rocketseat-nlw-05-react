import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react'
import { usePlayerContext } from '../../contexts/PlayerContext'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'


export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    currentEpisodeIndex,
    episodeList,
    isPlaying,
    hasNext,
    hasPrevious,
    isLooping,

    togglePlay,
    toggleLoop,
    setPlayingState,
    playNext,
    playPrevious
  } = usePlayerContext();

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit='cover'
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361' }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            loop={isLooping}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="aleatório" />
          </button>

          <button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={() => playPrevious()}
          >
            <img src="/play-previous.svg" alt="anterior" />
          </button>

          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={() => togglePlay()}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="pausar" />
            ) : (
              <img src="/play.svg" alt="tocar" />
            )}

          </button>

          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={() => playNext()}
          >
            <img src="/play-next.svg" alt="próximo" />
          </button>

          <button type="button" disabled={!episode} onClick={() => toggleLoop()}>
            <img src="/repeat.svg" alt="repetir" />
          </button>

        </div>
      </footer>
    </div>
  )
}
