import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/Navigation";
import FairyCursor from "../components/FairyCursor";
import OrderPatchButton from "../components/OrderPatchButton";

type DesignItem = {
  id: string;
  title: string;
  image: string;
  label: string;
};

type PageSearchParams = {
  page?: string | string[];
};

type DesignsPageProps = {
  searchParams?: Promise<PageSearchParams>;
};

const ITEMS_PER_PAGE = 12;

const designCatalog: DesignItem[] = [
  { id: "milf-1", title: "MILF", image: "/MILF.jpg", label: "made to order" },
  { id: "curb-kisser-1", title: "Curb Kisser", image: "/Curb Kisser.jpg", label: "custom patch" },
  { id: "food-kitty-1", title: "Food Kitty", image: "/Food Kitty.jpg", label: "stitched favorite" },
  { id: "love-to-death-1", title: "Love to Death", image: "/Love to Death.jpg", label: "made to order" },
  { id: "dj-a-1", title: "DJ A", image: "/DJ A.jpg", label: "custom patch" },
  { id: "fan-1", title: "Fan", image: "/Fan.jpg", label: "stitched favorite" },
  { id: "grabs-back-1", title: "Grabs Back", image: "/Grabs Back.jpg", label: "made to order" },
  { id: "milk-1", title: "MILK", image: "/MILK.jpg", label: "custom patch" },
  { id: "spiral-1", title: "Spiral", image: "/Spiral.jpg", label: "stitched favorite" },
  { id: "sunny-1", title: "Sunny", image: "/Sunny.jpg", label: "made to order" },
  { id: "y2k-heart-1", title: "Y2K Heart", image: "/Y2K Heart.jpg", label: "custom patch" },
  { id: "fairy-1", title: "Fairy", image: "/Fairy.jpg", label: "stitched favorite" },
];

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
  const baseClassName = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-[var(--color-ink)] px-4 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-150 hover:-translate-y-0.5";

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${baseClassName} ${isActive ? "bg-[var(--color-lime)]" : "bg-[rgba(255,255,255,0.82)]"}`}
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
      <FairyCursor />
      <Navigation />

      <main className="pb-20 pt-6 sm:pt-8">
        <section className="site-shell">
          <div className="paper-panel overflow-hidden">
            <div className="window-bar bg-gradient-to-r from-[rgba(255,255,255,0.9)] via-[rgba(246,215,231,0.7)] to-[rgba(217,208,255,0.72)]">
              <p className="section-kicker">Drawn weird, made from rescued stuff</p>
              <span aria-hidden="true" />
            </div>

            <div className="px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
              <div className="flex flex-col gap-5 border-b border-[rgba(31,26,29,0.12)] pb-6 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="offset-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
                  Patch Catalog
                </h1>
              </div>

              {/* Keep the designs page more editorial than scrapbook so the catalog stays readable as it grows. */}
              <div className="mt-8 grid gap-px overflow-hidden rounded-[28px] border-2 border-[rgba(31,26,29,0.2)] bg-[rgba(31,26,29,0.18)] sm:grid-cols-2 lg:grid-cols-3">
                {visibleDesigns.map((design, index) => (
                  <article
                    key={design.id}
                    className={index % 2 === 0 ? "bg-[rgba(255,255,255,0.8)] px-4 pb-5 pt-4" : "bg-[rgba(248,243,234,0.96)] px-4 pb-5 pt-4"}
                  >
                    <OrderPatchButton
                      initialPatchTitle={design.title}
                      buttonLabel="Order a patch"
                      wrapperClassName="flex h-full flex-col"
                      triggerClassName="group block w-full text-left transition-transform duration-150 hover:-translate-y-0.5"
                      className="mt-4 w-full justify-center"
                    >
                      <div className="mx-auto w-full max-w-[220px]">
                        <div className="relative aspect-square overflow-hidden bg-white shadow-[0_12px_26px_rgba(31,26,29,0.12)]">
                          <Image
                            src={design.image}
                            alt={design.title}
                            fill
                            sizes="(min-width: 1280px) 220px, (min-width: 640px) 40vw, 88vw"
                            className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>

                      <h2 className="mt-4 text-center text-[1.25rem] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[var(--color-ink)]">
                        {design.title}
                      </h2>
                    </OrderPatchButton>
                  </article>
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-[rgba(31,26,29,0.62)]">
                    Showing {startIndex + 1}-{startIndex + visibleDesigns.length} of {designCatalog.length}
                  </p>

                  <nav className="flex flex-wrap items-center gap-2" aria-label="Patch catalog pages">
                    {currentPage > 1 ? (
                      renderPaginationLink("Prev", getPageHref(currentPage - 1))
                    ) : (
                      <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-[rgba(31,26,29,0.12)] bg-[rgba(255,255,255,0.46)] px-4 text-sm font-semibold uppercase tracking-[0.18em] text-[rgba(31,26,29,0.34)]">
                        Prev
                      </span>
                    )}

                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;

                      return renderPaginationLink(
                        pageNumber.toString(),
                        getPageHref(pageNumber),
                        pageNumber === currentPage,
                      );
                    })}

                    {currentPage < totalPages ? (
                      renderPaginationLink("Next", getPageHref(currentPage + 1))
                    ) : (
                      <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-[rgba(31,26,29,0.12)] bg-[rgba(255,255,255,0.46)] px-4 text-sm font-semibold uppercase tracking-[0.18em] text-[rgba(31,26,29,0.34)]">
                        Next
                      </span>
                    )}
                  </nav>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
