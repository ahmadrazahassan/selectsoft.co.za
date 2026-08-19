import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the complete publication homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Choose software with a clear head/);
  assert.match(html, /Start with the work you want to improve/);
  assert.match(html, /Put two tools side by side/);
  assert.match(html, /Make a better software decision/);
  assert.match(html, /Software Select ZA/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("renders a product review with editorial detail", async () => {
  const response = await render("/reviews/simplepay");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /SimplePay review/);
  assert.match(html, /South African view/);
  assert.match(html, /Score breakdown/);
});

test("renders a published comparison", async () => {
  const response = await render("/compare/xero-vs-quickbooks-online");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Xero compared with QuickBooks Online/);
  assert.match(html, /Where each product stands/);
});
