import { createFileRoute } from "@tanstack/react-router";
import { TSWorkshopHome } from "@/components/ts-workshop-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TS Workshop | Motorcycle Repairs & Diagnostics" },
      { name: "description", content: "Professional motorcycle servicing, repairs and diagnostics from TS Workshop. Fair prices, honest work and fast turnaround." },
      { property: "og:title", content: "TS Workshop | Motorcycle Repairs & Diagnostics" },
      { property: "og:description", content: "Professional motorcycle servicing, repairs and diagnostics. Fair prices, honest work and fast turnaround." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <TSWorkshopHome />;
}
