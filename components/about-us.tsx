import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle, Clock, PenTool } from 'lucide-react';

export function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div 
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.pexels.com/photos/3837499/pexels-photo-3837499.jpeg')"
                }}
              ></div>
            </div>
            <div className="absolute -bottom-8 -right-8 md:-right-12 w-60 h-60 bg-amber-500 rounded-lg -z-10"></div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
              <span className="text-slate-900 dark:text-white">About</span>{" "}
              <span className="text-amber-500">Our Company</span>
            </h2>
            
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
              With over 25 years of experience crafting luxury motorhomes, we've established ourselves as 
              leaders in innovative design and exceptional craftsmanship.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Award-Winning</h3>
                  <p className="text-slate-600 dark:text-slate-400">Multiple industry awards for excellence and innovation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Quality Assured</h3>
                  <p className="text-slate-600 dark:text-slate-400">Rigorous testing and quality control standards</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <PenTool className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Bespoke Builds</h3>
                  <p className="text-slate-600 dark:text-slate-400">Custom motorhomes tailored to your requirements</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Aftercare Support</h3>
                  <p className="text-slate-600 dark:text-slate-400">Dedicated service team for continued support</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-md">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}