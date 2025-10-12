import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";


import TnpscQP from "./pages/TnpscQP.tsx";
import NeetQP from "./pages/NeetQP.tsx";
import StateBoardQP from "./pages/StateBoardQP.tsx";
import CbseQP from "./pages/CbseQP.tsx";
import PlacementQP from "./pages/PlacementQP.tsx";
import EngineeringQP from "./pages/EngineeringQP.tsx";

import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import About from "@/pages/about";
import Contact from "@/pages/contact";

const queryClient = new QueryClient();

// Layout component: wraps Header, Footer, and ChatBot
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <ChatBot />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/courses/:slug" element={<Layout><CourseDetail /></Layout>} />
          <Route path="/qp/tnpsc" element={<Layout><TnpscQP /></Layout>} />
          <Route path="/qp/neet" element={<Layout><NeetQP /></Layout>} />
          <Route path="/qp/state-board" element={<Layout><StateBoardQP /></Layout>} />
          <Route path="/qp/cbse" element={<Layout><CbseQP /></Layout>} />
          <Route path="/qp/placement" element={<Layout><PlacementQP /></Layout>} />
          <Route path="/qp/engineering" element={<Layout><EngineeringQP /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Auth Pages (optional: can use Layout or standalone) */}
          <Route path="/login" element={<Layout><Login /></Layout>} />
          

          {/* Catch-all */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
