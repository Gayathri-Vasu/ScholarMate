import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="container mx-auto py-16 px-4 space-y-16">
      {/* Hero / Info Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-purple-50 rounded-xl shadow-lg p-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Get in Touch with <span className="text-indigo-600">ScholarMate</span>
          </h1>
          <p className="text-gray-700 mb-4">
            Have questions, suggestions, or need support? Our team is here to assist you anytime. 
            Reach out and let’s make learning better together.
          </p>

          <div className="space-y-3 mb-4">
            <p className="text-black font-semibold">
              📞 Call us: <span className="text-indigo-600">+91-44-1234-5678</span>
            </p>
            <p className="text-black font-semibold">
              📧 Email: <span className="text-indigo-600">scholarmate@gmail.com</span>
            </p>
            <p className="text-black font-semibold">
              🏢 Address: <span className="text-indigo-600">123 Scholar Street, Chennai, Tamil Nadu, India</span>
            </p>
          </div>

          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => window.location.href = "mailto:scholarmate@gmail.com"}
          >
            Send an Email
          </Button>
        </div>

        <div className="md:w-1/2">
          <img
            src="/course-thumbnails/contact.jpg"
            alt="Contact Us"
            className="rounded-xl shadow-md w-full max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Quick Message Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-4">Send Us a Message</h2>
        <p className="text-gray-700 mb-6">Fill out this form and we’ll get back to you as soon as possible.</p>
        <form className="space-y-4">
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Textarea placeholder="Your Message" rows={5} required />
          <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
            Submit Message
          </Button>
        </form>
      </div>

      {/* Support Info Section */}
      <div className="bg-purple-50 rounded-xl shadow-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2">We’re Here to Help</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Our team is available Monday to Friday, 9:00 AM to 6:00 PM. You can call, email, or send a message through the form above.
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Follow us on social media for updates, new courses, and learning tips.
        </p>
      </div>
    </div>
  );
}
