import Hero from '@/components/elem/Hero';
import About from '@/components/elem/About';
import Expertise from '@/components/elem/Expertise';
import Skills from '@/components/elem/Skills';
import PictureSection from '@/components/elem/PictureSection';
import ContactSection from '@/components/elem/ContactSection';
import ToasterProvider from '@/components/helpers/ToasterProvider';
import { getHomeContent } from '@/cms/getHomeContent';

export default async function HomePage() {
  const { hero, about, gallery, expertise, contact, skills } = await getHomeContent();

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lucas Ralph',
    url: 'https://www.ljrdev.com',
    jobTitle: 'Software Engineer',
    sameAs: [
      'https://github.com/Ralph-20',
      'https://www.linkedin.com/in/lucasralph',
    ],
    knowsAbout: ['Next.js', 'TypeScript', 'AI Agents', 'Developer Tools', 'React'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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

