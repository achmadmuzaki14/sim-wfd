import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { Plus } from "lucide-react";
import "react";
function ActivitiesIndex({ kegiatan, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register Kegiatan" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Register Kegiatan",
          subtitle: "Daftar kegiatan yang dilaksanakan",
          actions: /* @__PURE__ */ jsxs(Link, { href: "/activities/create", className: "inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
            " Tambah Kegiatan"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/activities", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari judul kegiatan…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        mitraList.length > 0 && /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: kegiatan.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada kegiatan", description: "Catat kegiatan yang dilaksanakan oleh mitra." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Judul" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tanggal" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Peserta P" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Peserta L" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Periode" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: kegiatan.data.map((k) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: k.kode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: k.judul }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = k.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.tanggal_kegiatan }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: k.peserta_perempuan }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: k.peserta_laki }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.periode })
            ] }, k.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: kegiatan })
      ] })
    ] })
  ] });
}
export {
  ActivitiesIndex as default
};
