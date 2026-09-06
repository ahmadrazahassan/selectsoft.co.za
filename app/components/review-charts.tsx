import type { Product } from "../lib/data";
import { getPricing } from "../lib/data";
import { reviewDetail } from "../lib/reviews";

/* ---------------------------------------------------------------------------
 * Charts for the review page.
 *
 * Every figure plotted here comes from our own editorial scoring or from the
 * verified pricing table. Nothing is sampled, surveyed or estimated, so no
 * chart implies data we do not hold.
 * ------------------------------------------------------------------------- */

const AXIS = ["Everyday use", "Depth of features", "Value for money", "Support and skills", "South African fit"];

/** Mean score per dimension across a set of products. */
function categoryAverages(products: Product[]) {
  return AXIS.map((axis) => {
    const values = products
      .map((p) => reviewDetail[p.slug]?.scores.find((s) => s.name === axis)?.value)
      .filter((v): v is number => typeof v === "number");
    const mean = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    return Math.round(mean * 10) / 10;
  });
}

/** Radar of the five judged dimensions, drawn against the category average. */
export function ScoreRadar({ product, peers }: { product: Product; peers: Product[] }) {
  const detail = reviewDetail[product.slug];
  if (!detail) return null;
  const mine = AXIS.map((a) => detail.scores.find((s) => s.name === a)?.value ?? 0);
  const avg = categoryAverages(peers);

  const size = 300;
  const c = size / 2;
  const r = 92;
  const point = (value: number, i: number) => {
    const angle = (Math.PI * 2 * i) / AXIS.length - Math.PI / 2;
    const d = (value / 10) * r;
    return [c + Math.cos(angle) * d, c + Math.sin(angle) * d];
  };
  const path = (values: number[]) =>
    values.map((v, i) => point(v, i).map((n) => n.toFixed(1)).join(",")).join(" ");

  return (
    <figure className="chart chartRadar">
      {/* the box is widened so the axis labels sit inside it at any width */}
      <svg viewBox={`-42 -6 ${size + 84} ${size + 12}`} role="img" aria-label={`${product.name} scored across five dimensions`}>
        {[10, 7.5, 5, 2.5].map((ring) => (
          <polygon
            key={ring}
            points={path(AXIS.map(() => ring))}
            className="radarRing"
          />
        ))}
        {AXIS.map((axis, i) => {
          const [x, y] = point(10, i);
          return <line key={axis} x1={c} y1={c} x2={x} y2={y} className="radarSpoke" />;
        })}
        <polygon points={path(avg)} className="radarAverage" />
        <polygon points={path(mine)} className="radarMine" />
        {mine.map((v, i) => {
          const [x, y] = point(v, i);
          return <circle key={AXIS[i]} cx={x} cy={y} r={3.5} className="radarDot" />;
        })}
        {AXIS.map((axis, i) => {
          const [x, y] = point(12.6, i);
          const anchor = x > c + 4 ? "start" : x < c - 4 ? "end" : "middle";
          // Short labels so the ring does not need a legend to be readable.
          const short = axis.replace("Depth of features", "Features").replace("Value for money", "Value").replace("Support and skills", "Support").replace("South African fit", "Local fit").replace("Everyday use", "Everyday");
          return (
            <text key={axis} x={x} y={y} textAnchor={anchor} className="radarLabel" dominantBaseline="middle">
              {short}
            </text>
          );
        })}
      </svg>
      <figcaption>
        <span className="chartKey chartKeyMine">{product.name}</span>
        <span className="chartKey chartKeyAvg">{product.shortCategory} average</span>
      </figcaption>
    </figure>
  );
}

/** Grouped bars: this product against the category average, dimension by dimension. */
export function DimensionBars({ product, peers }: { product: Product; peers: Product[] }) {
  const detail = reviewDetail[product.slug];
  if (!detail) return null;
  const avg = categoryAverages(peers);

  return (
    <div className="chart chartDimensions">
      {AXIS.map((axis, i) => {
        const mine = detail.scores.find((s) => s.name === axis)?.value ?? 0;
        const other = avg[i];
        const delta = Math.round((mine - other) * 10) / 10;
        return (
          <div key={axis} className="dimensionRow">
            <span className="dimensionName">{axis}</span>
            <div className="dimensionTrack">
              <div className="dimensionBarMine" style={{ width: `${mine * 10}%` }} />
              <div className="dimensionMarker" style={{ left: `${other * 10}%` }} />
            </div>
            <strong>{mine.toFixed(1)}</strong>
            <em className={delta >= 0 ? "dimensionUp" : "dimensionDown"}>
              {delta >= 0 ? "+" : ""}
              {delta.toFixed(1)}
            </em>
          </div>
        );
      })}
      <p className="chartNote">
        The bar is {product.name}. The vertical line is the average of the{" "}
        {peers.length} products we have reviewed in {product.category.toLowerCase()}.
        The figure on the right is the difference.
      </p>
    </div>
  );
}

/** Head to head against the closest scoring product in the same category. */
export function HeadToHead({ product, peers }: { product: Product; peers: Product[] }) {
  const detail = reviewDetail[product.slug];
  const rival = peers
    .filter((p) => p.slug !== product.slug && reviewDetail[p.slug])
    .sort((a, b) => Math.abs(a.score - product.score) - Math.abs(b.score - product.score))[0];
  if (!detail || !rival) return null;
  const rivalDetail = reviewDetail[rival.slug];
  const minePrice = getPricing(product.slug);
  const rivalPrice = getPricing(rival.slug);

  const rows = [
    {
      label: "Overall",
      mine: product.score.toFixed(1),
      other: rival.score.toFixed(1),
      mineWins: product.score >= rival.score,
    },
    ...AXIS.map((axis) => {
      const a = detail.scores.find((s) => s.name === axis)?.value ?? 0;
      const b = rivalDetail.scores.find((s) => s.name === axis)?.value ?? 0;
      return { label: axis, mine: a.toFixed(1), other: b.toFixed(1), mineWins: a >= b };
    }),
    {
      label: "Entry price",
      mine: minePrice?.entry ?? "On request",
      other: rivalPrice?.entry ?? "On request",
      mineWins: null as boolean | null,
    },
  ];

  return (
    <div className="chart chartVersus">
      <table>
        <thead>
          <tr>
            <th scope="col">Dimension</th>
            <th scope="col">{product.name}</th>
            <th scope="col">{rival.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td className={row.mineWins === true ? "versusWin" : undefined}>{row.mine}</td>
              <td className={row.mineWins === false ? "versusWin" : undefined}>{row.other}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="chartNote">
        {rival.name} is the closest scoring product to {product.name} in{" "}
        {product.category.toLowerCase()}. Prices are compared as published, and a
        quoted product cannot be scored on price.
      </p>
    </div>
  );
}
