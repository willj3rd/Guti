import { build } from "esbuild";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = path.join(root, "preview");
const dataImage = async (filename) =>
  `data:image/webp;base64,${(await readFile(path.join(root, "public/media", filename))).toString("base64")}`;

const assets = {
  logo: await dataImage("gutierrez-crest.webp"),
  desktop: await dataImage("hero-lawn.webp"),
  mobile: await dataImage("hero-lawn-mobile.webp"),
};

// Bundle the actual application components. Only Next's server-backed image
// component and navigation are adapted for opening a file directly in a browser.
const entry = `
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Home from "./src/app/page";
import Privacy from "./src/app/privacy/page";
import { company } from "./src/data/company";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "./src/app/globals.css";

const assets = ${JSON.stringify(assets)};
company.logo = assets.logo;
company.hero.image = assets.desktop;
company.hero.mobileImage = assets.mobile;
company.hero.video = null;
company.siteUrl = null;

function Preview() {
  const [privacy, setPrivacy] = useState(location.hash === "#privacy");
  useEffect(() => {
    const navigate = () => {
      setPrivacy(location.hash === "#privacy");
      if (location.hash === "#privacy" || location.hash === "#home") {
        requestAnimationFrame(() => window.scrollTo(0, 0));
      }
    };
    const handleLink = (event) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (link?.getAttribute("href") === "/privacy") {
        event.preventDefault();
        location.hash = "privacy";
      }
    };
    addEventListener("hashchange", navigate);
    document.addEventListener("click", handleLink);
    return () => {
      removeEventListener("hashchange", navigate);
      document.removeEventListener("click", handleLink);
    };
  }, []);
  return <><a href="#main-content" className="skip-link">Skip to content</a>{privacy ? <Privacy /> : <Home />}</>;
}

createRoot(document.getElementById("root")).render(<Preview />);
`;

const result = await build({
  stdin: { contents: entry, resolveDir: root, loader: "tsx", sourcefile: "browser-preview.tsx" },
  absWorkingDir: root,
  bundle: true,
  minify: true,
  write: false,
  outfile: path.join(outputDirectory, "bundle.js"),
  platform: "browser",
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"', "process.env.NEXT_PUBLIC_SITE_URL": '""' },
  loader: { ".woff": "dataurl", ".woff2": "dataurl" },
  plugins: [{
    name: "portable-next-components",
    setup(builder) {
      builder.onResolve({ filter: /^next\/(image|link)$/ }, args => ({ path: args.path, namespace: "portable-next" }));
      builder.onLoad({ filter: /.*/, namespace: "portable-next" }, args => ({
        loader: "tsx",
        resolveDir: root,
        contents: args.path === "next/image"
          ? `import React from "react"; export default function Image({ priority, loading, src, ...props }) { return <img {...props} src={typeof src === "string" ? src : src.src} loading={priority ? "eager" : loading || "lazy"} decoding="async" />; }`
          : `import React from "react"; export default function Link({ href, ...props }) { return <a {...props} href={href === "/" ? "#home" : href} />; }`,
      }));
    },
  }],
});

const javascript = result.outputFiles.find(file => file.path.endsWith(".js")).text.replace(/<\/script/gi, "<\\/script");
const css = result.outputFiles.find(file => file.path.endsWith(".css")).text.replace(/<\/style/gi, "<\\/style");
const icon = (await readFile(path.join(root, "src/app/icon.svg"))).toString("base64");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101713"><meta name="robots" content="noindex,nofollow"><title>Gutiérrez Landscaping & More — Website Preview</title><link rel="icon" href="data:image/svg+xml;base64,${icon}"><style>${css}</style></head>
<body><div id="root"></div><noscript>Please enable JavaScript to view this interactive website preview.</noscript><script>${javascript}</script></body></html>`;

await mkdir(outputDirectory, { recursive: true });
const outputPath = path.join(outputDirectory, "Gutierrez-Website.html");
await writeFile(outputPath, html);
console.log(`Browser preview created: ${outputPath} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB)`);
