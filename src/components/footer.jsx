export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-neutral-950 py-10 text-center">
      <p className="font-display px-4 text-xs tracking-widest text-neutral-400 uppercase">
        &copy; {new Date().getFullYear()} Prateek Sahay
        <span className="mx-2 text-neutral-600">&middot;</span>
        <a
          href="mailto:ptkinvent@gmail.com"
          className="text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline!"
        >
          Contact
        </a>
        <span className="mx-2 text-neutral-600">&middot;</span>
        <a
          href="#top"
          className="text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline!"
        >
          Back to top
        </a>
      </p>
    </footer>
  );
}
