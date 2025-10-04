export interface IconSize {
  size: number;
  type: "pwa" | "favicon" | "apple";
  purpose?: string;
}

export const ICON_SIZES: IconSize[] = [
  // PWA Icons
  { size: 192, type: "pwa", purpose: "any" },
  { size: 512, type: "pwa", purpose: "any" },
  { size: 192, type: "pwa", purpose: "maskable" },
  { size: 512, type: "pwa", purpose: "maskable" },
  
  // Favicon
  { size: 16, type: "favicon" },
  { size: 32, type: "favicon" },
  { size: 48, type: "favicon" },
  
  // Apple Touch Icons
  { size: 180, type: "apple" },
  { size: 152, type: "apple" },
  { size: 167, type: "apple" },
];

export const generateIconFromSVG = async (
  svgUrl: string,
  size: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Draw white background for non-transparent icons
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);
      
      // Draw the SVG
      ctx.drawImage(img, 0, 0, size, size);
      
      // Convert to PNG
      resolve(canvas.toDataURL("image/png"));
    };
    
    img.onerror = () => reject(new Error("Failed to load SVG"));
    img.src = svgUrl;
  });
};

export const generateManifestJSON = () => {
  return JSON.stringify(
    {
      name: "Your App Name",
      short_name: "App",
      description: "Your app description",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#a855f7",
      icons: [
        {
          src: "/icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/icons/icon-192-maskable.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icons/icon-512-maskable.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    },
    null,
    2
  );
};

export const generateHTMLSnippet = () => {
  return `<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152.png">
<link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-touch-icon-167.png">

<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#a855f7">`;
};
