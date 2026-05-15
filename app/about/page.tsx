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
              <h1 className="page-title">Trash the System, Not Your Clothes</h1>
              <p className="page-copy">
                Gutter Fairy exists because the fashion industry encourages overconsumption while
                millions of pounds of clothing end up in landfills every year.
              </p>
              <p className="page-copy">
                We believe buying secondhand, keeping clothes in circulation, and learning to
                rework what already exists are small but meaningful ways to push back against that
                cycle.
              </p>
              <p className="page-copy">
                Through curated secondhand sourcing, handmade reworks, and monthly SCRAP SOCIAL
                workshops, we’re building community around creativity, sustainability, and wearing
                clothes that actually mean something to the people who own them.
              </p>
            </div>
          </div>
        </WindowPanel>

        <div id="about-details" className="desktop-grid items-start gap-4 lg:grid-cols-2">
          <div className="content-column">
            <WindowPanel chromeLabel="Workshop Funding" tone="cream">
              <section className="funding-panel" aria-labelledby="funding-heading">
                <div className="funding-panel__card">
                  <h2 id="funding-heading" className="section-title">
                    Keep Scrap Social Free
                  </h2>

                  <p className="body-copy">
                    We keep our monthly upcycling workshops free through community
                    support, secondhand shopping, and donations. Every thrifted piece,
                    handmade patch, and reworked garment purchased through Gutter Fairy
                    helps fund supplies, shared creative space, and beginner-friendly
                    workshops focused on keeping textiles in circulation longer.
                  </p>

                  <div className="funding-panel__cta">
                    <a
                      href={depopLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win-button utility-button-inline"
                    >
                      Shop
                    </a>
                  </div>
                </div>
              </section>
            </WindowPanel>

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
          </div>

          <WindowPanel chromeLabel="The process" tone="blue">
            <div className="process-chat">
              <div className="process-chat__header">
                <span className="process-chat__room">#workroom</span>
                <span className="process-chat__count">{shopSteps.length} steps live</span>
              </div>

              <div className="process-chat__messages">
                {shopSteps.map((step, index) => (
                  <details key={step.title} className="process-chat__entry">
                    <summary className="process-chat__summary">
                      <h2 className="process-chat__title">
                        {index + 1} ✶ {step.title}
                      </h2>
                      <span className="process-chat__status" aria-hidden="true">
                        Open
                      </span>
                    </summary>

                    <div className="process-chat__body">
                      {step.body.map((paragraph) => (
                        <p key={paragraph} className="process-chat__paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </WindowPanel>
        </div>
      </main>

    </>
  );
}
