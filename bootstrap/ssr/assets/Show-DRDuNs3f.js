import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { C as Card } from "./Card-BGeIv_se.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { ArrowLeft, Pencil } from "lucide-react";
import "react";
function WfdShow({ wfd }) {
  var _a, _b, _c;
  const { data, setData, post, processing, errors, reset } = useForm({
    indikator_id: "",
    periode: `${(/* @__PURE__ */ new Date()).getFullYear()}-Q1`,
    jenis_bukti: "Daftar hadir",
    link_mov: ""
  });
  const submitCapaian = (e) => {
    e.preventDefault();
    post(`/wfd/${wfd.id}/capaian`, {
      onSuccess: () => reset()
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `WFD ${wfd.nama_lengkap}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/wfd", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Kembali ke Register WFD"
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: `/wfd/${wfd.id}/edit`,
            className: "inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm text-navy-500 hover:bg-appbg",
            children: [
              /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }),
              " Edit"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(PageHeader, { title: wfd.nama_lengkap, subtitle: `Kode: ${wfd.kode}` }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx(Card, { title: "Informasi Pribadi", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Mitra:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: (_a = wfd.mitra) == null ? void 0 : _a.nama })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Provinsi:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: wfd.provinsi ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Kabupaten:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: wfd.kabupaten ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Desa:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: wfd.desa ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Kelompok Usia:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: wfd.kelompok_usia })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Disabilitas:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: wfd.disabilitas ? "Ya" : "Tidak" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Tahun Bergabung:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: wfd.tahun_bergabung })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Kelompok:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: ((_b = wfd.kelompok) == null ? void 0 : _b.nama) ?? "–" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { title: "Status", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Status Aktif" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(StatusPill, { status: wfd.status_aktif ? "Terverifikasi" : "Belum diverifikasi" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Persetujuan Data" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-medium", children: wfd.persetujuan_data ? "Disetujui" : "Belum disetujui" })
          ] }),
          wfd.catatan && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Catatan" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", children: wfd.catatan })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { title: "Total Capaian", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-teal", children: ((_c = wfd.capaian) == null ? void 0 : _c.length) ?? 0 }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted", children: "catatan capaian terdaftar" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Card, { title: "Riwayat Capaian", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: !wfd.capaian || wfd.capaian.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-muted", children: "Belum ada capaian tercatat." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Indikator" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Periode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Jenis Bukti" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: wfd.capaian.map((c) => {
          var _a2, _b2;
          return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: c.kode }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-muted", children: [
              ((_a2 = c.indikator) == null ? void 0 : _a2.kode) ?? "–",
              " — ",
              ((_b2 = c.indikator) == null ? void 0 : _b2.nama_indikator) ?? "–"
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: c.periode }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: c.jenis_bukti }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(StatusPill, { status: c.status_verifikasi }) })
          ] }, c.id);
        }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Card, { title: "Tambah Capaian Baru", children: /* @__PURE__ */ jsxs("form", { onSubmit: submitCapaian, className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Indikator *" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: data.indikator_id,
                onChange: (e) => setData("indikator_id", e.target.value),
                className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400",
                children: /* @__PURE__ */ jsx("option", { value: "", children: "Pilih indikator…" })
              }
            ),
            errors.indikator_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.indikator_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Periode *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.periode,
                onChange: (e) => setData("periode", e.target.value),
                placeholder: "2026-Q1",
                className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              }
            ),
            errors.periode && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.periode })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Jenis Bukti *" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.jenis_bukti,
                onChange: (e) => setData("jenis_bukti", e.target.value),
                className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Daftar hadir", children: "Daftar hadir" }),
                  /* @__PURE__ */ jsx("option", { value: "Notulensi", children: "Notulensi" }),
                  /* @__PURE__ */ jsx("option", { value: "Dokumentasi foto", children: "Dokumentasi foto" }),
                  /* @__PURE__ */ jsx("option", { value: "SK/BA", children: "SK/BA" }),
                  /* @__PURE__ */ jsx("option", { value: "Sertifikat", children: "Sertifikat" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Link MoV" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: data.link_mov,
                onChange: (e) => setData("link_mov", e.target.value),
                placeholder: "https://…",
                className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "rounded-lg bg-teal px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-50",
            children: "Tambah Capaian"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  WfdShow as default
};
