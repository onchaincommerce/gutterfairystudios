import Navigation from "./components/Navigation";
import FairyCursor from "./components/FairyCursor";
import HomeSection from "./components/HomeSection";

export default function Home() {
  return (
    <>
      <FairyCursor />
      <Navigation />
      <main>
        <HomeSection />
      </main>
    </>
  );
}
