import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { ArrowLeft } from "lucide-react";
import "react";
function DocumentsCreate({ partners, indicators, kelompok, userMitraId }) {
  const { data, setData, post, processing, errors } = useForm({
    judul: "",
    indikator_id: "",
    jenis_dokumen: "Dokumen perencanaan",
    status_dokumen: "Disusun",
    mitra_id: userMitraId ?? "",
    kelompok_id: "",
    periode: `${(/* @__PURE__ */ new Date()).getFullYear()}-Q1`,
    tahun_lapor: (/* @__PURE__ */ new Date()).getFullYear(),
    tanggal_terbit: "",
    instansi_penerbit: "",
    level_dokumen: "Kabupaten",
    link_mov: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/documents");
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Dokumen" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/documents", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Register Dokumen"
      ] }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: "Tambah Dokumen", subtitle: "Daftarkan dokumen bukti untuk indikator" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Judul *" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.judul, onChange: (e) => setData("judul", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
            errors.judul && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.judul })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Indikator *" }),
              /* @__PURE__ */ jsxs("select", { value: data.indikator_id, onChange: (e) => setData("indikator_id", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Pilih indikator…" }),
                indicators.map((i) => /* @__PURE__ */ jsxs("option", { value: i.id, children: [
                  i.kode,
                  " — ",
                  i.nama_indikator
                ] }, i.id))
              ] }),
              errors.indikator_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.indikator_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Mitra *" }),
              /* @__PURE__ */ jsxs("select", { value: data.mitra_id, onChange: (e) => setData("mitra_id", e.target.value), disabled: !!userMitraId, className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 disabled:bg-appbg", children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Pilih mitra…" }),
                partners.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.nama }, p.id))
              ] }),
              errors.mitra_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.mitra_id })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Jenis Dokumen *" }),
              /* @__PURE__ */ jsxs("select", { value: data.jenis_dokumen, onChange: (e) => setData("jenis_dokumen", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
                /* @__PURE__ */ jsx("option", { value: "Dokumen perencanaan", children: "Dokumen perencanaan" }),
                /* @__PURE__ */ jsx("option", { value: "SK/BA kepengurusan", children: "SK/BA kepengurusan" }),
                /* @__PURE__ */ jsx("option", { value: "Izin/sertifikat", children: "Izin/sertifikat" }),
                /* @__PURE__ */ jsx("option", { value: "MoU/kontrak", children: "MoU/kontrak" }),
                /* @__PURE__ */ jsx("option", { value: "Laporan", children: "Laporan" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Status Dokumen *" }),
              /* @__PURE__ */ jsxs("select", { value: data.status_dokumen, onChange: (e) => setData("status_dokumen", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
                /* @__PURE__ */ jsx("option", { value: "Disusun", children: "Disusun" }),
                /* @__PURE__ */ jsx("option", { value: "Diajukan", children: "Diajukan" }),
                /* @__PURE__ */ jsx("option", { value: "Diadopsi", children: "Diadopsi" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Periode *" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.periode, onChange: (e) => setData("periode", e.target.value), placeholder: "2026-Q1", className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Tahun Lapor *" }),
              /* @__PURE__ */ jsx("input", { type: "number", value: data.tahun_lapor, onChange: (e) => setData("tahun_lapor", parseInt(e.target.value) || (/* @__PURE__ */ new Date()).getFullYear()), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Tanggal Terbit" }),
              /* @__PURE__ */ jsx("input", { type: "date", value: data.tanggal_terbit, onChange: (e) => setData("tanggal_terbit", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Instansi Penerbit" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.instansi_penerbit, onChange: (e) => setData("instansi_penerbit", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Level Dokumen *" }),
              /* @__PURE__ */ jsxs("select", { value: data.level_dokumen, onChange: (e) => setData("level_dokumen", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
                /* @__PURE__ */ jsx("option", { value: "Desa", children: "Desa" }),
                /* @__PURE__ */ jsx("option", { value: "Kabupaten", children: "Kabupaten" }),
                /* @__PURE__ */ jsx("option", { value: "Provinsi", children: "Provinsi" }),
                /* @__PURE__ */ jsx("option", { value: "Nasional", children: "Nasional" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Link MoV" }),
              /* @__PURE__ */ jsx("input", { type: "url", value: data.link_mov, onChange: (e) => setData("link_mov", e.target.value), placeholder: "https://…", className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50", children: "Simpan" }),
          /* @__PURE__ */ jsx(Link, { href: "/documents", className: "rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg", children: "Batal" })
        ] })
      ] })
    ] })
  ] });
}
export {
  DocumentsCreate as default
};
