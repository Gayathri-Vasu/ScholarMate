import React from "react";

export default function About() {
  return (
    <div className="container mx-auto py-16 px-4 space-y-16">
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-purple-50 rounded-xl shadow-lg p-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Welcome to <span className="text-indigo-600">ScholarMate</span>
          </h1>
          <p className="text-gray-700 mb-4">
            ScholarMate is your centralized learning hub for students and professionals alike. 
            We offer interactive courses covering TN school books, CBSE, NEET, TNPSC, IT placements, 
            and engineering subjects — all in one platform to help you excel in academics, competitive exams, 
            and career growth.
          </p>
          <p className="text-gray-700">
            Our goal is to make learning accessible, fun, and effective. Whether you're 
            preparing for exams or exploring new subjects, ScholarMate is here to guide you.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/course-thumbnails/about1.jpg"
            alt="Learning"
            className="rounded-xl shadow-md w-3/4"
          />
        </div>
      </div>

      {/* What We Do Section */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-black mb-4">What We Do</h2>
          <p className="text-gray-700 mb-3">
            At ScholarMate, we create a personalized learning experience for every student. 
            Our platform offers:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Interactive video lessons and PDFs for every subject</li>
            <li>Feedback and guidance to improve learning outcomes</li>
            <li>Easy navigation and course organization</li>
          </ul>
        </div>
        <div className="md:w-1/2 flex justify-start md:justify-end">
          <img
            src="/course-thumbnails/about2.jpg"
            alt="Interactive Learning"
            className="rounded-xl shadow-md w-4/5 md:w-3/4"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-indigo-50 rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          To empower students with high-quality, accessible, and engaging educational 
          content that fosters a love for learning and drives academic success.
        </p>
      </div>
    </div>
  );
}
