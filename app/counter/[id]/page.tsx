import { getDocument } from "@/lib/actions";
import { CounterDocumentView } from "./CounterDocumentView";

export default async function Counter({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data = null, error = null } = await getDocument({ documentId: id });

  return <CounterDocumentView initialDocument={data} initialError={error} />;
}

// vercel key for project work on storage : sk_prod_Elb3-drDbbaUXGlmgD7hnQXl3r9R0szjaHxGGZXdTR8LVk8nkrRJOxMcwl40hdL1
