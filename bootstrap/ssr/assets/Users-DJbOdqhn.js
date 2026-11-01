import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { P as Pagination } from "./Pagination-BxkALEMm.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import "react";
import "lucide-react";
const roleLabels = {
  admin: "Admin",
  verifikator: "Verifikator",
  mitra: "Mitra",
  peninjau: "Peninjau"
};
function AdministrationUsers({ users, filters, mitraList }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pengguna & Peran" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Pengguna & Peran", subtitle: "Kelola akun pengguna sistem" }),
      /* @__PURE__ */ jsxs("form", { method: "GET", action: "/administration/users", className: "flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:flex-wrap", children: [
        /* @__PURE__ */ jsx("input", { type: "text", name: "search", defaultValue: filters.search, placeholder: "Cari nama atau email…", className: "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600", children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: users.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada pengguna" }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Email" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Peran" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Terverifikasi" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: users.data.map((u) => {
            var _a, _b, _c, _d;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: u.name }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: u.email }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: "rounded-md bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-500", children: u.profile ? roleLabels[u.profile.peran] ?? u.profile.peran : "–" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ((_b = (_a = u.profile) == null ? void 0 : _a.mitra) == null ? void 0 : _b.nama) ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${((_c = u.profile) == null ? void 0 : _c.aktif) ? "text-teal" : "text-danger"}`, children: ((_d = u.profile) == null ? void 0 : _d.aktif) ? "Aktif" : "Non-aktif" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: u.email_verified_at ? "Ya" : "Belum" })
            ] }, u.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { data: users })
      ] })
    ] })
  ] });
}
export {
  AdministrationUsers as default
};
