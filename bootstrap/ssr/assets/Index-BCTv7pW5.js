import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
import "lucide-react";
function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
}
function ProductsIndex({ products, sales, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Produk & Penjualan" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Produk & Penjualan", subtitle: "Daftar produk HHBK dan data penjualan" }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/products-sales", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari produk…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsx("input", { type: "text", name: "periode", defaultValue: filters.periode, placeholder: "Periode (2026-Q1)", className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
        mitraList.length > 0 && /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-border px-4 py-3", children: /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy-500", children: "Produk" }) }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: products.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada produk" }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Komoditas" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kelompok" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Periode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Verifikasi" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: products.data.map((p) => {
            var _a, _b;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: p.kode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: p.nama }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: p.komoditas }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = p.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_b = p.kelompok) == null ? void 0 : _b.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: p.periode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: p.status_verifikasi }) })
            ] }, p.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: products, pageName: "products_page" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b border-border px-4 py-3", children: /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy-500", children: "Penjualan" }) }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: sales.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada data penjualan" }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Komoditas" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Bulan" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Volume" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Omzet" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Laba" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Pasar" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: sales.data.map((s) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: s.kode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: s.komoditas }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = s.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: s.bulan }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right", children: [
                s.volume,
                " ",
                s.satuan
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-medium", children: formatRupiah(s.omzet) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right text-teal font-medium", children: formatRupiah(s.laba) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: s.level_pasar })
            ] }, s.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: sales, pageName: "sales_page" })
      ] })
    ] })
  ] });
}
export {
  ProductsIndex as default
};
