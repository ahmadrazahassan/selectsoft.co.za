import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Calculator,
  Check,
  ClipboardList,
  ContactRound,
  MessageSquareText,
  Minus,
  Store,
  UsersRound,
} from "lucide-react";
import type { Category, Guide, Product } from "../lib/data";
import { categoryCount, getLogo, getPricing, getProduct, type Comparison, type Pricing } from "../lib/data";

const iconMap = {
  calculator: Calculator,
  users: UsersRound,
  contact: ContactRound,
  boxes: Boxes,
  clipboard: ClipboardList,
  store: Store,
  messages: MessageSquareText,
};

export function CategoryRow({ category, index }: { category: Category; index: number }) {
  const Icon = iconMap[category.icon];
  return (
    <Link className="categoryRow" href={`/software/${category.slug}`}>
      <div className="categoryCardTop">
        <span className="categoryNumber">{String(index + 1).padStart(2, "0")}</span>
        <Icon size={28} strokeWidth={1.45} aria-hidden="true" />
      </div>
      <div className="categoryCardBody">
        <h3>{category.name}</h3>
        <p>{category.summary}</p>
      </div>
      <div className="categoryCardFooter">
        <span>{categoryCount(category.slug)} {categoryCount(category.slug) === 1 ? "review" : "reviews"}</span>
        <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
      </div>
    </Link>
  );
}

export function ProductMark({
  product,
  logoSrc,
  size = "default",
}: {
  product: Product;
  logoSrc?: string;
  size?: "default" | "large";
}) {
  // Fall back to the shared logo map so every surface shows the real mark,
  // not just the pages that happen to pass one in.
  const src = logoSrc ?? getLogo(product.slug);
  const scale = size === "large" ? " productMarkLarge" : "";
  if (src) {
    return (
      <span className={`productMark productMarkLogo${scale}`}>
        <Image
          className="productLogoImage"
          src={src}
          alt={`${product.name} logo`}
          width={72}
          height={72}
        />
      </span>
    );
  }
  return (
    <span className={`productMark productMark${product.tone}${scale}`} aria-label={`${product.name} wordmark`}>
      {product.initials}
    </span>
  );
}

export function EditorialScore({ score, compact = false }: { score: number; compact?: boolean }) {
  return (
    <div className={compact ? "score scoreCompact" : "score"} aria-label={`Editorial score ${score} out of 10`}>
      <strong>{score.toFixed(1)}</strong>
      <span>out of 10</span>
    </div>
  );
}

/** The headline figure, sized so a long qualifier never crowds the number. */
export function PriceTag({ price }: { price: Pricing }) {
  return (
    <div className="priceTag">
      <p className="priceLead">
        {price.entry !== "Free" && price.entry !== "On request" && (
          <span className="priceFrom">From</span>
        )}
        <strong>{price.entry}</strong>
        <span className="priceUnit">{price.unit}</span>
      </p>
      <p className="priceNote">{price.planNote}</p>
      {price.fxNote ? <p className="priceFx">{price.fxNote}</p> : null}
    </div>
  );
}

/** Only the signals a buyer actually shortlists on. One plain check per line,
 *  no chips and no decorative glyphs. */
