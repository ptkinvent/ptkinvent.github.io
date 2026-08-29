import PortfolioHeading from "@/components/portfolio-heading";

export default function PortfolioLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PortfolioHeading />

      {children}
    </div>
  );
}
