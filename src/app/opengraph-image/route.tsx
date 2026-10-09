import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#101713",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#f7f5ef",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 25,
            letterSpacing: 3,
            marginBottom: 60,
          }}
        >
          GUTIÉRREZ LANDSCAPING & MORE
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -4,
          }}
        >
          YOUR PROPERTY.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -4,
            color: "#20C77A",
          }}
        >
          OUR PRIDE.
        </div>
        <div style={{ display: "flex", fontSize: 24, marginTop: 44 }}>
          Lawn care · Landscaping · Property maintenance
        </div>
      </div>
    ),
    size,
  );
}
