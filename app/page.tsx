"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          background-color: #000;
        }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-50px) rotate(180deg); }
        }

        .bg-circle {
          position: fixed;
          pointer-events: none;
          z-index: -10;
          border-radius: 50%;
          filter: blur(60px);
        }

        .bg-circle-1 {
          top: 10%;
          left: 5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0,188,212,0.25) 0%, rgba(0,188,212,0.05) 70%, transparent 100%);
          animation: float 6s ease-in-out infinite;
        }

        .bg-circle-2 {
          top: 50%;
          right: 8%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0,188,212,0.2) 0%, rgba(0,188,212,0.05) 70%, transparent 100%);
          animation: float-slow 8s ease-in-out infinite;
        }

        .bg-circle-3 {
          bottom: 10%;
          left: 15%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(0,188,212,0.2) 0%, rgba(0,188,212,0.05) 70%, transparent 100%);
          animation: float 7s ease-in-out infinite;
          animation-delay: 1s;
        }

        .bg-circle-2 {
          top: 50%;
          right: 8%;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(0,188,212,0.3) 0%, rgba(0,188,212,0.08) 70%, transparent 100%);
          animation: float-slow 8s ease-in-out infinite;
        }

        .bg-circle-3 {
          bottom: 10%;
          left: 15%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0,188,212,0.3) 0%, rgba(0,188,212,0.08) 70%, transparent 100%);
          animation: float 7s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>

      <div className="bg-circle bg-circle-1" />
      <div className="bg-circle bg-circle-2" />
      <div className="bg-circle bg-circle-3" />

      {/* Main Content */}
      <Navbar />
      <HeroSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}