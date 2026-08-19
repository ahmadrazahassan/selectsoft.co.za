import { products as localProducts, type Product } from "./data";
import { createPublicSupabaseClient } from "./supabase";

type SoftwareRow = {
  slug: string;
  name: string;
  vendor_name: string;
  short_description: string;
  website_url: string;
  key_features: string[] | null;
  sa_availability_notes: string | null;
};

export async function getPublishedProducts(): Promise<Product[]> {
  const client = createPublicSupabaseClient();
  if (!client) return localProducts;
  const { data, error } = await client
    .from("software")
    .select("slug,name,vendor_name,short_description,website_url,key_features,sa_availability_notes")
    .eq("status", "published")
    .order("name");
  if (error || !data?.length) return localProducts;
  const rows = data as SoftwareRow[];
  return localProducts.map((product) => {
    const record = rows.find((row) => row.slug === product.slug);
    if (!record) return product;
    return {
      ...product,
      name: record.name,
      vendor: record.vendor_name,
      verdict: record.short_description || product.verdict,
      features: record.key_features?.length ? record.key_features : product.features,
      localView: record.sa_availability_notes || product.localView,
      sourceUrl: record.website_url,
    };
  });
}
