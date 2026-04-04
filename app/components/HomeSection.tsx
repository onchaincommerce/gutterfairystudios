import Image from "next/image";
import Link from "next/link";
import OrderPatchButton from "./OrderPatchButton";
import WindowPanel from "./WindowPanel";
import { homeNews, newestAdditions } from "../data/siteContent";

const PLACEHOLDER_PRICE = "$ coming soon";

export default function HomeSection() {
  return (
    <section className="site-shell">
      <div className="desktop-grid desktop-grid--home">
        <div className="content-column">
          <WindowPanel chromeLabel="Reno Made" tone="lilac">
            <div className="welcome-layout">
              <div className="fairy-stage" aria-hidden="true">
                <div className="fairy-stage__sprite">
                  <Image
                    src="/fairy.png"
                    alt="Gutter Fairy logo"
                    fill
                    sizes="(max-width: 767px) 90vw, (max-width: 1080px) 45vw, 28vw"
                    className="fairy-stage__image object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="welcome-copy">
                <h1 className="page-title">Welcome to Gutter Fairy</h1>
                <p className="page-copy">
                  Gutter Fairy is a small, creative, hands-on brand rooted in thrifting,
                  upcycling, and reworked textiles.
                </p>
              </div>
            </div>
          </WindowPanel>

          <WindowPanel chromeLabel="Newest Additions" tone="blue">
            <div className="patch-carousel" aria-label="Newest patches">
              {newestAdditions.map((item) => (
                <article key={item.id} className="addition-card patch-carousel__item">
                  <div className="addition-thumb">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 767px) 78vw, (max-width: 1080px) 36vw, 18rem"
                      className="object-contain p-3"
                    />
                  </div>
                  <h2 className="addition-title">{item.title}</h2>
                  <p className="addition-description">{item.description}</p>
                  <p className="catalog-price">{PLACEHOLDER_PRICE}</p>
                  <div className="addition-actions">
                    <OrderPatchButton
                      buttonLabel="Order patch"
                      initialPatchTitle={item.patchTitle}
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="news-footer">
              <span>Scroll through the latest patch additions.</span>
              <Link href="/designs" className="win-button utility-button-inline">
                All designs
              </Link>
            </div>
          </WindowPanel>
        </div>

        <aside className="sidebar-column">
          <WindowPanel chromeLabel="Studio Events" tone="pink">
            <div className="event-files">
              {homeNews.map((item, index) => (
                <details key={item.id} className="event-file" open={index === 0}>
                  <summary className="event-file__summary">
                    <span className="event-file__tab" aria-hidden="true" />
                    <div className="event-file__headline">
                      <p className="event-file__date">{item.date}</p>
                      <h2 className="event-file__title">{item.title}</h2>
                    </div>
                    <span className="event-file__status">Open file</span>
                  </summary>

                  <div className="event-file__body">
                    <p className="news-body">{item.summary}</p>
                    <p className="news-body event-file__details">{item.details}</p>
                    {item.image ? (
                      <div className="event-file__poster">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 767px) 88vw, 20rem"
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                    {item.href.startsWith("/") ? (
                      <Link href={item.href} className="win-button utility-button-inline">
                        {item.cta}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="win-button utility-button-inline"
                      >
                        {item.cta}
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </WindowPanel>
        </aside>
      </div>
    </section>
  );
}
