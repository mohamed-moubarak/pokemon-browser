import { redirect } from 'next/navigation';

const Home = () => {
  redirect('/pokemon-list');
};

export default Home;
