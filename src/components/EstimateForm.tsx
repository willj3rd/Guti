"use client";

import { FormEvent, useRef, useState } from "react";
import { company } from "@/data/company";
import { Icon } from "./Icon";

export function EstimateForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const summary = useRef<HTMLTextAreaElement>(null);
  const [request, setRequest] = useState("");
  const [smsHref, setSmsHref] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [recipient, setRecipient] = useState("");

  function prepareRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const contact = String(data.get("preferredContact"));
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const emailInput = e.currentTarget.elements.namedItem(
      "email",
    ) as HTMLInputElement;
    emailInput.setCustomValidity(
      contact === "Email" && !email
        ? "Please add an email address so we can reply by email."
        : "",
    );
    if (!e.currentTarget.reportValidity()) return;
    const text = [
      "Hi Darwin, I'd like a free estimate.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${phone}`,
      ...(email ? [`Email: ${email}`] : []),
      `Property location: ${data.get("location")}`,
      `Service: ${data.get("service")}`,
      `Preferred reply: ${contact}`,
      ...(data.get("message") ? ["", String(data.get("message"))] : []),
    ].join("\n");
    setRequest(text);
    setRecipient(String(data.get("name")));
    setCopyStatus("");
    const apple = /iPhone|iPad|iPod/.test(navigator.userAgent);
    setSmsHref(
      `sms:${company.contacts[0].telephone}${apple ? "&" : "?"}body=${encodeURIComponent(text)}`,
    );
    dialog.current?.showModal();
  }

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(request);
      setCopyStatus("Copied. Paste your request into a text to Darwin.");
    } catch {
      summary.current?.focus();
      summary.current?.select();
      setCopyStatus(
        "Select and copy the request below, then text it to Darwin.",
      );
    }
  }

  return (
    <>
      <form className="estimate-form" onSubmit={prepareRequest}>
        <div className="form-heading">
          <span className="eyebrow">Let’s get started</span>
          <h3>A better yard starts here.</h3>
          <p>
            Tell us a little about your property. We’ll prepare a request for
            you to send to Darwin by text.
          </p>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="estimate-name">
              Your name <span>*</span>
            </label>
            <input
              id="estimate-name"
              name="name"
              autoComplete="name"
              placeholder="First and last name"
              required
              maxLength={100}
            />
          </div>
          <div className="form-field">
            <label htmlFor="estimate-phone">
              Phone number <span>*</span>
            </label>
            <input
              id="estimate-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(555) 000-0000"
              required
              maxLength={25}
              onInput={(e) => {
                const input = e.currentTarget;
                input.setCustomValidity(
                  input.value.replace(/\D/g, "").length >= 7
                    ? ""
                    : "Please enter a phone number with at least 7 digits.",
                );
              }}
            />
          </div>
          <div className="form-field full-width">
            <label htmlFor="estimate-email">
              Email address <span className="optional">Optional</span>
            </label>
            <input
              id="estimate-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              maxLength={150}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
          </div>
          <div className="form-field full-width">
            <label htmlFor="estimate-location">
              Property / service location <span>*</span>
            </label>
            <input
              id="estimate-location"
              name="location"
              autoComplete="street-address"
              placeholder="Street address or town"
              required
              maxLength={200}
            />
          </div>
          <div className="form-field">
            <label htmlFor="estimate-service">
              Service needed <span>*</span>
            </label>
            <select
              id="estimate-service"
              name="service"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              {company.services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="estimate-preference">Preferred reply</label>
            <select
              id="estimate-preference"
              name="preferredContact"
              defaultValue="Phone call"
              onChange={() => {
                const email = document.getElementById(
                  "estimate-email",
                ) as HTMLInputElement;
                email.setCustomValidity("");
              }}
            >
              <option>Phone call</option>
              <option>Text message</option>
              <option>Email</option>
            </select>
          </div>
          <div className="form-field full-width">
            <label htmlFor="estimate-message">
              What can we help with? <span className="optional">Optional</span>
            </label>
            <textarea
              id="estimate-message"
              name="message"
              rows={3}
              placeholder="A little about your property and what you have in mind…"
              maxLength={1000}
            />
          </div>
        </div>
        <button className="button button-dark form-submit" type="submit">
          Request a free estimate <Icon name="arrow-up" />
        </button>
        <p className="form-note">
          <Icon name="message" />
          You’ll review your request before sending it by text.
        </p>
      </form>
      <dialog
        ref={dialog}
        className="estimate-dialog"
        aria-labelledby="request-title"
        aria-describedby="request-description"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const bounds = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < bounds.left ||
              e.clientX > bounds.right ||
              e.clientY < bounds.top ||
              e.clientY > bounds.bottom
            )
              e.currentTarget.close();
          }
        }}
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current?.close()}
          aria-label="Close request preview"
        >
          <Icon name="close" />
        </button>
        <span className="eyebrow">One more step</span>
        <h2 id="request-title">
          Ready when you are,
          <br />
          {recipient.split(" ")[0]}.
        </h2>
        <p id="request-description">
          Nothing has been sent yet. Review your request, then open your
          messaging app to send it to Darwin.
        </p>
        <label className="sr-only" htmlFor="request-summary">
          Your estimate request
        </label>
        <textarea
          ref={summary}
          id="request-summary"
          readOnly
          value={request}
          rows={9}
        />
        <a className="button button-green" href={smsHref}>
          <Icon name="message" />
          Text request to Darwin <Icon name="arrow-up" />
        </a>
        <button className="button button-copy" onClick={copyRequest}>
          <Icon name="copy" />
          Copy request
        </button>
        <p className="copy-status" role="status">
          {copyStatus}
        </p>
        <p className="dialog-help">
          Prefer to talk?{" "}
          <a href={`tel:${company.contacts[0].telephone}`}>
            Call Darwin at {company.contacts[0].phone}
          </a>
          .
        </p>
      </dialog>
    </>
  );
}
