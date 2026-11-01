import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { FileSpreadsheet, Download } from "lucide-react";
import "react";
function ReportsIndex({ exports }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Laporan & Ekspor" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Laporan & Ekspor",
          subtitle: "Unduh laporan terstruktur untuk kebutuhan donor"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: exports.map((exp) => /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-500", children: /* @__PURE__ */ jsx(FileSpreadsheet, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy-500", children: exp.label }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted", children: exp.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/reports/export?type=${exp.params.type}`,
            className: "mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-teal-600",
            children: [
              /* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5" }),
              " Unduh Excel"
            ]
          }
        )
      ] }, exp.key)) })
    ] })
  ] });
}
export {
  ReportsIndex as default
};
