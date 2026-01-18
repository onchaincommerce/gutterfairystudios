import Navigation from "./components/Navigation";
import FairyCursor from "./components/FairyCursor";
import BlastEffect from "./components/BlastEffect";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ThriftSection from "./components/ThriftSection";
import DesignsSection from "./components/DesignsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Interactive effects */}
      <FairyCursor />
      <BlastEffect />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HomeSection />
        <AboutSection />
        <ThriftSection />
        <DesignsSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
