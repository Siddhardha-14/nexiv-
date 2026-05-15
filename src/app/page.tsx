import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SkillTracks from "@/components/landing/SkillTracks";
import FeaturedProjects from "@/components/landing/FeaturedProjects";
import SuccessShowcase from "@/components/landing/SuccessShowcase";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <SkillTracks />
      <FeaturedProjects />
      <SuccessShowcase />
      <FAQ />
      <Footer />
    </main>
  );
}
