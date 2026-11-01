import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { E as EmptyState } from "./EmptyState-Bc-o64s8.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { CheckCircle2, RotateCcw } from "lucide-react";
import "react";
function VerificationIndex({ queue, canVerify }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Antrean Verifikasi" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(
        PageHeader,
        {
          title: "Antrean Verifikasi",
          subtitle: `${queue.length} item menunggu verifikasi`
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "rounded-card border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: queue.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada item menunggu verifikasi", description: "Semua data telah terverifikasi." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tipe" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Indikator" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Mitra" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Periode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
          canVerify && /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: queue.map((item) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-appbg", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `rounded-md px-2 py-0.5 text-xs font-medium ${item.type === "capaian" ? "bg-navy-50 text-navy-500" : "bg-teal-50 text-teal"}`, children: item.type === "capaian" ? "Capaian" : "Dokumen" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: item.kode }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: item.indikator ?? "–" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: item.mitra ?? "–" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: item.periode }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: item.status_verifikasi }) }),
          canVerify && /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsx("form", { action: `/verification/${item.type}/${item.id}/approve`, method: "POST", className: "inline", children: /* @__PURE__ */ jsxs("button", { type: "submit", className: "inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-200", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }),
              " Setujui"
            ] }) }),
            /* @__PURE__ */ jsx("form", { action: `/verification/${item.type}/${item.id}/return`, method: "POST", className: "inline", children: /* @__PURE__ */ jsxs("button", { type: "submit", className: "inline-flex items-center gap-1 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-200", children: [
              /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
              " Kembalikan"
            ] }) })
          ] }) })
        ] }, `${item.type}-${item.id}`)) })
      ] }) }) })
    ] })
  ] });
}
export {
  VerificationIndex as default
};
