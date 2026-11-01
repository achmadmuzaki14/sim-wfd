import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { Plus } from "lucide-react";
import "react";
function GroupsIndex({ kelompok, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelompok" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Kelompok",
          subtitle: "Daftar kelompok (Kelompok Monitoring, KPS, KUPS)",
          actions: /* @__PURE__ */ jsxs(Link, { href: "/groups/create", className: "inline-flex items-center gap-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-600", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
            " Tambah Kelompok"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/groups", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari nama kelompok…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsxs("select", { name: "tipe", defaultValue: filters.tipe, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Tipe" }),
          /* @__PURE__ */ jsx("option", { value: "Kelompok Monitoring Hutan", children: "Kelompok Monitoring Hutan" }),
          /* @__PURE__ */ jsx("option", { value: "KPS", children: "KPS" }),
          /* @__PURE__ */ jsx("option", { value: "KUPS", children: "KUPS" })
        ] }),
        mitraList.length > 0 && /* @__PURE__ */ jsxs("select", { name: "mitra_id", defaultValue: filters.mitra_id, className: "rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Semua Mitra" }),
          mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: kelompok.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada kelompok", description: "Tambahkan kelompok untuk mulai mencatat data." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tipe" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Anggota P" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Anggota L" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Luas (ha)" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Pemimpin" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Verifikasi" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: kelompok.data.map((k) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: k.kode }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: k.nama }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: k.tipe }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_a = k.mitra) == null ? void 0 : _a.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: k.anggota_perempuan }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: k.anggota_laki }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: k.luas_hektar ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `text-xs ${k.dipimpin_perempuan ? "text-teal font-medium" : "text-muted"}`, children: k.dipimpin_perempuan ? "Perempuan" : "Laki-laki" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: k.status_verifikasi }) })
            ] }, k.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: kelompok })
      ] })
    ] })
  ] });
}
export {
  GroupsIndex as default
};
