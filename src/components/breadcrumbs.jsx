import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {crumbs.map((crumb, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="size-3.5" />}
          {crumb.href ? (
            <Link href={crumb.href} className="no-underline hover:text-foreground hover:underline">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
