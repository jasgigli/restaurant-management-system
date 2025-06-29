import React from "react";

// Define the type here
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface QuickLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface QuickLinksProps {
  links: QuickLink[];
}

const QuickLinks: React.FC<QuickLinksProps> = ({ links }) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-border/30 shadow-sm transition-all duration-150 group"
        >
          <link.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-medium text-sm text-foreground group-hover:text-primary">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default QuickLinks;
