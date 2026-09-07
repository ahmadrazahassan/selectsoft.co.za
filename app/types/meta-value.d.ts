import "react";

/**
 * `<meta value="...">` is not in React's typings, because a meta tag normally
 * carries its payload in `content`. Impact, the network Sage runs its
 * affiliate programme on, reads `value` instead, and their verification fails
 * if the tag is rewritten to use `content`.
 *
 * This teaches TypeScript about that one attribute on that one element rather
 * than casting at the call site, so the tag in the root layout stays plain
 * JSX and stays checked.
 */
declare module "react" {
  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    /** Ownership token for networks that read `value` rather than `content`. */
    value?: string;
  }
}
