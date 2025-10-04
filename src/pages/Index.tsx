import { useState } from "react";
import { IconUploader } from "@/components/IconUploader";
import { IconPreview } from "@/components/IconPreview";
import { IconGrid } from "@/components/IconGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  ICON_SIZES,
  generateIconFromSVG,
  generateManifestJSON,
  generateHTMLSnippet,
} from "@/utils/iconGenerator";

const Index = () => {
  const [svgFile, setSvgFile] = useState<File | null>(null);
  const [svgUrl, setSvgUrl] = useState<string>("");
  const [generatedIcons, setGeneratedIcons] = useState<
    Array<{ size: number; url: string; type: "pwa" | "favicon" | "apple" }>
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileSelect = (file: File) => {
    setSvgFile(file);
    const url = URL.createObjectURL(file);
    setSvgUrl(url);
    setGeneratedIcons([]);
    toast.success("SVG uploaded successfully!");
  };

  const handleGenerateIcons = async () => {
    if (!svgUrl) {
      toast.error("Please upload an SVG file first");
      return;
    }

    setIsGenerating(true);
    toast.info("Generating icons...");

    try {
      const icons = await Promise.all(
        ICON_SIZES.map(async ({ size, type }) => {
          const url = await generateIconFromSVG(svgUrl, size);
          return { size, url, type };
        })
      );

      setGeneratedIcons(icons);
      toast.success("All icons generated successfully!");
    } catch (error) {
      toast.error("Failed to generate icons");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadAll = () => {
    if (generatedIcons.length === 0) {
      toast.error("Please generate icons first");
      return;
    }

    generatedIcons.forEach(({ size, url, type }) => {
      const link = document.createElement("a");
      let filename = "";
      
      if (type === "pwa") {
        const maskable = ICON_SIZES.find(
          (s) => s.size === size && s.type === "pwa" && s.purpose === "maskable"
        );
        filename = maskable ? `icon-${size}-maskable.png` : `icon-${size}.png`;
      } else if (type === "apple") {
        filename = `apple-touch-icon-${size}.png`;
      } else {
        filename = `favicon-${size}.png`;
      }
      
      link.href = url;
      link.download = filename;
      link.click();
    });

    toast.success("All icons downloaded!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PWA Icon Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Generate all necessary icons for your Progressive Web App
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-8">
        {/* Upload Section */}
        <section>
          <IconUploader onFileSelect={handleFileSelect} />
        </section>

        {/* Preview & Generate */}
        {svgUrl && (
          <section className="grid md:grid-cols-2 gap-8">
            <IconPreview svgUrl={svgUrl} />
            
            <div className="flex flex-col justify-center gap-6 p-8 bg-card rounded-lg shadow-card">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Ready to Generate</h3>
                <p className="text-muted-foreground mb-4">
                  Generate all required icons for PWA, favicons, and Apple devices
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ PWA icons (192x192, 512x512)</li>
                  <li>✓ Maskable icons for Android</li>
                  <li>✓ Favicon sizes (16x16, 32x32, 48x48)</li>
                  <li>✓ Apple touch icons (180x180, 152x152, 167x167)</li>
                </ul>
              </div>
              
              <Button
                onClick={handleGenerateIcons}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
              >
                {isGenerating ? "Generating..." : "Generate All Icons"}
              </Button>
            </div>
          </section>
        )}

        {/* Generated Icons Grid */}
        {generatedIcons.length > 0 && (
          <>
            <section>
              <IconGrid icons={generatedIcons} />
            </section>

            {/* Download Section */}
            <section className="flex justify-center">
              <Button
                onClick={handleDownloadAll}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity gap-2"
              >
                <Download className="w-5 h-5" />
                Download All Icons
              </Button>
            </section>

            {/* Code Snippets */}
            <section className="grid md:grid-cols-2 gap-8">
              <CodeBlock
                title="manifest.json"
                code={generateManifestJSON()}
                language="json"
              />
              <CodeBlock
                title="HTML Head Section"
                code={generateHTMLSnippet()}
                language="html"
              />
            </section>

            {/* Best Practices */}
            <section className="bg-card rounded-lg p-8 shadow-card">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Installation Guide
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Organize Your Icons</h4>
                  <p className="text-sm">
                    Create an <code className="bg-muted px-2 py-1 rounded">/icons</code> or{" "}
                    <code className="bg-muted px-2 py-1 rounded">/public/icons</code> directory in your project root
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Add Icons to Your Project</h4>
                  <p className="text-sm">
                    Place all downloaded icons in the icons directory with the filenames shown above
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Update Your HTML</h4>
                  <p className="text-sm">
                    Copy the HTML snippet above and paste it into the{" "}
                    <code className="bg-muted px-2 py-1 rounded">&lt;head&gt;</code> section of your index.html
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">4. Create manifest.json</h4>
                  <p className="text-sm">
                    Create a <code className="bg-muted px-2 py-1 rounded">manifest.json</code> file in your public directory using the snippet above
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Generate professional icons for your Progressive Web App in seconds</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
