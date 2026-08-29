export default function ResponsiveHeading({ numbering, children }) {
  return (
    <h2 className="font-display mt-12 mb-4 flex items-baseline gap-3 text-2xl font-light text-foreground first:mt-0">
      <span className="text-lg font-normal text-red-600 dark:text-red-400">{numbering}</span>
      {children}
    </h2>
  );
}
