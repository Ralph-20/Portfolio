import Hero from '@/components/elem/Hero';
import Head from 'next/head';
import data from '../data/data.json';
import Hero3d from '@/components/elem/Hero3d';
import About from '@/components/elem/About';
import Expertise from '@/components/elem/Expertise';
import Skills from '@/components/elem/Skills';
import PictureSection from '@/components/elem/PictureSection';
import ContactSection from '@/components/elem/ContactSection';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const HeroData = data.SectionData.Hero;
  const AboutData = data.SectionData.About;
  const ExpertiseData = data.SectionData.Expertise;
  const SkillsData = data.SectionData.Skills;
  const ContactData = data.SectionData.ContactSection;
  const PictureData = data.SectionData.PictureSection;

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
      <Hero3d />
      <Hero
        primaryHeading={HeroData.primHead}
        eyebrow={HeroData.eyebrow}
        secondaryHeadings={HeroData.secHeads}
        heroImg={HeroData.heroImg}
      />
      <About {...AboutData} />
      <Skills {...SkillsData} />
      <Expertise
        items={ExpertiseData.items}
        headline={ExpertiseData.headline}
        subHeadline={ExpertiseData.subHeadline}
      />
      <PictureSection {...PictureData} />
      <ContactSection {...ContactData} />
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </>
  );
}

