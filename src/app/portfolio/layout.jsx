import PortfolioHeading from "@/components/portfolio-heading";

export default function PortfolioLayout({ children }) {
  return (
    <>
      <PortfolioHeading />

      {children}
    </>
  );
}
