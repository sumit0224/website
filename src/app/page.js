'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import WhyChooseUs from '@/components/WhyChooseUs';
import PopularCourses from '@/components/PopularCourses';
import CareerCounseling from '@/components/CareerCounseling';
import Achievements from '@/components/Achievements';

import Alumni from '@/components/Alumni';
import Marquee from '@/components/Marquee';
import Accordion from '@/components/Accordion';
import styles from './page.module.css';

import { faqItems } from '@/data/siteData';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.animate-section');

    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div className={styles.container} ref={containerRef}>
      <div className="animate-section">
        <Hero />
      </div>
      <div className="animate-section">
        <Stats />
      </div>
      <div className="animate-section">
        <WhyChooseUs />
      </div>
      <div className="animate-section">
        <PopularCourses />
      </div>
      <div className="animate-section">
        <CareerCounseling />
      </div>
      <div className="animate-section">
        <Achievements />
      </div>
      <div className="animate-section">
        <Marquee />
      </div>

      <div className="animate-section">
        <Alumni />
      </div>

      <section className={`${styles.faqSection} animate-section`}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <Accordion items={faqItems} />
      </section>
    </div>
  );
}
