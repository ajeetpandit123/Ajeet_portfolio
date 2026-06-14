import { AdminMessages } from "@/features/admin/admin-messages";
import { getContactMessages } from "@/services/content.service";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();
  return <AdminMessages messages={messages} />;
}
