import { ImageResponse } from "next/og";

const ogImageSize = {
  width: 1200,
  height: 630,
};

const services = [
  "Websites profissionais",
  "Landing pages",
  "Solucoes web",
  "Sistemas web sob medida",
];

function createOgImageResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(140deg, #06070d 0%, #0a0b12 46%, #130a23 100%)",
          color: "#ffffff",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          padding: "56px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-180px",
            left: "-120px",
            width: "460px",
            height: "460px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(126,44,255,0.45) 0%, rgba(126,44,255,0.08) 48%, rgba(126,44,255,0) 72%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "-150px",
            bottom: "-180px",
            width: "420px",
            height: "420px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(41,98,255,0.35) 0%, rgba(41,98,255,0.06) 52%, rgba(41,98,255,0) 76%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "28px",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            gap: "36px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "64%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "9999px",
                      background: "#a855f7",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      fontSize: "28px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#d8b4fe",
                    }}
                  >
                    PLS Sistemas
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "62px",
                    lineHeight: 1.05,
                    fontWeight: 700,
                    letterSpacing: "-0.045em",
                    maxWidth: "700px",
                  }}
                >
                  Sites, landing pages e software para empresas.
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  lineHeight: 1.35,
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: "820px",
                }}
              >
                Desenvolvimento web com foco em autoridade, performance e
                captacao de leads.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              {["SEO tecnico", "Design responsivo", "Joao Monlevade - MG"].map(
                (label) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "14px 22px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)",
                      fontSize: "24px",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {label}
                  </div>
                ),
              )}
            </div>
          </div>

          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              boxShadow: "0 28px 80px rgba(0,0,0,0.35)",
              padding: "34px 30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {services.map((service) => (
                <div
                  key={service}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    fontSize: "27px",
                    lineHeight: 1.3,
                    color: "#f5f3ff",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "9999px",
                      background: "#a855f7",
                    }}
                  />
                  {service}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingTop: "18px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "22px",
                  color: "rgba(255,255,255,0.62)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                Preview social
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                www.plssistemas.com.br
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    },
  );
}

export function GET() {
  return createOgImageResponse();
}

export function HEAD() {
  return new Response(null, {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
