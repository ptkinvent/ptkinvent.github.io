import { notFound } from "next/navigation";

import Journal from "@/components/journal";
import { JOURNAL_TABLE, getJournalClient, isAdminUser, withSignedImages } from "@/lib/journal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journal",
  robots: { index: false, follow: false },
};

export default async function JournalPage() {
  // Non-admins get a plain 404 so the page's existence isn't revealed.
  if (!(await isAdminUser())) notFound();

  const supabase = getJournalClient();
  const { data, error } = await supabase
    .from(JOURNAL_TABLE)
    .select()
    .order("start_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) console.error("Supabase select error:", error);
  const entries = await withSignedImages(supabase, data ?? []);

  return <Journal entries={entries} loadFailed={Boolean(error)} />;
}
