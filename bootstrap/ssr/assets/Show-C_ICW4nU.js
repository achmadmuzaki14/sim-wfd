import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { ArrowLeft } from "lucide-react";
import { C as Card } from "./Card-BGeIv_se.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
function IndicatorsShow({ indikator, calculation, partnerBreakdown }) {
  const outcomeColors = { 1: "text-outcome1", 2: "text-outcome2", 3: "text-outcome3" };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Indikator ${indikator.kode}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/indicators", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Indikator"
      ] }) }),
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: `Indikator ${indikator.kode}`,
          subtitle: indikator.nama_indikator
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx(Card, { title: "Capaian Kumulatif", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("p", { className: `text-3xl font-bold ${outcomeColors[indikator.outcome] ?? "text-navy-500"}`, children: calculation.capaian_kumulatif }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted", children: [
            "dari target ",
            calculation.target ?? "–",
            " ",
            indikator.unit
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-medium", children: calculation.persentase !== null ? `${calculation.persentase}%` : "–" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(StatusPill, { status: calculation.status }) })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { title: "Capaian per Tahun", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "2025" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: calculation.capaian_2025 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "2026" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: calculation.capaian_2026 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "2027" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: calculation.capaian_2027 })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { title: "Informasi Indikator", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Outcome:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: `font-medium ${outcomeColors[indikator.outcome]}`, children: indikator.outcome })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Output:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: indikator.nomor_output })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Basis hitung:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: indikator.basis_hitung === "OrangUnik" ? "Orang Unik" : "Dokumen" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Satuan:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: indikator.unit })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Card, { title: "Definisi Operasional", children: /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-muted leading-relaxed", children: indikator.definisi_operasional }) }),
      /* @__PURE__ */ jsx(Card, { title: "MoV Wajib", children: /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-muted", children: indikator.mov_wajib }) }),
      /* @__PURE__ */ jsx(Card, { title: "Capaian per Mitra", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Capaian" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Target" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Persentase" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: partnerBreakdown.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-muted", children: "Belum ada data capaian" }) }) : partnerBreakdown.map((row) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: row.mitra_nama }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: row.capaian }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: row.target ?? "–" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: row.persentase !== null ? `${row.persentase}%` : "–" })
        ] }, row.mitra_id)) })
      ] }) }) })
    ] })
  ] });
}
export {
  IndicatorsShow as default
};
