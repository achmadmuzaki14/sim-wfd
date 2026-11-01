import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { K as KpiCard } from "./KpiCard-ChL45zL7.js";
import "react";
import "lucide-react";
function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
}
function formatUsd(value) {
  if (value === null) return "–";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);
}
function LeverageIndex({ leverage, filters, mitraList }) {
  const totalIdr = leverage.data.reduce((sum, l) => sum + (l.jenis_leverage === "Dana" ? l.nilai_idr : 0), 0);
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dana Ungkit" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Dana Ungkit", subtitle: "Leverage yang diperoleh mitra" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsx(KpiCard, { label: "Total Leverage (IDR)", value: formatRupiah(totalIdr), color: "teal" }),
        /* @__PURE__ */ jsx(KpiCard, { label: "Jumlah Entrian", value: leverage.total, color: "navy" }),
        /* @__PURE__ */ jsx(KpiCard, { label: "Jenis", value: new Set(leverage.data.map((l) => l.jenis_leverage)).size, color: "outcome3" })
      ] }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/leverage", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari sumber leverage…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsxs("select", { name: "jenis_leverage", defaultValue: filters.jenis_leverage, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Jenis" }),
          /* @__PURE__ */ jsx("option", { value: "Dana", children: "Dana" }),
          /* @__PURE__ */ jsx("option", { value: "Tenaga Ahli", children: "Tenaga Ahli" }),
          /* @__PURE__ */ jsx("option", { value: "Fasilitas", children: "Fasilitas" }),
          /* @__PURE__ */ jsx("option", { value: "Pelatihan", children: "Pelatihan" })
        ] }),
        mitraList.length > 0 && /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: leverage.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada data leverage", description: "Data leverage mitra akan tampil di sini." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Sumber" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Jenis" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Nilai IDR" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Nilai USD" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Periode" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: leverage.data.map((l) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: l.sumber }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: l.jenis_leverage }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = l.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-medium", children: formatRupiah(l.nilai_idr) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right text-muted", children: formatUsd(l.nilai_usd) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: l.status_leverage }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: l.periode })
            ] }, l.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: leverage })
      ] })
    ] })
  ] });
}
export {
  LeverageIndex as default
};
