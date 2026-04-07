import Image from "next/image";
import AboutMissionPopup from "../components/AboutMissionPopup";
import Navigation from "../components/Navigation";
import WindowPanel from "../components/WindowPanel";
import { aboutHighlights, depopLink, shopSteps } from "../data/siteContent";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AboutMissionPopup targetId="about-details" />

      <main className="site-shell space-y-4">
        <WindowPanel chromeLabel="Reno Made" tone="lilac">
          <div className="welcome-layout">
            <div className="fairy-stage" aria-hidden="true">
              <div className="fairy-stage__sprite">
                <Image
                  src="/fairy.png"
                  alt="Gutter Fairy logo"
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1080px) 42vw, 28vw"
                  className="fairy-stage__image object-contain"
                />
              </div>
            </div>

            <div className="welcome-copy">
              <h1 className="page-title">Reclaim your Magic</h1>
              <p className="page-copy">
                Gutter Fairy started with thrifted clothes and the need to make something out of
                what most people overlook.
              </p>
              <p className="page-copy">
                We host workshops where people show up with their own clothes, sit side by side,
                and learn how to rework them into something that actually feels like theirs.
              </p>
              <p className="page-copy">
                We keep this going through patches and secondhand pieces, reworked by hand and
                put back into rotation so they can keep being worn, not wasted.
              </p>
            </div>
          </div>
        </WindowPanel>

        <div id="about-details" className="desktop-grid items-start gap-4 lg:grid-cols-2">
          <WindowPanel chromeLabel="A lil chaotic shop" tone="pink">
            <div className="classic-list">
              {aboutHighlights.map((item) => (
                <article key={item.title} className="classic-list__item">
                  <h2 className="classic-list__title">{item.title}</h2>
                  <p className="classic-list__body">{item.body}</p>
                  <p className="classic-list__note">{item.note}</p>
                </article>
              ))}
            </div>
          </WindowPanel>

          <WindowPanel chromeLabel="The process" tone="blue">
            <div className="process-chat">
              <div className="process-chat__header">
                <span className="process-chat__room"># workroom</span>
                <span className="process-chat__count">{shopSteps.length} steps live</span>
              </div>

              <div className="process-chat__messages">
                {shopSteps.map((step, index) => (
                  <article key={step.title} className="process-chat__message">
                    <div className="process-chat__avatar" aria-hidden="true">
                      {index + 1}
                    </div>
                    <div className="process-chat__bubble">
                      <p className="process-chat__meta">gutterfairy_system</p>
                      <h2 className="process-chat__title">{step.title}</h2>
                      <p className="classic-list__body">{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="news-footer">
              <span>Reworked pieces land on Depop when they are ready.</span>
              <a
                href={depopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="win-button utility-button-inline"
              >
                Shop
              </a>
            </div>
          </WindowPanel>
        </div>
      </main>

    </>
  );
}
