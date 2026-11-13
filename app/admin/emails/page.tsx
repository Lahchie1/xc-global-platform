import { requireRole } from "@/lib/auth";
import { getSentEmails } from "@/app/actions/admin-email";
import { AdminEmailsClient, type SentEmail } from "./AdminEmailsClient";

export const metadata = {
  title: "Emails & Communications | Admin Console",
  description: "Compose outbound emails and review sent email history.",
};

export default async function AdminEmailsPage() {
  await requireRole(["admin"]);

  let emails: SentEmail[] = [];
  let loadError: string | null = null;

  try {
    emails = (await getSentEmails()) as SentEmail[];
  } catch (error: any) {
    loadError = error?.message || "Failed to load sent emails.";
  }

  return <AdminEmailsClient initialEmails={emails} loadError={loadError} />;
}
