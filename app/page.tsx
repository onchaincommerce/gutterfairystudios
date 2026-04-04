import Navigation from "./components/Navigation";
import HomeSection from "./components/HomeSection";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="space-y-4">
        <HomeSection />
      </main>
    </>
  );
}
