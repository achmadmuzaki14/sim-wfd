import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
import "lucide-react";
function PoliciesIndex({ kebijakan, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kebijakan" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Kebijakan", subtitle: "Daftar kebijakan yang didorong oleh mitra" }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/policies", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari judul kebijakan…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsxs("select", { name: "level_kebijakan", defaultValue: filters.level_kebijakan, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Level" }),
          /* @__PURE__ */ jsx("option", { value: "Desa", children: "Desa" }),
          /* @__PURE__ */ jsx("option", { value: "Kabupaten", children: "Kabupaten" }),
          /* @__PURE__ */ jsx("option", { value: "Provinsi", children: "Provinsi" }),
          /* @__PURE__ */ jsx("option", { value: "Nasional", children: "Nasional" })
        ] }),
        mitraList.length > 0 && /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: kebijakan.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada kebijakan", description: "Data kebijakan yang didorong mitra akan tampil di sini." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Judul" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Level" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Isu" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Instansi" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Responsif Gender" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: kebijakan.data.map((k) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: k.judul }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = k.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.level_kebijakan }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.isu_didorong }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.instansi }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: k.status_kebijakan }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `text-xs ${k.responsif_gender ? "text-teal font-medium" : "text-muted"}`, children: k.responsif_gender ? "Ya" : "Tidak" }) })
            ] }, k.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: kebijakan })
      ] })
    ] })
  ] });
}
export {
  PoliciesIndex as default
};
