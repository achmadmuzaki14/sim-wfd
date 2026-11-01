import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
import "lucide-react";
const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
function ComplianceIndex({ kepatuhanLaporan, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kepatuhan Laporan" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Kepatuhan Laporan", subtitle: "Tracking kepatuhan laporan kuartalan mitra" }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/report-compliance", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsxs("select", { name: "tahun", defaultValue: filters.tahun, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Tahun" }),
          /* @__PURE__ */ jsx("option", { value: "2025", children: "2025" }),
          /* @__PURE__ */ jsx("option", { value: "2026", children: "2026" }),
          /* @__PURE__ */ jsx("option", { value: "2027", children: "2027" })
        ] }),
        /* @__PURE__ */ jsxs("select", { name: "status_laporan", defaultValue: filters.status_laporan, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Status" }),
          /* @__PURE__ */ jsx("option", { value: "Diterima", children: "Diterima" }),
          /* @__PURE__ */ jsx("option", { value: "Terlambat", children: "Terlambat" }),
          /* @__PURE__ */ jsx("option", { value: "Belum kirim", children: "Belum kirim" }),
          /* @__PURE__ */ jsx("option", { value: "Tidak wajib", children: "Tidak wajib" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: kepatuhanLaporan.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada data kepatuhan", description: "Data kepatuhan laporan mitra akan tampil di sini." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tahun" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Bulan" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tanggal Diterima" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Catatan" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: kepatuhanLaporan.data.map((k) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: ((_a = k.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.tahun }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: monthNames[k.bulan] ?? k.bulan }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: k.status_laporan }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.tanggal_diterima ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.catatan ?? "–" })
            ] }, k.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: kepatuhanLaporan })
      ] })
    ] })
  ] });
}
export {
  ComplianceIndex as default
};
