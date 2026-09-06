import type { Product } from "../lib/data";
import { getPricing } from "../lib/data";

/* ---------------------------------------------------------------------------
 * Cost charts.
 *
 * A headline monthly price is the least useful number in software buying. What
 * a buyer actually spends is the standing price plus whatever the introductory
 * offer hides, compounded over the years they will keep the product. These two
 * charts plot that, from the verified pricing table only.
 * ------------------------------------------------------------------------- */

const MONTHS = 36;

/** Cumulative rand spent by month, honouring any introductory offer. */
function cumulative(monthly: number, introMonths: number | null, introMonthly: number | null) {
  const out: number[] = [];
  let total = 0;
  for (let m = 1; m <= MONTHS; m += 1) {
    const inIntro = introMonths !== null && introMonthly !== null && m <= introMonths;
    total += inIntro ? (introMonthly as number) : monthly;
    out.push(Math.round(total));
  }
  return out;
}

const rand = (value: number) =>
  value >= 1000 ? `R${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : `R${Math.round(value)}`;

/** Smooth cubic path through a series, in the manner of a finance dashboard. */
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

/**
 * Three year cost of ownership, this product against its closest rival.
 * The shape of the curve is the point: an introductory offer bends it flat
 * early and then it straightens at the standing price.
 */
export function CostCurve({ product, peers }: { product: Product; peers: Product[] }) {
  const mine = getPricing(product.slug);
  if (!mine || mine.monthlyZar === null || mine.monthlyZar === 0) return null;

  // Only compare against a product billed the same way. A per user annual rate
  // spread across twelve months cannot sit beside a per company monthly price.
  const rival = peers
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({ product: p, price: getPricing(p.slug) }))
    .filter((row) => row.price?.monthlyZar && row.price.costComparable)
    .sort(
      (a, b) =>
        Math.abs((a.price?.monthlyZar ?? 0) - (mine.monthlyZar ?? 0)) -
        Math.abs((b.price?.monthlyZar ?? 0) - (mine.monthlyZar ?? 0)),
    )[0];

  const mineSeries = cumulative(mine.monthlyZar, mine.introMonths, mine.introMonthly);
  const rivalSeries = mine.costComparable && rival?.price?.monthlyZar
    ? cumulative(rival.price.monthlyZar, rival.price.introMonths, rival.price.introMonthly)
    : null;

  const w = 620;
  const h = 250;
  const padL = 8;
  const padR = 122;
  const padT = 24;
  const padB = 34;
  const peak = Math.max(
    mineSeries[MONTHS - 1],
    rivalSeries ? rivalSeries[MONTHS - 1] : 0,
  );
  const x = (i: number) => padL + (i / (MONTHS - 1)) * (w - padL - padR);
  const y = (v: number) => padT + (1 - v / peak) * (h - padT - padB);
  const pts = (series: number[]) => series.map((v, i) => [x(i), y(v)] as [number, number]);

  const minePts = pts(mineSeries);
  const mineArea = `${smoothPath(minePts)} L ${x(MONTHS - 1)} ${h - padB} L ${x(0)} ${h - padB} Z`;

  const mineTotal = mineSeries[MONTHS - 1];
  const rivalTotal = rivalSeries ? rivalSeries[MONTHS - 1] : null;
  const gap = rivalTotal !== null ? mineTotal - rivalTotal : null;
  const yearOne = mineSeries[11];
  const sticker = mine.monthlyZar * 12;

  return (
    <figure className="chart costChart">
      <div className="costStats">
        <div>
          <strong>{rand(mineTotal)}</strong>
          <span>
            spent on {product.name} over three years at the standing price
          </span>
        </div>
        {mine.introMonths ? (
          <div>
            <strong>{rand(sticker - yearOne)}</strong>
            <span>
              saved in year one by the {mine.introMonths} month introductory offer,
              which does not repeat
            </span>
          </div>
        ) : null}
        {gap !== null && rival ? (
          <div>
            <strong>
              {gap === 0 ? "Level" : `${gap > 0 ? "+" : ""}${rand(Math.abs(gap))}`}
            </strong>
            <span>
              {gap === 0
                ? `identical to ${rival.product.name} over the same period`
                : `${gap > 0 ? "more" : "less"} than ${rival.product.name} over the same period`}
            </span>
          </div>
        ) : null}
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Cumulative cost of ${product.name} over three years`}>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padL}
            x2={w - padR}
            y1={padT + t * (h - padT - padB)}
            y2={padT + t * (h - padT - padB)}
            className="costGrid"
          />
        ))}

        <path d={mineArea} className="costArea" />
        {rivalSeries ? <path d={smoothPath(pts(rivalSeries))} className="costLineRival" /> : null}
        <path d={smoothPath(minePts)} className="costLineMine" />

        {rivalSeries ? (
          <>
            <circle cx={x(MONTHS - 1)} cy={y(rivalSeries[MONTHS - 1])} r={4.5} className="costDotRival" />
            <text x={x(MONTHS - 1) + 12} y={y(rivalSeries[MONTHS - 1]) - 3} className="costEndValue costEndRival">
              {rand(rivalSeries[MONTHS - 1])}
            </text>
            <text x={x(MONTHS - 1) + 12} y={y(rivalSeries[MONTHS - 1]) + 11} className="costEndName">
              {rival.product.name}
            </text>
          </>
        ) : null}
        <circle cx={x(MONTHS - 1)} cy={y(mineTotal)} r={5} className="costDotMine" />
        <text x={x(MONTHS - 1) + 12} y={y(mineTotal) - 3} className="costEndValue costEndMine">
          {rand(mineTotal)}
        </text>
        <text x={x(MONTHS - 1) + 12} y={y(mineTotal) + 11} className="costEndName">
          {product.name}
        </text>

        {[0, 11, 23, 35].map((i) => (
          <text key={i} x={x(i)} y={h - 10} className="costAxis" textAnchor={i === 0 ? "start" : "middle"}>
            {i === 0 ? "Month 1" : `Year ${Math.round((i + 1) / 12)}`}
          </text>
        ))}
      </svg>

      <figcaption className="chartNote">
        Cumulative rand spent, not the monthly sticker. {mine.costBasis}.
        {mine.introMonths
          ? ` The curve is flat for the first ${mine.introMonths} months because of the introductory offer, then it straightens at the standing price.`
          : ""}{" "}
        VAT, add on modules and extra users are not included, because those depend
        on your configuration.
      </figcaption>
    </figure>
  );
}

