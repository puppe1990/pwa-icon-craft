import { Upload } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

interface IconUploaderProps {
  onFileSelect: (file: File) => void;
}

export const IconUploader = ({ onFileSelect }: IconUploaderProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type === "image/svg+xml") {
        onFileSelect(file);
      } else {
        toast.error("Please upload an SVG file");
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === "image/svg+xml") {
        onFileSelect(file);
      } else {
        toast.error("Please upload an SVG file");
      }
    },
    [onFileSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-all cursor-pointer bg-card hover:shadow-lg group"
    >
      <input
        type="file"
        accept=".svg"
        onChange={handleFileInput}
        className="hidden"
        id="svg-upload"
      />
      <label htmlFor="svg-upload" className="cursor-pointer flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">Upload SVG Icon</h3>
          <p className="text-muted-foreground">
            Drag and drop your SVG file here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Recommended: Square SVG, minimum 512x512px
          </p>
        </div>
      </label>
    </div>
  );
};
