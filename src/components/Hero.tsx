"use client";

import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { Icon } from "./Icon";

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 767px)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const update = () => {
      const allowed =
        !preference.matches &&
        !connection?.saveData &&
        !["slow-2g", "2g", "3g"].includes(connection?.effectiveType || "");
      setAllowVideo(allowed);
      if (!allowed) {
        video.current?.pause();
        setVideoReady(false);
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={company.hero.mobileImage}
          />
          <img
            src={company.hero.image}
            alt=""
            width="1800"
            height="1200"
            fetchPriority="high"
          />
        </picture>
        {company.hero.video && allowVideo && (
          <video
            ref={video}
            className={videoReady ? "video-visible" : ""}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={company.hero.image}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
          >
            <source src={company.hero.video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="eyebrow hero-eyebrow">
          <span className="small-rule" />
          Landscaping · Lawn care · Property maintenance
        </div>
        <h1 id="hero-title">
          YOUR PROPERTY.
          <br />
          <span>OUR PRIDE.</span>
        </h1>
        <p>
          Professional lawn care, landscaping, and property maintenance with
          dependable service and a clean finish.
        </p>
        <div className="hero-actions">
          <a className="button button-green" href="#contact">
            Get a free estimate <Icon name="arrow-up" />
          </a>
          <a
            className="button button-outline"
            href={`tel:${company.contacts[0].telephone}`}
          >
            <Icon name="phone" />
            Call Darwin
          </a>
        </div>
        <div className="hero-note">
          <span className="status-dot" />
          Hard work. Honest service. Every time.
        </div>
      </div>
      <div className="container hero-bottom">
        <a href="#introduction" className="scroll-cue">
          <span>Discover the difference</span>
          <Icon name="arrow" />
        </a>
        <span className="hero-image-note">
          {company.hero.illustrative &&
            "Illustrative landscape · not a client project"}
        </span>
      </div>
    </section>
  );
}
