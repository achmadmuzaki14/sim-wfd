import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import "react";
import "lucide-react";
const periodOptions = [
  { label: "Kumulatif", value: "ALL" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "Q1 '26", value: "2026-Q1" },
  { label: "Q2 '26", value: "2026-Q2" },
  { label: "Q3 '26", value: "2026-Q3" },
  { label: "Q4 '26", value: "2026-Q4" }
];
function IndicatorsIndex({ indicators, periodFilter }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Indikator & Output" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Indikator & Output",
          subtitle: "12 indikator kinerja program WFD dengan perhitungan otomatis"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: periodOptions.map((opt) => /* @__PURE__ */ jsx(
        "a",
        {
          href: `/indicators?periode=${opt.value}`,
          className: `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${periodFilter === opt.value ? "bg-navy-500 text-white" : "bg-card border border-border text-muted hover:bg-appbg"}`,
          children: opt.label
        },
        opt.value
      )) }),
      /* @__PURE__ */ jsx("div", { className: "rounded-card border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Indikator" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Basis" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "2025" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "2026" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "2027" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Kumulatif" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Target" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Progres" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: indicators.map((ind) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-appbg cursor-pointer",
            onClick: () => {
              const el = document.querySelector(`a[data-kode="${ind.kode}"]`);
              el == null ? void 0 : el.click();
            },
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: ind.kode }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-muted", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    "data-kode": ind.kode,
                    href: `/indicators?periode=${periodFilter}`,
                    className: "hidden"
                  }
                ),
                ind.nama_indikator
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs text-muted", children: ind.basis_hitung === "OrangUnik" ? "Orang Unik" : "Dokumen" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.capaian_2025 }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.capaian_2026 }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.capaian_2027 }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-semibold", children: ind.capaian_kumulatif }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.target ?? "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.persentase !== null ? `${ind.persentase}%` : "–" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: ind.status }) })
            ]
          },
          ind.kode
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  IndicatorsIndex as default
};
