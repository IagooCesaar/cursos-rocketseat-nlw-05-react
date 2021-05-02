import { GetStaticProps } from 'next'
import { api } from '../services/api';

interface IEpisodes {
  id: string;
  title: string;
  member: string;
}

interface IHomeProps {
  episodes: IEpisodes[];
}

export default function Home(props: IHomeProps) {
  return (
    <h1>Index</h1>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  const episodes = response.data;

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}