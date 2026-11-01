import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { Plus, Eye } from "lucide-react";
import "react";
function WfdIndex({ wfd, filters, partners }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register WFD" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Register WFD",
          subtitle: "Daftar peserta Women Forest Defenders",
          actions: /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/wfd/create",
              className: "inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
                " Tambah WFD"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/wfd", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "search",
            defaultValue: filters.search,
            placeholder: "Cari nama atau desa…",
            className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64"
          }
        ),
        partners.length > 0 && /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          partners.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.nama }, p.id))
        ] }),
        /* @__PURE__ */ jsxs("select", { name: "status_aktif", defaultValue: filters.status_aktif, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Status" }),
          /* @__PURE__ */ jsx("option", { value: "1", children: "Aktif" }),
          /* @__PURE__ */ jsx("option", { value: "0", children: "Non-aktif" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: wfd.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada data WFD", description: "Tambahkan peserta WFD untuk mulai mencatat capaian." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Provinsi" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tahun Bergabung" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: wfd.data.map((item) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: item.kode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: item.nama_lengkap }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = item.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: item.provinsi ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: item.tahun_bergabung }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: item.status_aktif ? "Terverifikasi" : "Belum diverifikasi" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Link, { href: `/wfd/${item.id}`, className: "text-teal hover:text-teal-600", title: "Lihat detail", children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }) })
            ] }, item.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: wfd })
      ] })
    ] })
  ] });
}
export {
  WfdIndex as default
};
