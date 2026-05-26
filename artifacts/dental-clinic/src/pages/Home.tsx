import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { DoctorsSection } from "@/sections/DoctorsSection";
import { AboutSection } from "@/sections/AboutSection";
import { AppointmentSection } from "@/sections/AppointmentSection";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <DoctorsSection />
        <AboutSection />
        <AppointmentSection />
      </main>
      
      <Footer />
      <FloatingContact />
    </div>
  );
}
