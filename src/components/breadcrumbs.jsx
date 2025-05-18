import Link from "next/link";

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav>
      <ol className="breadcrumb">
        {crumbs.map((crumb, index) => (
          <li className="breadcrumb-item" key={index}>
            {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
