"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Twitter,
  Youtube,
  Loader2
} from "lucide-react";
import { createContactMessage } from "@/lib/api/contact";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createContactMessage(formData);
      setSuccess('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
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
                  name="subject"
                  type="text"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full min-h-[150px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
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
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Sales: joshuamontevalde@gmail.com<br />
                    Service: alinapopa9629@gmail.com
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