import Link from "next/link";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { ProductMark } from "./editorial";
import { getPricing, pricedOn, type Product } from "../lib/data";
import type { GeneratedComparison, SideNarrative } from "../lib/compare";

/* ---------------------------------------------------------------------------
 * The head to head itself. Every figure here comes from the two product
 * records, so the same numbers appear on this page and in each full review.
 * Sections that depend on data we do not hold for both products are left out
 * rather than filled with a placeholder.
 * ------------------------------------------------------------------------ */

function Verdict({ side, a, b }: { side: "a" | "b" | "tie"; a: string; b: string }) {
  if (side === "tie") {
    return (
      <span className="duelVerdict duelVerdictTie">
        <Minus size={13} strokeWidth={2.4} aria-hidden="true" />
        Line ball
      </span>
    );
  }
  return (
    <span className="duelVerdict">
      <Check size={13} strokeWidth={2.6} aria-hidden="true" />
      {side === "a" ? a : b}
    </span>
  );
}

/** A table column belongs to a product, so it carries the product's mark. */
function ColumnHead({ product }: { product: Product }) {
  return (
    <th scope="col" className="duelColHead">
      <span className="duelColMark">
        <ProductMark product={product} />
      </span>
      <span>{product.name}</span>
    </th>
  );
}

/** The two column blocks below all lead with the mark, for the same reason. */
function SideHeading({ product }: { product: Product }) {
  return (
    <h3 className="duelSideHeading">
      <ProductMark product={product} />
      <span>{product.name}</span>
    </h3>
  );
}

export function ComparisonHead({ comparison }: { comparison: GeneratedComparison }) {
  const { a, b, overall } = comparison;
  return (
    <div className="duelHead siteShell">
      <article className={overall.winner === "a" ? "duelCardSide duelCardLead" : "duelCardSide"}>
        <ProductMark product={a} size="large" />
        <h2>{a.name}</h2>
        <p className="duelCategory">{a.shortCategory}</p>
        <p className="duelScore">
          <strong>{a.score.toFixed(1)}</strong>
          <span>out of 10</span>
        </p>
        <p className="duelBest">{a.bestFor}</p>
        <Link className="btn btnSecondary btnCompact" href={`/reviews/${a.slug}`}>
          Read the review
        </Link>
      </article>

      <span className="duelVersus" aria-hidden="true">
        vs
      </span>

      <article className={overall.winner === "b" ? "duelCardSide duelCardLead" : "duelCardSide"}>
        <ProductMark product={b} size="large" />
        <h2>{b.name}</h2>
        <p className="duelCategory">{b.shortCategory}</p>
        <p className="duelScore">
          <strong>{b.score.toFixed(1)}</strong>
          <span>out of 10</span>
        </p>
        <p className="duelBest">{b.bestFor}</p>
        <Link className="btn btnSecondary btnCompact" href={`/reviews/${b.slug}`}>
          Read the review
        </Link>
      </article>
    </div>
  );
}

