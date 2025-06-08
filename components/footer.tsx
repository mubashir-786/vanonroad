import { Button } from '@/components/ui/button';
import { MapPin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-6">
              VAN <span className="text-amber-500"> ON ROAD</span>
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Designing and building luxury motorhomes to the highest standards since 1998.
              Quality, innovation, and customer satisfaction are at the heart of everything we do.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-300 hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link href="/inventory" className="text-slate-300 hover:text-amber-500 transition-colors">Inventory</Link></li>
              <li><Link href="#about" className="text-slate-300 hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link href="#testimonials" className="text-slate-300 hover:text-amber-500 transition-colors">Testimonials</Link></li>
              <li><Link href="#contact" className="text-slate-300 hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0" />
                <span className="text-slate-300">
                  Yorkshire, UK<br />
                  YO12 3AB
                </span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0" />
                <div className="text-slate-300">
                  <div>joshuamontevalde@gmail.com</div>
                  <div>alinapopa9629@gmail.com</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-slate-400 text-sm text-center">
          <p>&copy; {currentYear} Luxury Motorhomes Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}