"use client";

import { useState } from "react";
import type { Project } from "@/data/company";

export function BeforeAfterSlider({ project }: { project: Project }) {
  const [position, setPosition] = useState(50);
  return (
    <div className="comparison">
      <img src={project.before.src} alt={project.before.alt} loading="lazy" />
      <div
        className="comparison-after"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={project.after.src} alt={project.after.alt} loading="lazy" />
      </div>
      <span className="comparison-label before-label">Before</span>
      <span className="comparison-label after-label">After</span>
      <div className="comparison-divider" style={{ left: `${position}%` }}>
        <span>‹ &nbsp; ›</span>
      </div>
      <label className="sr-only" htmlFor={`compare-${project.id}`}>
        Compare before and after for {project.title}
      </label>
      <input
        id={`compare-${project.id}`}
        type="range"
        min="0"
        max="100"
        value={position}
        aria-valuetext={`${position}% after image visible`}
        onChange={(e) => setPosition(Number(e.target.value))}
      />
    </div>
  );
}
