import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/Navigation";
import WindowPanel from "../components/WindowPanel";
import { designCatalog } from "../data/siteContent";

type PageSearchParams = {
  page?: string | string[];
};

type DesignsPageProps = {
  searchParams?: Promise<PageSearchParams>;
};

const ITEMS_PER_PAGE = 12;
const PLACEHOLDER_PRICE = "$ coming soon";
const COLLECTION_PROCESS = [
  {
    step: "01 ✶ SKETCHED",
    body: "Every patch starts as an original sketch drawn by hand before being digitized for embroidery, appliqué, or textile experimentation.",
  },
  {
    step: "02 ✶ SCRAPPED",
    body: "We use secondhand fabrics, reclaimed textiles, denim scraps, and leftover materials whenever possible to reduce waste and give overlooked fabrics a new purpose.",
  },
  {
    step: "03 ✶ STITCHED",
    body: "From thread tests and trimming to final assembly, every patch is made in small batches with hands-on detail and intentional imperfections. These patches are meant to be sewn onto the clothes you already love, giving forgotten pieces another life instead of replacing them.",
  },
] as const;

function getPageHref(page: number) {
  return page <= 1 ? "/designs" : `/designs?page=${page}`;
}

function getCurrentPage(
  pageParam: string | string[] | undefined,
  totalPages: number,
) {
  const resolvedPage = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const parsedPage = Number.parseInt(resolvedPage ?? "1", 10);

  if (!Number.isFinite(parsedPage)) {
    return 1;
  }

  return Math.min(totalPages, Math.max(1, parsedPage));
}

function renderPaginationLink(
  label: string,
  href: string,
  isActive = false,
) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`win-button utility-button-inline ${isActive ? "nav-button--active" : ""}`.trim()}
    >
      {label}
    </Link>
  );
}

export default async function DesignsPage({ searchParams }: DesignsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const totalPages = Math.ceil(designCatalog.length / ITEMS_PER_PAGE);
  const currentPage = getCurrentPage(resolvedSearchParams?.page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleDesigns = designCatalog.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Navigation />

      <main className="site-shell space-y-4">
        <WindowPanel chromeLabel="About the Collection" tone="cream">
          <div className="collection-process-grid">
            {COLLECTION_PROCESS.map((item) => (
              <article key={item.step} className="collection-process-card">
                <p className="collection-process-step">{item.step}</p>
                <p className="collection-process-copy">{item.body}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel chromeLabel="Design Catalog" tone="blue">
          <div className="catalog-stack">
            <div className="catalog-grid">
              {visibleDesigns.map((design) => (
                <article key={design.id} className="catalog-card">
                  <div className="catalog-thumb">
                    <Image
                      src={design.image}
                      alt={design.title}
                      fill
                      sizes="(max-width: 767px) 92vw, (max-width: 1080px) 42vw, 20vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <h2 className="catalog-title">{design.title}</h2>
                  <p className="catalog-description">
                    Built for custom ordering, thread changes, and sizing adjustments.
                  </p>
                  <p className="catalog-price">{PLACEHOLDER_PRICE}</p>
                </article>
              ))}
            </div>
          </div>

          {totalPages > 1 ? (
            <div className="news-footer">
              <span>
                Showing {startIndex + 1}-{startIndex + visibleDesigns.length} of {designCatalog.length}
              </span>
              <nav className="button-row" aria-label="Patch catalog pages">
                {currentPage > 1
                  ? renderPaginationLink("Prev", getPageHref(currentPage - 1))
                  : <span className="taskbar__status">Prev</span>}

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;

                  return renderPaginationLink(
                    pageNumber.toString(),
                    getPageHref(pageNumber),
                    pageNumber === currentPage,
                  );
                })}

                {currentPage < totalPages
                  ? renderPaginationLink("Next", getPageHref(currentPage + 1))
                  : <span className="taskbar__status">Next</span>}
              </nav>
            </div>
          ) : null}
        </WindowPanel>
      </main>

    </>
  );
}
