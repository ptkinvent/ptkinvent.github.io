import BlogHeading from "@/components/blog-heading";

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeading />

      {children}
    </div>
  );
}