/**
 * Category price ranking. Ranked horizontal bars with a tint ramp, and the
 * figures listed underneath, which is far easier to read than a scatter.
 */
export function PriceRanking({ product, peers }: { product: Product; peers: Product[] }) {
  const rows = peers
    .map((p) => ({ product: p, price: getPricing(p.slug) }))
    .filter((row) => row.price && row.price.monthlyZar !== null && row.price.costComparable)
    .map((row) => ({ product: row.product, value: row.price!.monthlyZar as number }))
    .sort((a, b) => b.value - a.value);

  if (rows.length < 3) return null;
  const peak = Math.max(...rows.map((r) => r.value)) || 1;
  const total = rows.reduce((sum, r) => sum + r.value, 0);

  return (
    <figure className="chart rankChart">
      <p className="rankTitle">Monthly cost across {product.category.toLowerCase()}</p>
      <div className="rankBars">
        {rows.map((row, i) => {
          const isMine = row.product.slug === product.slug;
          return (
            <div key={row.product.slug} className={isMine ? "rankRow rankRowMine" : "rankRow"}>
              <span className="rankLabel">{row.product.name}</span>
              <span
                className="rankBar"
                style={{
                  width: `${Math.max((row.value / peak) * 100, 1.5)}%`,
                  // a tint ramp from the dearest down to the cheapest
                  opacity: 1 - (i / Math.max(rows.length - 1, 1)) * 0.62,
                }}
              />
            </div>
          );
        })}
      </div>
      <ul className="rankList">
        {rows.map((row) => {
          const isMine = row.product.slug === product.slug;
          return (
            <li key={row.product.slug} className={isMine ? "rankListMine" : undefined}>
              <span>{row.product.name}</span>
              <span>
                <strong>{row.value === 0 ? "R0" : `R${row.value}`}</strong>
                <em>{total ? `${Math.round((row.value / total) * 100)}%` : "0%"}</em>
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption className="chartNote">
        Standing monthly price for one comparable seat or company, in rand. The
        percentage is that product&apos;s share of the combined monthly cost of all{" "}
        {rows.length}, which is a quick way to see how far apart this category
        really is. Quoted products carry no public figure and are not shown.
      </figcaption>
    </figure>
  );
}
