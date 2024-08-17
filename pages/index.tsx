import Hero from '@/components/elem/Hero';
import Head from 'next/head';
import data from '../data/data.json';

export default function Home() {
  const HeroData = data.SectionData.Hero;

  return (
    <>
      <Head>
        <title>Lucas Ralph</title>
        <meta
          name="description"
          content="Portfolio of Lucas Ralph, Software developer with professional experience developing at One North International Digital Agency, Fast Enterprises, and other private clients. With 5 years of experience and a Computer Science degree from the University of Minnesota, I've got plenty of education and experience to provide the most digitally distinct, visibly pleasing, and accessible experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        primaryHeading={HeroData.primHead}
        secondaryHeading={HeroData.secHead}
        heroImg={HeroData.heroImg}
      />
    </>
  );
}

