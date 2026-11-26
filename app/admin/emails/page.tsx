import { requireRole } from "@/lib/auth";
import { getSentEmails, getReceivedEmails } from "@/app/actions/admin-email";
import { AdminEmailsClient } from "./AdminEmailsClient";
import type { SentEmail, ReceivedEmail } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Emails & Communications | Admin Console",
  description: "Compose outbound emails, manage incoming messages, and review communications.",
};

export default async function AdminEmailsPage() {
  await requireRole(["admin"]);

  let sentEmails: SentEmail[] = [];
  let receivedEmails: ReceivedEmail[] = [];
  let loadError: string | null = null;

  try {
    const [sent, received] = await Promise.all([
      getSentEmails(),
      getReceivedEmails(),
    ]);
    sentEmails = sent as SentEmail[];
    receivedEmails = received as ReceivedEmail[];
  } catch (error: any) {
    loadError = error?.message || "Failed to load communications history.";
  }

  return (
    <AdminEmailsClient
      initialEmails={sentEmails}
      initialReceivedEmails={receivedEmails}
      loadError={loadError}
    />
  );
}

