import Hero from '@/components/elem/Hero';
import Head from 'next/head';
import Hero3d from '@/components/elem/Hero3d';
import About from '@/components/elem/About';
import Expertise from '@/components/elem/Expertise';
import Skills from '@/components/elem/Skills';
import PictureSection from '@/components/elem/PictureSection';
import ContactSection from '@/components/elem/ContactSection';
import { Toaster } from 'react-hot-toast';
import { GetStaticProps } from 'next';
import { getAllContent } from '@/cms/getAllContent';

type HomeProps = {
  // TODO: Further define and restrict types
  hero: any;
  about: any;
  contact: any;
  gallery: any;
  expertise: any;
  skills: any;
};

export default function Home({ hero, about, gallery, expertise, contact, skills }: HomeProps) {
  return (
    <>
      <Head>
        <title>Lucas Ralph</title>
        <meta
          name="description"
          content="Portfolio of Lucas Ralph, Software developer with professional experience developing at One North International Digital Agency, Fast Enterprises, and other private clients. With 5 years of experience and a Computer Science degree from the University of Minnesota, I've got plenty of education and experience to provide the most digitally distinct, visibly pleasing, and accessible experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <Hero3d />
      <Hero {...hero} />
      <About {...about} />
      <Skills {...skills} />
      <Expertise
        items={expertise.items}
        headline={expertise.headline}
        subHeadline={expertise.subHeadline}
      />
      <PictureSection {...gallery} />
      <ContactSection {...contact} />
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await getAllContent();

  return {
    props: content,
    revalidate: 60,
  };
};

