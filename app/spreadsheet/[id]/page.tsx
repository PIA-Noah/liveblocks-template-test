import { getDocument } from "@/lib/actions";
import { SpreadsheetDocumentView } from "./SpreadsheetDocumentView";
// import '@/styles/globals.css'

export default async function Spreadsheet({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data = null, error = null } = await getDocument({ documentId: id });

  return (
    <SpreadsheetDocumentView initialDocument={data} initialError={error} />
  );
}
