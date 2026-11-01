import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
import "lucide-react";
function DataQualityIndex({ dqaLogs, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log DQA" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Log DQA", subtitle: "Data Quality Assurance — isu dan tindak lanjut" }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/data-quality", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari deskripsi isu…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsxs("select", { name: "status_isu", defaultValue: filters.status_isu, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Status" }),
          /* @__PURE__ */ jsx("option", { value: "Open", children: "Open" }),
          /* @__PURE__ */ jsx("option", { value: "In progress", children: "In progress" }),
          /* @__PURE__ */ jsx("option", { value: "Closed", children: "Closed" })
        ] }),
        /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: dqaLogs.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada isu DQA", description: "Semua data berkualitas baik." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Jenis Isu" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Deskripsi" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "PIC" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Deadline" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Overdue" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: dqaLogs.data.map((log) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: log.jenis_isu }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: log.deskripsi }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = log.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: log.pic }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: log.deadline ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: log.status_isu }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: log.is_overdue ? /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-danger", children: "Ya" }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: "–" }) })
            ] }, log.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: dqaLogs })
      ] })
    ] })
  ] });
}
export {
  DataQualityIndex as default
};
