import { ImageResponse } from "next/og";

export const runtime = "edge";

type Parameters = {
  title?: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parameters: Parameters = Object.fromEntries(searchParams);
    const { title } = parameters;

    const inter = fetch(new URL("/public/assets/inter/regular.ttf", import.meta.url)).then((res) => res.arrayBuffer());

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "40px",
          fontSize: "24px",
          letterSpacing: "-0.47px",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "24px",
            gap: 12,
          }}
        >
          <div
            style={{
              color: "rgba(255, 255, 255, 0.92)",
            }}
          >
            next-sylph-portfolio
          </div>
          {title && (
            <div
              style={{
                color: "rgba(255, 255, 255, 0.39)",
              }}
            >
              /
            </div>
          )}
          {title ? (
            <div
              style={{
                color: "rgba(255, 255, 255, 0.39)",
              }}
            >
              {title.toLowerCase()}
            </div>
          ) : (
            <svg width="16" viewBox="0 0 75 65" fill="white">
              <title>Next.js</title>
              <path d="M37.59.25l36.95 64H.64l36.95-64z" />
            </svg>
          )}
        </div>
      </div>,
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: "Inter",
            data: await inter,
            weight: 400,
          },
        ],
      },
    );
  } catch {
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
