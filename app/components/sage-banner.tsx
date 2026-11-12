import Link from "next/link";
import {
  bannerImageUrl,
  bannerImpressionUrl,
  banners,
  cleanPlacement,
  type Banner,
} from "../lib/affiliate";

/**
 * One Sage campaign in two sizes. The wide leaderboard shows when the column
 * is wide enough to carry it, otherwise the medium rectangle does. Both are in
 * the markup and a container query picks one.
 *
 * Both creatives and both impression pixels are lazy. A lazy image inside a
 * hidden box is never requested, so only the size the reader can see is
 * fetched, and Impact counts one impression per view rather than two. The
 * pixel also waits until the slot is near the screen, so an ad below the fold
 * that is never scrolled to is not counted as seen.
 *
 * The click goes to our own /go redirect, never to Impact directly.
 */
function Creative({ banner, placement, size }: { banner: Banner; placement: string; size: "wide" | "narrow" }) {
  return (
    <div className={size === "wide" ? "adFrame adWide" : "adFrame adNarrow"}>
      {/* eslint-disable-next-line react/jsx-no-target-blank -- same origin redirect, and Impact needs the referrer to attribute the click */}
      <a
        href={`/go/banner/${banner.adId}?p=${placement}`}
        rel="nofollow sponsored noopener"
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- creative is hosted and versioned by Impact */}
        <img
          src={bannerImageUrl(banner)}
          width={banner.width}
          height={banner.height}
          alt={banner.alt}
          loading="lazy"
          decoding="async"
        />
      </a>
      {/* Impact's impression pixel, the same one its own embed code carries. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- tracking pixel */}
      <img
        className="adPixel"
        src={bannerImpressionUrl(banner)}
        width={1}
        height={1}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
    </div>
  );
}

export function SageBanner({ placement }: { placement: string }) {
  const where = cleanPlacement(placement);
  return (
    <aside className="adSlot" aria-label="Advertisement">
      <span className="adLabel">Advertisement</span>
      <Creative banner={banners.leaderboard} placement={where} size="wide" />
      <Creative banner={banners.rectangle} placement={where} size="narrow" />
      <span className="adNote">
        Sage is a commercial partner of Select Soft. <Link href="/affiliate-disclosure">How we make money</Link>
      </span>
    </aside>
  );
}
