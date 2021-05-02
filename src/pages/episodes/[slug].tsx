import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { api } from '../../services/api'
import { convertDurationToTimeSting } from '../../utils/convertDurationToTimeString'

import styles from './episode.module.scss'
import { usePlayerContext } from '../../contexts/PlayerContext'

interface IEpisode {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string
}

interface IEpisodeProps {
  episode: IEpisode;
}


export default function Episode({ episode }: IEpisodeProps) {
  const { play } = usePlayerContext();
  return (
    <div className={styles.episodeContainer}>
      <div className={styles.thumbnailContainer}>
        <Link href='/'>
          <button type='button'>
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit='cover'
        />

        <button type='button' onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: episode.description
        }}
      />

    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  const paths = data.map((episode: IEpisode) => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    description: data.description,
    thumbnail: data.thumbnail,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    durationAsString: convertDurationToTimeSting(Number(data.file.duration)),
    duration: Number(data.file.duration),
    url: data.file.url,
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24,
  }
}