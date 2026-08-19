"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "done" | "error";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Please try again.");
      setState("done");
      setMessage(result.message ?? "You are on the list.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form className={compact ? "newsletterForm newsletterFormCompact" : "newsletterForm"} action={submit}>
      <label htmlFor={compact ? "footerEmail" : "newsletterEmail"}>Email address</label>
      <div>
        <input
          id={compact ? "footerEmail" : "newsletterEmail"}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.co.za"
          required
        />
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Subscribe"}
        </button>
      </div>
      {!compact && <p className="consentCopy">One useful note each month. You can leave at any time.</p>}
      {message && <p className={`formMessage formMessage${state}`} role="status">{message}</p>}
    </form>
  );
}

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setState("sending");
    setMessage("");
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Please check the form and try again.");
      setState("done");
      setMessage(result.message ?? "Your note has reached the editorial desk.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form className="contactForm" action={submit}>
      <div className="formGrid">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>What can we help with?</span>
        <select name="topic" required defaultValue="">
          <option value="" disabled>Select a topic</option>
          <option>Editorial question</option>
          <option>Correction</option>
          <option>Product information</option>
          <option>Commercial enquiry</option>
        </select>
      </label>
      <label>
        <span>Product or vendor</span>
        <input name="product" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={7} minLength={20} required />
      </label>
      <label className="consentCheck">
        <input name="consent" type="checkbox" value="yes" required />
        <span>You may use these details to reply to this enquiry.</span>
      </label>
      <input className="honey" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending" : "Send message"}
      </button>
      {message && <p className={`formMessage formMessage${state}`} role="status">{message}</p>}
    </form>
  );
}
