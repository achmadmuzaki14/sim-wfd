import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { C as Card } from "./Card-BGeIv_se.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { ArrowLeft, ExternalLink } from "lucide-react";
import "react";
function DocumentsShow({ dokumen }) {
  var _a, _b;
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Dokumen ${dokumen.kode}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/documents", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Register Dokumen"
      ] }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: dokumen.judul, subtitle: `Kode: ${dokumen.kode}` }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx(Card, { title: "Informasi Dokumen", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Indikator:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: ((_a = dokumen.indikator) == null ? void 0 : _a.kode) ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Mitra:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: ((_b = dokumen.mitra) == null ? void 0 : _b.nama) ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Jenis:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: dokumen.jenis_dokumen })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Level:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: dokumen.level_dokumen })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Periode:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: dokumen.periode })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Tahun Lapor:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: dokumen.tahun_lapor })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { title: "Status", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Status Dokumen" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(StatusPill, { status: dokumen.status_dokumen }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Status Verifikasi" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(StatusPill, { status: dokumen.status_verifikasi }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { title: "Penerbit & MoV", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Tanggal Terbit:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: dokumen.tanggal_terbit ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Instansi:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: dokumen.instansi_penerbit ?? "–" })
          ] }),
          dokumen.link_mov && /* @__PURE__ */ jsxs("a", { href: dokumen.link_mov, target: "_blank", rel: "noopener noreferrer", className: "mt-2 inline-flex items-center gap-1 text-sm text-teal hover:text-teal-600", children: [
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }),
            " Lihat MoV"
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  DocumentsShow as default
};
