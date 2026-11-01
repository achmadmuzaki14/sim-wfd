import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import "react";
import "lucide-react";
const aksiColors = {
  INSERT: "bg-green-100 text-green-700",
  UPDATE: "bg-amber-100 text-amber-700",
  DELETE: "bg-red-100 text-red-700"
};
function AdministrationAuditLog({ logs, filters }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Audit Log" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Audit Log", subtitle: "Log perubahan data yang tidak dapat dimodifikasi" }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/administration/audit-log", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsxs("select", { name: "tabel", defaultValue: filters.tabel, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Tabel" }),
          /* @__PURE__ */ jsx("option", { value: "wfd_roster", children: "WFD Roster" }),
          /* @__PURE__ */ jsx("option", { value: "wfd_capaian", children: "WFD Capaian" }),
          /* @__PURE__ */ jsx("option", { value: "dokumen", children: "Dokumen" }),
          /* @__PURE__ */ jsx("option", { value: "kegiatan", children: "Kegiatan" }),
          /* @__PURE__ */ jsx("option", { value: "kelompok", children: "Kelompok" }),
          /* @__PURE__ */ jsx("option", { value: "proses", children: "Proses" }),
          /* @__PURE__ */ jsx("option", { value: "produk", children: "Produk" }),
          /* @__PURE__ */ jsx("option", { value: "penjualan", children: "Penjualan" }),
          /* @__PURE__ */ jsx("option", { value: "kebijakan", children: "Kebijakan" }),
          /* @__PURE__ */ jsx("option", { value: "leverage", children: "Leverage" })
        ] }),
        /* @__PURE__ */ jsxs("select", { name: "aksi", defaultValue: filters.aksi, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Aksi" }),
          /* @__PURE__ */ jsx("option", { value: "INSERT", children: "Insert" }),
          /* @__PURE__ */ jsx("option", { value: "UPDATE", children: "Update" }),
          /* @__PURE__ */ jsx("option", { value: "DELETE", children: "Delete" })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari record ID…", className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: logs.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada log", description: "Log perubahan akan tampil di sini." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Waktu" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tabel" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Record ID" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Aksi" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Pengguna" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: logs.data.map((log) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted whitespace-nowrap", children: log.waktu }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: log.tabel }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-muted font-mono text-xs", children: [
                log.record_id.substring(0, 8),
                "…"
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `rounded-md px-2 py-0.5 text-xs font-medium ${aksiColors[log.aksi] ?? "bg-slate-100 text-slate-700"}`, children: log.aksi }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = log.user) == null ? void 0 : _a.name) ?? "Sistem" })
            ] }, log.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: logs })
      ] })
    ] })
  ] });
}
export {
  AdministrationAuditLog as default
};
