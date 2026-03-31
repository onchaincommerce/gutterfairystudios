import ContactButton from "./ContactButton";

export default function Footer() {
  return (
    <footer id="utility-actions" className="pb-10 pt-8 sm:pt-10">
      <div className="site-shell">
        <div className="dock-panel">
          <a href="#workshops" className="glossy-button w-full justify-center sm:w-auto">
            Workshops
          </a>
          <a
            href="https://www.instagram.com/gutterfairystudios/"
            target="_blank"
            rel="noopener noreferrer"
            className="utility-button w-full justify-center sm:w-auto"
          >
            Instagram
          </a>
          <ContactButton className="utility-button w-full justify-center sm:w-auto" />
        </div>
      </div>
    </footer>
  );
}
