import { Info } from "lucide-react";
import React from "react";

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface AnnouncementCardProps {
  title: string;
  message: string;
  icon?: LucideIcon;
  ctaLabel?: string;
  ctaHref?: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  message,
  icon: Icon = Info,
  ctaLabel,
  ctaHref,
}) => {
  return (
    <div className="rounded-xl p-6 bg-gradient-to-br from-accent/10 to-primary/10 border border-border/30 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="inline-block mt-3 text-xs font-medium text-primary hover:underline transition-colors"
            >
              {ctaLabel} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
