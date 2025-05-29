"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube
} from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            Get In <span className="text-amber-500">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            Visit our showroom to view our range of luxury motorhomes or contact us to discuss
            your requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 font-playfair">Send Us a Message</h3>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  className="w-full min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 font-playfair">Contact Information</h3>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Showroom</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    123 Motorhome Way<br />
                    Industrial Estate<br />
                    Yorkshire, UK<br />
                    YO12 3AB
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Sales: +44 (0) 1234 567 890<br />
                    Service: +44 (0) 1234 567 891
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Sales: sales@vanonroad.com<br />
                    Service: service@vanonroad.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Monday - Friday: 9:00am - 5:30pm<br />
                    Saturday: 10:00am - 4:00pm<br />
                    Sunday: Closed (Appointments Only)
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <Facebook className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </a>
                  <a href="#" className="bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <Instagram className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </a>
                  <a href="#" className="bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <Twitter className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </a>
                  <a href="#" className="bg-slate-200 dark:bg-slate-800 p-3 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <Youtube className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}