import Link from "next/link";
import {
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
      <span className="categoryNumber">{String(index + 1).padStart(2, "0")}</span>
      <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
      <div>
        <h3>{category.name}</h3>
        <p>{category.summary}</p>
      </div>
      <div className="categoryCount">
        <strong>{category.count}</strong>
        <span>reviews</span>
      </div>
    </Link>
  );
}

export function ProductMark({ product }: { product: Product }) {
  return (
    <span className={`productMark productMark${product.tone}`} aria-label={`${product.name} wordmark`}>
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

export function ReviewCard({ product, lead = false }: { product: Product; lead?: boolean }) {
  return (
    <article className={lead ? "reviewCard reviewCardLead" : "reviewCard"}>
      <div className="reviewCardTop">
        <ProductMark product={product} />
        <EditorialScore score={product.score} compact />
      </div>
      <p className="cardMeta">{product.shortCategory}</p>
      <h3>
        <Link href={`/reviews/${product.slug}`}>{product.name}</Link>
      </h3>
      <p className="reviewVerdict">{product.verdict}</p>
      <div className="bestFor">
        <span>Best for</span>
        <strong>{product.bestFor}</strong>
      </div>
      <Link className="plainLink" href={`/reviews/${product.slug}`}>
        Read the full review
      </Link>
    </article>
  );
}

export function GuideArt({ art }: { art: Guide["art"] }) {
  return (
    <div className={`guideArt guideArt${art}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function GuideCard({ guide, lead = false }: { guide: Guide; lead?: boolean }) {
  return (
    <article className={lead ? "guideCard guideCardLead" : "guideCard"}>
      {lead && <GuideArt art={guide.art} />}
      <div className="guideCardContent">
        <p className="cardMeta cardMetaPair"><span>{guide.topic}</span><span>{guide.readTime}</span></p>
        <h3>
          <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
        </h3>
        <p>{guide.excerpt}</p>
        <div className="guideByline">
          <span>{guide.author}</span>
          <span>{guide.date}</span>
        </div>
      </div>
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
