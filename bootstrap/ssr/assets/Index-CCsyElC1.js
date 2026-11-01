import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
import "lucide-react";
function LearningStoriesIndex({ stories, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Learning Stories" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Learning Stories", subtitle: "Kumpulan cerita pembelajaran dari mitra" }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/learning-stories", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari cerita…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsx("input", { type: "text", name: "tema", defaultValue: filters.tema, placeholder: "Tema…", className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
        mitraList.length > 0 && /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      stories.data.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-card border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada cerita pembelajaran", description: "Cerita pembelajaran dari mitra akan tampil di sini." }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: stories.data.map((s) => {
        var _a;
        return /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy-500", children: s.judul }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted", children: [
            "Oleh: ",
            s.penulis,
            " · ",
            ((_a = s.mitra) == null ? void 0 : _a.nama) ?? "–"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted line-clamp-3", children: s.ringkasan }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-md bg-appbg px-2 py-0.5 text-xs text-muted", children: s.tema }),
            /* @__PURE__ */ jsx(StatusPill, { status: s.status_verifikasi })
          ] }),
          s.link_cerita && /* @__PURE__ */ jsx("a", { href: s.link_cerita, target: "_blank", rel: "noopener noreferrer", className: "mt-3 inline-block text-xs text-teal hover:text-teal-600", children: "Baca selengkapnya →" })
        ] }, s.id);
      }) }),
      stories.data.length > 0 && /* @__PURE__ */ jsx("div", { className: "rounded-card border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsx(Pagination, { data: stories }) })
    ] })
  ] });
}
export {
  LearningStoriesIndex as default
};
