import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { K as KpiCard } from "./KpiCard-ChL45zL7.js";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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
function DashboardIndex() {
  const props = usePage().props;
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-card bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider opacity-80", children: "GOAL PROGRAM" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed", children: props.programGoal })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-card border-l-4 border-outcome1 bg-outcome1/5 p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-outcome1", children: "⇢ Logika berjenjang antar-outcome" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-navy-500", children: props.causalLogic })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: periodOptions.map((opt) => /* @__PURE__ */ jsx(
        "a",
        {
          href: `/dashboard?periode=${opt.value}`,
          className: `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${props.periodFilter === opt.value ? "bg-navy-500 text-white" : "bg-card border border-border text-muted hover:bg-appbg"}`,
          children: opt.label
        },
        opt.value
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: props.kpiCards.map((card, i) => /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: card.label,
          value: card.value,
          subtext: card.subtext,
          color: card.color
        },
        i
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: props.outcomeCards.map((card) => {
        const chartData = [
          { name: "Capaian", value: card.capaian, color: card.color },
          { name: "Sisa", value: Math.max(0, card.target - card.capaian), color: "#E3E8EF" }
        ];
        return /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs font-medium text-muted", children: [
                "Outcome ",
                card.outcome
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-navy-500", children: card.name })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-20 w-20", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(Pie, { data: chartData, dataKey: "value", innerRadius: 24, outerRadius: 36, paddingAngle: 2, children: chartData.map((entry, idx) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, idx)) }) }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", style: { color: card.color }, children: card.capaian }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted", children: [
              "/ ",
              card.target
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "ml-auto text-sm font-medium", style: { color: card.color }, children: [
              card.persentase,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1", children: card.outputs.map((out) => /* @__PURE__ */ jsxs("span", { className: "rounded-md bg-appbg px-2 py-0.5 text-xs text-muted", children: [
            "Output ",
            out.output,
            ": ",
            out.capaian
          ] }, out.output)) })
        ] }, card.outcome);
      }) }),
      /* @__PURE__ */ jsx("div", { className: "rounded-card border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Indikator" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "2025" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "2026" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "2027" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Kumulatif" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Target" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Progres" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: props.indicators.map((ind) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: ind.kode }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: ind.nama_indikator }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.capaian_2025 }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.capaian_2026 }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.capaian_2027 }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-semibold", children: ind.capaian_kumulatif }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.target ?? "–" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: ind.persentase !== null ? `${ind.persentase}%` : "–" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: ind.status }) })
        ] }, ind.kode)) })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy-500", children: "Jangkauan Kegiatan" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg bg-warning/10 p-3 text-xs text-warning", children: [
            "⚠ ",
            props.outreach.warning
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Kegiatan:" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.outreach.totalActivities })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Hadir P:" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.outreach.femaleAttendance })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Sekutu (L):" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.outreach.maleAttendance })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Total:" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.outreach.totalAttendance })
            ] })
          ] }),
          !props.isPeninjau && /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-teal/30 bg-teal/5 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "WFD unik terverifikasi" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-teal", children: props.outreach.uniqueWfd })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy-500", children: "Kualitas Data" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "WFD menunggu verifikasi" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.dataQuality.wfdMenunggu })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "WFD perlu klarifikasi" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.dataQuality.wfdPerluKlarifikasi })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Dokumen menunggu verifikasi" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.dataQuality.dokumenMenunggu })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Isu DQA terbuka" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.dataQuality.isuDqaTerbuka })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Capaian tanpa MoV" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.dataQuality.capaianTanpaMov })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Proses macet" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: props.dataQuality.prosesMacet })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardIndex as default
};
