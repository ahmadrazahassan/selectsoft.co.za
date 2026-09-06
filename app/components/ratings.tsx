import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  RATINGS_CHECKED_ON,
  SOURCE_MEASURES,
  getRatings,
  type Rating,
} from "../lib/ratings";

function Stars({ score }: { score: number }) {
  // A five step bar rather than five glyphs: it reads cleanly at any size and
  // shows a fractional score honestly instead of rounding to a half star.
  return (
    <span className="ratingBar" aria-hidden="true">
      <span style={{ width: `${(score / 5) * 100}%` }} />
    </span>
  );
}

/** One source, cited the way a figure taken from somebody else should be. */
function RatingRow({ rating }: { rating: Rating }) {
  return (
    <li className="ratingRow">
      <div className="ratingHead">
        <span className="ratingSource">{rating.source}</span>
        <span className="ratingMeasure">{SOURCE_MEASURES[rating.source]}</span>
      </div>
      <div className="ratingFigure">
        <strong>{rating.score.toFixed(1)}</strong>
        <span className="ratingOutOf">out of 5</span>
        <Stars score={rating.score} />
      </div>
      <a
        className="ratingCount"
        href={rating.url}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {rating.count.toLocaleString("en-ZA")} reviews on {rating.source}
        <ArrowUpRight size={13} strokeWidth={2.2} aria-hidden="true" />
      </a>
    </li>
  );
}

/**
 * The full block for a review page. If the two sources disagree sharply we say
 * so, because that gap is usually the most useful thing on the page.
 */
export function RatingCitations({ slug, name }: { slug: string; name: string }) {
  const ratings = getRatings(slug);
  if (!ratings.length) return null;

  const g2 = ratings.find((r) => r.source === "G2");
  const tp = ratings.find((r) => r.source === "Trustpilot");
  const gap = g2 && tp ? Math.abs(g2.score - tp.score) : 0;

  return (
    <div className="ratingPanel">
      <ul className="ratingList">
        {ratings.map((rating) => (
          <RatingRow key={rating.source} rating={rating} />
        ))}
      </ul>

      {gap >= 1 && g2 && tp ? (
        <p className="ratingGap">
          Those two numbers are {gap.toFixed(1)} points apart because they measure
          different things. {g2.score > tp.score
            ? `Business users rate the ${name} product well, while customers writing about billing and support rate the company far lower.`
            : `Customers rate the company well, while business users are harder on the product itself.`}{" "}
          Read both before you decide which matters more to you.
        </p>
      ) : null}

      <p className="ratingNote">
        These are not our reviews and we did not collect them. Each figure was
        read off the source page on {RATINGS_CHECKED_ON} and links back to it, so
        you can check it yourself. Our own score is separate and is explained in{" "}
        <Link href="#score">how we scored it</Link>.
      </p>
    </div>
  );
}

/** Compact form for a product card. */
export function RatingBadge({ slug }: { slug: string }) {
  const ratings = getRatings(slug);
  if (!ratings.length) return null;
  const best = ratings[0];
  return (
    <p className="ratingBadge">
      <strong>{best.score.toFixed(1)}</strong> out of 5 ·{" "}
      {best.count.toLocaleString("en-ZA")} reviews on {best.source}
    </p>
  );
}
