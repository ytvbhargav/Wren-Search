import { ImageResponse } from "next/og";
import { WREN_PATH } from "@/components/WrenMark";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#383026",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 378 342" width="124" height="112">
          <path d={WREN_PATH} fill="#e35438" />
        </svg>
      </div>
    ),
    size,
  );
}
