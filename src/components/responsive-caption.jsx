export default function ResponsiveCaption({ children, caption }) {
  return (
    <figure className="not-prose my-8">
      {children}
      {caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">{caption}</figcaption>}
    </figure>
  );
}
