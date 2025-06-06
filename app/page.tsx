'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { FeaturedModels } from '@/components/featured-models';
import { Services } from '@/components/services';
import { Testimonials } from '@/components/testimonials';
import { AboutUs } from '@/components/about-us';
import { ContactSection } from '@/components/contact-section';
import { ScrollToTop } from '@/components/scroll-to-top';

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a hash in the URL and scroll to it
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturedModels />
      <AboutUs />
      <Services />
      <Testimonials />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}