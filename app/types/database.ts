export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      software: {
        Row: { id: string; slug: string; name: string; vendor_name: string; short_description: string; website_url: string; key_features: string[]; sa_availability_notes: string | null; status: "draft" | "review" | "published" | "archived"; published_at: string | null };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: { id: string; email: string; status: "active" | "unsubscribed" | "suppressed"; consent_text: string; consented_at: string; source: string };
        Insert: { email: string; status?: "active" | "unsubscribed" | "suppressed"; consent_text: string; consented_at: string; source?: string };
        Update: Record<string, unknown>;
        Relationships: [];
      };
      contact_messages: {
        Row: { id: string; name: string; email: string; topic: string; product_or_vendor: string | null; message: string; consent: boolean; status: string };
        Insert: { name: string; email: string; topic: string; product_or_vendor?: string | null; message: string; consent: boolean; status?: string };
        Update: Record<string, unknown>;
        Relationships: [];
      };
      profiles: {
        Row: { id: string; full_name: string; role: "admin" | "editor" | "author"; is_active: boolean };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      editor_role: "admin" | "editor" | "author";
      content_status: "draft" | "review" | "published" | "archived";
      subscription_status: "active" | "unsubscribed" | "suppressed";
    };
    CompositeTypes: Record<string, never>;
  };
};