export function PriceBadges({ price }: { price: Pricing }) {
  const badges: string[] = [];
  if (price.freeTier) badges.push(price.freeTier);
  if (price.trialDays) {
    badges.push(`${price.trialDays}-day free trial`);
  } else if (price.trialNote) {
    badges.push(price.trialNote);
  }
  if (price.demo) badges.push("Demo on request");
  if (price.ai) badges.push(price.ai);
  if (!badges.length) return null;
  return (
    <ul className="priceBadges">
      {badges.map((label) => (
        <li key={label}>
          <Check size={13} strokeWidth={2.4} aria-hidden="true" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function ReviewCard({
  product,
  lead = false,
  compact = false,
  logoSrc,
}: {
  product: Product;
  lead?: boolean;
  compact?: boolean;
  logoSrc?: string;
}) {
  const className = ["reviewCard", lead && "reviewCardLead", compact && "reviewCardCompact"]
    .filter(Boolean)
    .join(" ");
  const price = getPricing(product.slug);
  return (
    <article className={className}>
      <div className="reviewCardTop">
        <ProductMark product={product} logoSrc={logoSrc} />
        <p className="cardMeta">{product.shortCategory}</p>
      </div>
      <h3>
        <Link href={`/reviews/${product.slug}`}>{product.name}</Link>
      </h3>
      {!compact && <p className="reviewVerdict">{product.verdict}</p>}
      {price ? (
        <>
          <PriceTag price={price} />
          <PriceBadges price={price} />
        </>
      ) : (
        <div className="bestFor">
          <span>Best for</span>
          <strong>{product.bestFor}</strong>
        </div>
      )}
      <div className="cardActions">
        <Link className="btn btnSecondary btnCompact" href={`/reviews/${product.slug}`}>
          Read review
        </Link>
        <a
          className="btn btnPrimary btnCompact"
          href={price?.pricingUrl ?? product.sourceUrl}
          rel="nofollow sponsored noopener noreferrer"
          target="_blank"
        >
          <span>Visit site</span>
          <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

/** Head to head. Uses the criteria we actually wrote, and the `view` field that
 *  names the winner, rather than inventing scored dimensions. */
export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  const a = getProduct(comparison.productA);
  const b = getProduct(comparison.productB);
  if (!a || !b) return null;
  const priceA = getPricing(a.slug);
  const priceB = getPricing(b.slug);

  return (
    <article className="duelCard">
      <div className="duelCardHead">
        <ProductMark product={a} />
        <span className="duelVs" aria-hidden="true">vs</span>
        <ProductMark product={b} />
      </div>

      <div className="duelCardGrid">
        <h3>{a.name}</h3>
        <h3>{b.name}</h3>
        <p className="duelScore">
          {a.score.toFixed(1)}<span> / 10</span>
        </p>
        <p className="duelScore">
          {b.score.toFixed(1)}<span> / 10</span>
        </p>
        <p className="duelPrice">{priceA ? `${priceA.entry} ${priceA.unit}` : "See vendor"}</p>
        <p className="duelPrice">{priceB ? `${priceB.entry} ${priceB.unit}` : "See vendor"}</p>
      </div>

      <ul className="duelCriteria">
        {comparison.criteria.slice(0, 4).map((criterion) => (
          <li key={criterion.name}>
            <span>{criterion.name}</span>
            <em className={criterion.view === "Depends" ? "duelPickEven" : "duelPick"}>
              {criterion.view}
            </em>
          </li>
        ))}
      </ul>

      <Link className="duelCta" href={`/compare/${comparison.slug}`}>
        See full comparison
        <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
      </Link>
    </article>
  );
}

/** A trial tile leads on the one number that matters: how long you get. */
export function TrialCard({ product }: { product: Product }) {
  const price = getPricing(product.slug);
  if (!price) return null;
  const length = price.trialDays ? `${price.trialDays}` : "Free";
  const unit = price.trialDays ? (price.trialDays === 1 ? "day" : "days") : "trial";
  return (
    <article className="trialCard">
      <div className="trialCardTop">
        <ProductMark product={product} />
        <div>
          <p className="cardMeta">{product.shortCategory}</p>
          <h3>
            <Link href={`/reviews/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
      </div>
      <p className="trialLength">
        <strong>{length}</strong>
        <span>{unit}</span>
      </p>
      <p className="trialAfter">
        {price.trialDays
          ? `Then ${price.entry} ${price.unit}`
          : `Length not published · then ${price.entry} ${price.unit}`}
      </p>
      <a
        className="trialCta"
        href={price.pricingUrl}
        rel="nofollow sponsored noopener noreferrer"
        target="_blank"
      >
        Start the trial
        <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
      </a>
    </article>
  );
}

/**
 * Two shapes from one record. The feature runs the full width of the section
 * and splits the headline from its credits, which is how a print section front
 * is set. The compact card carries only what a reader needs to choose.
 */
export function GuideCard({ guide, lead = false }: { guide: Guide; lead?: boolean }) {
  const href = `/guides/${guide.slug}`;

  if (lead) {
    return (
      <article className="guideFeature">
        <div className="guideFeatureMain">
          <p className="guideFeatureMeta">
            <span className="guideFlag">Featured guide</span>
            <span>{guide.topic}</span>
          </p>
          <h3>
            <Link href={href}>{guide.title}</Link>
          </h3>
        </div>
        <div className="guideFeatureSide">
          <p className="guideFeatureExcerpt">{guide.excerpt}</p>
          <dl className="guideCredit">
            <div>
              <dt>Written by</dt>
              <dd>{guide.author}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{guide.date}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{guide.readTime}</dd>
            </div>
          </dl>
          <Link className="btn btnSecondary btnCompact guideCta" href={href}>
            <span>Read the guide</span>
            <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="guideCard">
      <p className="guideTopic">{guide.topic}</p>
      <h3>
        <Link href={href}>{guide.title}</Link>
      </h3>
      <p className="guideExcerpt">{guide.excerpt}</p>
      <p className="guideMetaFoot">
        <span>{guide.author}</span>
        <span>{guide.readTime}</span>
      </p>
    </article>
  );
}

export function ProsCons({ product }: { product: Product }) {
  return (
    <div className="prosCons">
      <section>
        <h2>What works well</h2>
        <ul>
          {product.pros.map((item) => (
            <li key={item}>
              <Check size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>What to consider</h2>
        <ul>
          {product.cons.map((item) => (
            <li key={item}>
              <Minus size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
