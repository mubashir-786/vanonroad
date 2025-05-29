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