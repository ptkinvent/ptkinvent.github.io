export default function Video({ src, title, caption }) {
  return (
    <div className="not-prose my-12">
      {title && <h3 className="font-display mb-4 text-xl font-light text-foreground">{title}</h3>}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-900">
        <iframe src={src} className="absolute inset-0 h-full w-full" allowFullScreen />
      </div>
      {caption && <p className="mt-2 text-center text-sm text-muted-foreground italic">{caption}</p>}
    </div>
  );
}
