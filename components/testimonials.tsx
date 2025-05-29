"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Robert Johnson",
    location: "Lake District",
    quote: "Our Signature Series motorhome has transformed the way we travel. The craftsmanship is outstanding, and the attention to detail is evident in every aspect of the build.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    rating: 5
  },
  {
    id: 2,
    name: "Emma & David Thompson",
    location: "Yorkshire",
    quote: "We've had our Elite Range motorhome for two years now and couldn't be happier. The quality is exceptional and the aftercare service is second to none.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Wilson",
    location: "Scottish Highlands",
    quote: "As someone who values quality and craftsmanship, I'm incredibly impressed with my Voyager Plus. Every detail has been considered and the build quality is superb.",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    rating: 5
  },
  {
    id: 4,
    name: "Sarah & James Miller",
    location: "Cornwall",
    quote: "Our Urban Explorer is perfect for our weekend getaways. Compact yet luxurious, it has everything we need and more. The team was fantastic throughout the process.",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    rating: 5
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            What Our <span className="text-amber-500">Clients Say</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            Hear from our satisfied customers about their experiences with our luxury motorhomes
            and services.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-10 left-0 opacity-10 dark:opacity-5">
            <Quote size={120} />
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full">
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          <div 
                            className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-100 flex-shrink-0"
                            style={{
                              backgroundImage: `url(${testimonial.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          />
                          
                          <div className="flex-1 text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                              ))}
                            </div>
                            
                            <blockquote className="text-xl md:text-2xl font-playfair text-slate-700 dark:text-slate-300 italic mb-6">
                              "{testimonial.quote}"
                            </blockquote>
                            
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{testimonial.name}</p>
                              <p className="text-slate-500 dark:text-slate-400">{testimonial.location}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      index === activeIndex 
                        ? "bg-amber-500 w-6" 
                        : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                    )}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}