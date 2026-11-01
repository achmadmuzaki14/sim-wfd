import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
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
function heatColor(persentase) {
  if (persentase === null || persentase === void 0) {
    return "#F4F6F9";
  }
  if (persentase >= 80) {
    return "#3AAE7C";
  }
  if (persentase >= 50) {
    return "#E8B93B";
  }
  if (persentase >= 1) {
    return "#E28A3C";
  }
  return "#FBE9E9";
}
function getPartnerName(partner) {
  const name = partner.mitra_nama ?? partner.nama;
  if (typeof name !== "string" || name.trim() === "") {
    return "Mitra tanpa nama";
  }
  return name.trim();
}
function getPartnerId(partner, fallbackIndex) {
  const id = partner.mitra_id ?? partner.kode_mitra ?? partner.mitra_nama ?? partner.nama;
  if (id === null || id === void 0 || String(id).trim() === "") {
    return `partner-${fallbackIndex}`;
  }
  return String(id);
}
function getPartnerCapaian(partner) {
  if (!partner) {
    return 0;
  }
  const value = partner.capaian ?? partner.jumlah ?? 0;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}
function shortenPartnerName(name) {
  if (name.length <= 10) {
    return name;
  }
  return `${name.substring(0, 8)}…`;
}
function ByPartner({
  heatmap,
  periodFilter
}) {
  const rows = Array.isArray(heatmap) ? heatmap : [];
  const partnerMap = /* @__PURE__ */ new Map();
  rows.forEach((row) => {
    const partners = Array.isArray(row.partners) ? row.partners : [];
    partners.forEach((partner, index) => {
      const id = getPartnerId(partner, index);
      if (!partnerMap.has(id)) {
        partnerMap.set(id, {
          id,
          nama: getPartnerName(partner)
        });
      }
    });
  });
  const allPartners = Array.from(partnerMap.values());
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Capaian per Mitra" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Capaian per Mitra",
          subtitle: "Heatmap capaian indikator per mitra organisasi"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: periodOptions.map((option) => /* @__PURE__ */ jsx(
        "a",
        {
          href: `/achievements-by-partner?periode=${option.value}`,
          className: `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${periodFilter === option.value ? "bg-navy-500 text-white" : "border border-border bg-card text-muted hover:bg-appbg"}`,
          children: option.label
        },
        option.value
      )) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-card border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
          /* @__PURE__ */ jsx("th", { className: "sticky left-0 bg-card px-4 py-3", children: "Indikator" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Total" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Target" }),
          allPartners.map((partner) => /* @__PURE__ */ jsx(
            "th",
            {
              className: "px-4 py-3 text-center",
              title: partner.nama,
              children: shortenPartnerName(partner.nama)
            },
            partner.id
          ))
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: 3 + allPartners.length,
            className: "px-4 py-10 text-center text-muted",
            children: "Belum ada data capaian per mitra."
          }
        ) }) : rows.map((row) => {
          const rowPartners = Array.isArray(
            row.partners
          ) ? row.partners : [];
          const rowPartnerMap = /* @__PURE__ */ new Map();
          rowPartners.forEach(
            (partner, index) => {
              rowPartnerMap.set(
                getPartnerId(
                  partner,
                  index
                ),
                partner
              );
            }
          );
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-appbg",
              children: [
                /* @__PURE__ */ jsxs("td", { className: "sticky left-0 bg-card px-4 py-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-navy-500", children: row.kode }),
                  /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs text-muted", children: row.nama_indikator })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-semibold", children: row.capaian_periode }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: row.target ?? "–" }),
                allPartners.map(
                  (partner) => {
                    const cell = rowPartnerMap.get(
                      partner.id
                    );
                    return /* @__PURE__ */ jsx(
                      "td",
                      {
                        className: "px-4 py-3 text-center",
                        style: {
                          backgroundColor: heatColor(
                            cell == null ? void 0 : cell.persentase
                          )
                        },
                        title: partner.nama,
                        children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: getPartnerCapaian(
                          cell
                        ) })
                      },
                      partner.id
                    );
                  }
                )
              ]
            },
            row.indikator_id
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-muted", children: [
        /* @__PURE__ */ jsx("span", { children: "Legend:" }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block h-3 w-3 rounded",
              style: { backgroundColor: "#3AAE7C" }
            }
          ),
          "≥80%"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block h-3 w-3 rounded",
              style: { backgroundColor: "#E8B93B" }
            }
          ),
          "50–79%"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block h-3 w-3 rounded",
              style: { backgroundColor: "#E28A3C" }
            }
          ),
          "1–49%"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block h-3 w-3 rounded",
              style: { backgroundColor: "#FBE9E9" }
            }
          ),
          "0%"
        ] })
      ] })
    ] })
  ] });
}
export {
  ByPartner as default
};
