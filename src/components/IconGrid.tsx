import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GeneratedIcon {
  size: number;
  url: string;
  type: "pwa" | "favicon" | "apple";
}

interface IconGridProps {
  icons: GeneratedIcon[];
}

export const IconGrid = ({ icons }: IconGridProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "pwa":
        return "bg-primary text-primary-foreground";
      case "apple":
        return "bg-accent text-accent-foreground";
      case "favicon":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="p-8 bg-card shadow-card">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Generated Icons</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-muted hover:bg-accent/10 transition-all group"
          >
            <div className="w-full aspect-square bg-background rounded-lg flex items-center justify-center p-4 shadow-sm">
              <img
                src={icon.url}
                alt={`${icon.size}x${icon.size}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Badge className={getTypeColor(icon.type)}>{icon.type.toUpperCase()}</Badge>
              <span className="text-sm font-medium text-foreground">{icon.size}x{icon.size}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
