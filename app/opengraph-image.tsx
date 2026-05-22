import { ImageResponse } from "next/og";
import { WREN_PATH } from "@/components/WrenMark";

export const runtime = "edge";
export const alt = "Wren Search — Built on better connections.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadInter(weight: number, italic = false): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Inter:ital,wght@${
    italic ? 1 : 0
  },${weight}&display=swap`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  }).then((r) => r.text());
  const fontUrl = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!fontUrl) throw new Error("Inter font URL not found");
  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [inter300, inter300Italic, inter700] = await Promise.all([
    loadInter(300),
    loadInter(300, true),
    loadInter(700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#383026",
          color: "#fafaf5",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Subtle background wren */}
        <div
          style={{
            position: "absolute",
            right: -100,
            bottom: -120,
            opacity: 0.06,
            display: "flex",
          }}
        >
          <svg viewBox="0 0 378 342" width="600" height="543">
            <path d={WREN_PATH} fill="#fafaf5" />
          </svg>
        </div>

        {/* Top: logo lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <svg viewBox="0 0 378 342" width="68" height="62">
            <path d={WREN_PATH} fill="#e35438" />
          </svg>
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 5,
              color: "#fafaf5",
            }}
          >
            WREN SEARCH
          </span>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#e35438",
              letterSpacing: 5,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Executive Search · Built Environment
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 96,
              fontWeight: 300,
              lineHeight: 1.04,
              marginTop: 28,
              letterSpacing: -2,
            }}
          >
            <span>Built on better&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#e35438" }}>
              connections.
            </span>
          </div>
        </div>

        {/* Bottom: meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#d4cfbf",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
            borderTop: "1px solid rgba(212,207,191,0.25)",
            paddingTop: 24,
          }}
        >
          <span>wrensearch.com</span>
          <span>Furnishings Industry</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter300, weight: 300, style: "normal" },
        { name: "Inter", data: inter300Italic, weight: 300, style: "italic" },
        { name: "Inter", data: inter700, weight: 700, style: "normal" },
      ],
    },
  );
}
