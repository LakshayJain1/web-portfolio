import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DEV LAKSHAY Portfolio Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#5C94FC",
          backgroundImage:
            "linear-gradient(180deg, #5C94FC 0%, #1a1a2e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#FFD700",
              textShadow: "4px 4px 0 #000",
              marginBottom: "20px",
              letterSpacing: "4px",
            }}
          >
            DEV LAKSHAY
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#FFF",
              marginBottom: "40px",
              letterSpacing: "2px",
            }}
          >
            DESIGNER • DEVELOPER • STORYTELLER
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "18px",
              color: "#AAA",
            }}
          >
            <span style={{ color: "#00FF80" }}>UI/UX</span>
            <span style={{ color: "#FF6B6B" }}>3D ART</span>
            <span style={{ color: "#4ECDC4" }}>WEB DEV</span>
            <span style={{ color: "#FFE66D" }}>BRANDING</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "60px",
            background: "#C84C0C",
            borderTop: "8px solid #8B2500",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
