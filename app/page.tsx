import Hero from '@/components/elem/Hero';
import Hero3d from '@/components/elem/Hero3d';
import About from '@/components/elem/About';
import Expertise from '@/components/elem/Expertise';
import Skills from '@/components/elem/Skills';
import PictureSection from '@/components/elem/PictureSection';
import ContactSection from '@/components/elem/ContactSection';
import ToasterProvider from '@/components/helpers/ToasterProvider';
import { getHomeContent } from '@/cms/getHomeContent';

export default async function HomePage() {
  const { hero, about, gallery, expertise, contact, skills } = await getHomeContent();

  return (
    <>
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
      <ToasterProvider />
    </>
  );
}

