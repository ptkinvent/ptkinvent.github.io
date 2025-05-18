import BlogHeading from "@/components/blog-heading";

export default function BlogLayout({ children }) {
  return (
    <>
      <BlogHeading />

      {children}
    </>
  );
}
