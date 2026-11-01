import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { Plus } from "lucide-react";
import "react";
function ProcessesIndex({ proses, filters, indicators }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pelacak Proses" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Pelacak Proses",
          subtitle: "Lacak kemajuan proses per kuartal tanpa menggelembungkan capaian",
          actions: /* @__PURE__ */ jsxs(Link, { href: "/processes/create", className: "inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
            " Tambah Proses"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/processes", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari judul proses…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
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
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: proses.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada proses", description: "Tambahkan proses untuk melacak kemajuan per kuartal." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Judul" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Indikator" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-center", children: "Tahapan" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: proses.data.map((p) => {
            var _a, _b;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: p.kode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: p.judul }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = p.indikator) == null ? void 0 : _a.kode) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_b = p.mitra) == null ? void 0 : _b.nama) ?? "–" }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-center text-muted", children: [
                p.tahapan_saat_ini,
                "/",
                p.total_tahapan
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: p.status_proses }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Link, { href: `/processes/${p.id}`, className: "text-sm text-teal hover:text-teal-600", children: "Detail" }) })
            ] }, p.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: proses })
      ] })
    ] })
  ] });
}
export {
  ProcessesIndex as default
};
