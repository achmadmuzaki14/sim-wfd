import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { C as Card } from "./Card-BGeIv_se.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
import "lucide-react";
function AdministrationReferences({ indikators, mitra, tahapan, settings }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Data Referensi" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(PageHeader, { title: "Data Referensi", subtitle: "Kelola indikator, mitra, tahapan, dan pengaturan" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsx(Card, { title: `Indikator (${indikators.length})`, children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Outcome" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Basis" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Aktif" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: indikators.map((i) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: i.kode }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-muted", children: [
              "O",
              i.outcome,
              " · Output ",
              i.nomor_output
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: i.basis_hitung === "OrangUnik" ? "Orang Unik" : "Dokumen" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `text-xs ${i.aktif ? "text-teal font-medium" : "text-danger"}`, children: i.aktif ? "Aktif" : "Non-aktif" }) })
          ] }, i.id)) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { title: `Mitra (${mitra.length})`, children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Provinsi" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Aktif" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: mitra.map((m) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: m.kode_mitra }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: m.nama }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: m.provinsi }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `text-xs ${m.aktif ? "text-teal font-medium" : "text-danger"}`, children: m.aktif ? "Aktif" : "Non-aktif" }) })
          ] }, m.id)) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { title: `Tahapan Proses (${tahapan.length})`, children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-96 overflow-y-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Jenis Proses" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "No." }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tahapan" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Final" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: tahapan.map((t) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: t.jenis_proses }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: t.nomor_tahapan }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-navy-500", children: t.nama_tahapan }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: t.tahapan_final ? /* @__PURE__ */ jsx(StatusPill, { status: "Selesai" }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: "–" }) })
          ] }, t.id)) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { title: `Pengaturan Aplikasi (${settings.length})`, children: /* @__PURE__ */ jsx("div", { className: "p-4 space-y-3", children: settings.map((s) => /* @__PURE__ */ jsxs("div", { className: "border-b border-border last:border-0 pb-3 last:pb-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted", children: s.key }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-navy-500", children: typeof s.value === "string" ? s.value : JSON.stringify(s.value) })
        ] }, s.id)) }) })
      ] })
    ] })
  ] });
}
export {
  AdministrationReferences as default
};
