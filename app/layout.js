import "./globals.css";

export const metadata = {
  title: "PurpLotus | Strategic Clarity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script
          id="tailwind-config"
          dangerouslySetInnerHTML={{
            __html: `tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "border-subtle": "#E5E7EB",
                        "secondary-fixed-dim": "#ccbeff",
                        "on-secondary-container": "#524584",
                        "on-primary-container": "#ede0ff",
                        "surface-bright": "#f8f9ff",
                        "primary-fixed-dim": "#d2bbff",
                        "error": "#ba1a1a",
                        "tertiary": "#7d3d00",
                        "tertiary-fixed-dim": "#ffb784",
                        "error-container": "#ffdad6",
                        "swot-strength": "#4C1D95",
                        "surface-container-lowest": "#ffffff",
                        "surface-tint": "#732ee4",
                        "surface-lavender": "#F5F3FF",
                        "on-secondary-fixed": "#1e0e4e",
                        "on-tertiary-container": "#ffe0cd",
                        "on-secondary-fixed-variant": "#4a3d7c",
                        "on-error": "#ffffff",
                        "tertiary-container": "#a15100",
                        "secondary-fixed": "#e7deff",
                        "on-tertiary-fixed": "#301400",
                        "on-tertiary": "#ffffff",
                        "swot-threat": "#4C1D95",
                        "on-secondary": "#ffffff",
                        "surface-container-low": "#eff4ff",
                        "tertiary-fixed": "#ffdcc6",
                        "on-background": "#121c2a",
                        "surface-dim": "#d0dbed",
                        "swot-weakness": "#4C1D95",
                        "inverse-primary": "#d2bbff",
                        "on-error-container": "#93000a",
                        "on-primary-fixed": "#25005a",
                        "outline": "#7b7487",
                        "primary": "#630ed4",
                        "surface-container": "#e6eeff",
                        "surface": "#f8f9ff",
                        "secondary": "#625595",
                        "surface-variant": "#d9e3f6",
                        "primary-container": "#7c3aed",
                        "on-primary-fixed-variant": "#5a00c6",
                        "on-surface-variant": "#4a4455",
                        "on-surface": "#121c2a",
                        "surface-container-highest": "#d9e3f6",
                        "outline-variant": "#ccc3d8",
                        "on-tertiary-fixed-variant": "#713700",
                        "inverse-surface": "#27313f",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container-high": "#dee9fc",
                        "secondary-container": "#c6b7ff",
                        "on-primary": "#ffffff",
                        "background": "#f8f9ff",
                        "swot-opportunity": "#4C1D95"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "gutter": "24px",
                        "unit": "8px",
                        "margin-desktop": "40px",
                        "margin-mobile": "16px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "display-lg": ["Playfair Display"],
                        "headline-sm": ["Playfair Display"],
                        "headline-md": ["Playfair Display"],
                        "display-lg-mobile": ["Playfair Display"],
                        "body-md": ["Inter"],
                        "body-lg": ["Inter"],
                        "quote": ["Playfair Display"],
                        "label-caps": ["Inter"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "quote": ["20px", {"lineHeight": "30px", "fontWeight": "400"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}]
                    }
                },
            },
        }`
          }}
        />
        <link rel="stylesheet" href="/style.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      </head>
      <body suppressHydrationWarning className="font-body-md text-body-md flex flex-col min-h-screen overflow-x-hidden bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}