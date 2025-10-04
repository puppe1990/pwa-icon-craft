import { Card } from "@/components/ui/card";

interface IconPreviewProps {
  svgUrl: string;
}

export const IconPreview = ({ svgUrl }: IconPreviewProps) => {
  return (
    <Card className="p-8 bg-card shadow-card">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Preview</h3>
      <div className="flex items-center justify-center bg-muted rounded-lg p-12">
        <img src={svgUrl} alt="Icon preview" className="w-48 h-48 object-contain" />
      </div>
    </Card>
  );
};
