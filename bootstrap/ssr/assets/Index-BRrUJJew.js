import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { Plus, Eye } from "lucide-react";
import "react";
function DocumentsIndex({ documents, filters, indicators }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register Dokumen" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Register Dokumen",
          subtitle: "Daftar dokumen bukti per indikator",
          actions: /* @__PURE__ */ jsxs(Link, { href: "/documents/create", className: "inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
            " Tambah Dokumen"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/documents", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari judul dokumen…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsxs("select", { name: "indikator_id", defaultValue: filters.indikator_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Indikator" }),
          indicators.map((i) => /* @__PURE__ */ jsxs("option", { value: i.id, children: [
            i.kode,
            " — ",
            i.nama_indikator
          ] }, i.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: documents.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada dokumen", description: "Tambahkan dokumen bukti untuk indikator berbasis dokumen." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Judul" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Indikator" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Periode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status Dokumen" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Verifikasi" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: documents.data.map((doc) => {
            var _a, _b;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: doc.kode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: doc.judul }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = doc.indikator) == null ? void 0 : _a.kode) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_b = doc.mitra) == null ? void 0 : _b.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: doc.periode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: doc.status_dokumen }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: doc.status_verifikasi }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Link, { href: `/documents/${doc.id}`, className: "text-teal hover:text-teal-600", children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }) })
            ] }, doc.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: documents })
      ] })
    ] })
  ] });
}
export {
  DocumentsIndex as default
};