/** Jump nav, because a full comparison is long by design. */
export function ComparisonNav({ comparison }: { comparison: GeneratedComparison }) {
  const { dimensions, narrative, price } = comparison;
  const items = [
    { id: "summary", label: "The short answer" },
    ...(dimensions.length ? [{ id: "scores", label: "Scores" }] : []),
    { id: "facts", label: "Checked facts" },
    ...(price.aChecked && price.bChecked ? [{ id: "cost", label: "What it costs" }] : []),
    ...(narrative.a.capabilities.length && narrative.b.capabilities.length
      ? [{ id: "capability", label: "What each one does" }]
      : []),
    ...(narrative.a.implementation && narrative.b.implementation
      ? [{ id: "setup", label: "Setup and support" }]
      : []),
    { id: "balance", label: "Strengths and limits" },
    { id: "local", label: "South African view" },
    ...(narrative.a.finalView && narrative.b.finalView
      ? [{ id: "verdict", label: "Closing judgement" }]
      : []),
  ];

  return (
    <nav className="duelNav siteShell" aria-label="Sections of this comparison">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function CapabilityList({ narrative }: { narrative: SideNarrative }) {
  return (
    <dl className="duelCapabilities">
      {narrative.capabilities.map((item) => (
        <div key={item.name}>
          <dt>{item.name}</dt>
          <dd>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ComparisonBody({ comparison }: { comparison: GeneratedComparison }) {
  const { a, b, dimensions, facts, price, trial, demo, takeaways, narrative } = comparison;
  const pa = getPricing(a.slug);
  const pb = getPricing(b.slug);
  const bothPriced = Boolean(pa && pb);
  const bothCapabilities =
    narrative.a.capabilities.length > 0 && narrative.b.capabilities.length > 0;
  const bothSetup = Boolean(narrative.a.implementation && narrative.b.implementation);
  const bothSupport = Boolean(narrative.a.support && narrative.b.support);
  const bothPricingView = Boolean(narrative.a.pricingView && narrative.b.pricingView);
  const bothFinalView = Boolean(narrative.a.finalView && narrative.b.finalView);

  return (
    <>
      <section className="siteShell duelSection" id="summary">
        <p className="sectionChip">The short answer</p>
        <h2>What the record adds up to</h2>
        <ul className="duelTakeaways">
          {takeaways.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      {dimensions.length > 0 && (
        <section className="siteShell duelSection" id="scores">
          <p className="sectionChip">Scored side by side</p>
          <h2>Where the difference actually sits</h2>
          <div className="duelScrollWrap">
            <table className="duelTable">
              <caption className="visuallyHidden">
                {a.name} and {b.name} scored across the dimensions we judge
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <ColumnHead product={a} />
                  <ColumnHead product={b} />
                  <th scope="col">Our view</th>
                </tr>
              </thead>
              <tbody>
                <tr className="duelRowOverall">
                  <th scope="row">Overall</th>
                  <td className={comparison.overall.winner === "a" ? "duelWin" : undefined}>
                    {a.score.toFixed(1)}
                  </td>
                  <td className={comparison.overall.winner === "b" ? "duelWin" : undefined}>
                    {b.score.toFixed(1)}
                  </td>
                  <td>
                    <Verdict side={comparison.overall.winner} a={a.name} b={b.name} />
                  </td>
                </tr>
                {dimensions.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">
                      {row.name}
                      <span className="duelWhy">
                        {row.winner === "b" ? b.name : a.name}:{" "}
                        {row.winner === "b" ? row.bNote : row.aNote}
                      </span>
                    </th>
                    <td className={row.winner === "a" ? "duelWin" : undefined}>{row.a.toFixed(1)}</td>
                    <td className={row.winner === "b" ? "duelWin" : undefined}>{row.b.toFixed(1)}</td>
                    <td>
                      <Verdict side={row.winner} a={a.name} b={b.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="chartNote">
            Every score is our editorial judgement and the reasoning sits in the
            full review. A gap under two tenths is called line ball, because it
            is not a difference worth acting on.
          </p>
        </section>
      )}

      <section className="siteShell duelSection" id="facts">
        <p className="sectionChip">Checked facts</p>
        <h2>What each vendor commits to</h2>
        <div className="duelScrollWrap">
          <table className="duelTable duelTableFacts">
            <caption className="visuallyHidden">
              {a.name} and {b.name} on deployment, team size, pricing and support
            </caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visuallyHidden">Attribute</span>
                </th>
                <ColumnHead product={a} />
                <ColumnHead product={b} />
              </tr>
            </thead>
            <tbody>
              {facts.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {bothPriced && (
        <section className="siteShell duelSection" id="cost">
          <p className="sectionChip">What it costs</p>
          <h2>Price, on the same basis or not at all</h2>
          <div className="duelScrollWrap">
            <table className="duelTable duelTableFacts">
              <caption className="visuallyHidden">Verified pricing compared</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visuallyHidden">Attribute</span>
                  </th>
                  <ColumnHead product={a} />
                  <ColumnHead product={b} />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Entry price</th>
                  <td className={price.cheaper === "a" ? "duelWin" : undefined}>
                    <strong>{price.aEntry}</strong>
                    <span className="duelUnit">{price.aUnit}</span>
                  </td>
                  <td className={price.cheaper === "b" ? "duelWin" : undefined}>
                    <strong>{price.bEntry}</strong>
                    <span className="duelUnit">{price.bUnit}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">What that buys</th>
                  <td>{pa?.planNote}</td>
                  <td>{pb?.planNote}</td>
                </tr>
                <tr>
                  <th scope="row">Billed in</th>
                  <td>{pa?.fxNote ? "US dollars, converted to rand" : "Rand"}</td>
                  <td>{pb?.fxNote ? "US dollars, converted to rand" : "Rand"}</td>
                </tr>
                <tr>
                  <th scope="row">Free tier</th>
                  <td>{pa?.freeTier ?? "None"}</td>
                  <td>{pb?.freeTier ?? "None"}</td>
                </tr>
                <tr>
                  <th scope="row">Free trial</th>
                  <td>{trial.a}</td>
                  <td>{trial.b}</td>
                </tr>
                <tr>
                  <th scope="row">Demonstration</th>
                  <td>{demo.a}</td>
                  <td>{demo.b}</td>
                </tr>
                <tr>
                  <th scope="row">Named AI feature</th>
                  <td>{pa?.ai ?? "None advertised"}</td>
                  <td>{pb?.ai ?? "None advertised"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {price.reason ? (
            <p className="duelPriceNote">{price.reason}</p>
          ) : (
            <p className="chartNote">
              Read off each vendor pricing page, {a.name} on {pricedOn(a.slug)} and{" "}
              {b.name} on {pricedOn(b.slug)}. VAT, add on modules and extra users
              are excluded because they depend on your own configuration.
            </p>
          )}

          {bothPricingView && (
            <div className="duelLocal duelLocalTight">
              <div>
                <SideHeading product={a} />
                <p>{narrative.a.pricingView}</p>
              </div>
              <div>
                <SideHeading product={b} />
                <p>{narrative.b.pricingView}</p>
              </div>
            </div>
          )}
        </section>
      )}

      {!bothPriced && price.reason && (
        <section className="siteShell duelSection" id="cost">
          <p className="sectionChip">What it costs</p>
          <h2>Price</h2>
          <p className="duelPriceNote">{price.reason}</p>
        </section>
      )}

      {bothCapabilities && (
        <section className="siteShell duelSection" id="capability">
          <p className="sectionChip">Capability</p>
          <h2>What each one actually does</h2>
          <p className="duelIntro">
            The capabilities we tested in each review, written out rather than
            reduced to ticks in a grid. A tick tells you a feature exists. It
            does not tell you whether it is any good.
          </p>
          <div className="duelLocal">
            <div>
              <SideHeading product={a} />
              <CapabilityList narrative={narrative.a} />
            </div>
            <div>
              <SideHeading product={b} />
              <CapabilityList narrative={narrative.b} />
            </div>
          </div>

          <div className="duelScrollWrap duelFeatureWrap">
            <table className="duelTable duelTableFacts">
              <caption className="visuallyHidden">Modules each product covers</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visuallyHidden">Attribute</span>
                  </th>
                  <ColumnHead product={a} />
                  <ColumnHead product={b} />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Covers</th>
                  <td>
                    <ul className="duelChips">
                      {narrative.a.features.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="duelChips">
                      {narrative.b.features.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {(bothSetup || bothSupport) && (
        <section className="siteShell duelSection" id="setup">
          <p className="sectionChip">Getting it running</p>
          <h2>Setup, and who answers when it breaks</h2>
          {bothSetup && (
            <div className="duelLocal">
              <div>
                <SideHeading product={a} />
                <p className="duelSubLabel">What it takes to start</p>
                <p>{narrative.a.implementation}</p>
                {bothSupport && (
                  <>
                    <p className="duelSubLabel">When something breaks</p>
                    <p>{narrative.a.support}</p>
                  </>
                )}
              </div>
              <div>
                <SideHeading product={b} />
                <p className="duelSubLabel">What it takes to start</p>
                <p>{narrative.b.implementation}</p>
                {bothSupport && (
                  <>
                    <p className="duelSubLabel">When something breaks</p>
                    <p>{narrative.b.support}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="siteShell duelSection" id="balance">
        <p className="sectionChip">Strengths and limits</p>
        <h2>Where each one gives ground</h2>
        <div className="duelLocal">
          <div>
            <SideHeading product={a} />
            <ul className="duelPros">
              {a.pros.map((item) => (
                <li key={item}>
                  <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="duelCons">
              {a.cons.map((item) => (
                <li key={item}>
                  <Minus size={14} strokeWidth={2.4} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SideHeading product={b} />
            <ul className="duelPros">
              {b.pros.map((item) => (
                <li key={item}>
                  <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="duelCons">
              {b.cons.map((item) => (
                <li key={item}>
                  <Minus size={14} strokeWidth={2.4} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="siteShell duelSection" id="local">
        <p className="sectionChip">Local view</p>
        <h2>How each one behaves in South Africa</h2>
        <div className="duelLocal">
          <div>
            <SideHeading product={a} />
            <p>{a.localView}</p>
          </div>
          <div>
            <SideHeading product={b} />
            <p>{b.localView}</p>
          </div>
        </div>
      </section>

      {bothFinalView && (
        <section className="siteShell duelSection" id="verdict">
          <p className="sectionChip">Closing judgement</p>
          <h2>What we said about each one</h2>
          <div className="duelLocal">
            <div>
              <SideHeading product={a} />
              <p>{narrative.a.finalView}</p>
              <Link className="plainLink" href={`/reviews/${a.slug}`}>
                Read the full {a.name} review
              </Link>
            </div>
            <div>
              <SideHeading product={b} />
              <p>{narrative.b.finalView}</p>
              <Link className="plainLink" href={`/reviews/${b.slug}`}>
                Read the full {b.name} review
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="siteShell duelSection duelActions">
        <div className="duelActionRow">
          <a
            className="btn btnPrimary"
            href={pa?.pricingUrl ?? a.sourceUrl}
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
          >
            <span>Visit {a.name}</span>
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <a
            className="btn btnPrimary"
            href={pb?.pricingUrl ?? b.sourceUrl}
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
          >
            <span>Visit {b.name}</span>
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
        <p className="duelDisclosure">
          We may earn a commission if you subscribe through these links, at no
          extra cost to you. It never changes a score or a ranking.{" "}
          <Link href="/affiliate-disclosure">How we make money</Link>
        </p>
      </section>
    </>
  );
}
