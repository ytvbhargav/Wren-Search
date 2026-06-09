import { ImageResponse } from "next/og";
import { WREN_PATH } from "@/components/WrenMark";

export const runtime = "edge";
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
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
        <svg viewBox="0 0 378 342" width="72" height="65">
          <path d={WREN_PATH} fill="#e35438" />
        </svg>
      </div>
    ),
    size,
  );
}
