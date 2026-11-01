import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { ArrowLeft } from "lucide-react";
import "react";
function ActivitiesCreate({ mitraList, userMitraId }) {
  const { data, setData, post, processing, errors } = useForm({
    judul: "",
    jenis_kegiatan: "Pelatihan",
    tanggal_kegiatan: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    mitra_id: userMitraId ?? "",
    provinsi: "",
    level_kegiatan: "Kabupaten",
    peserta_perempuan: 0,
    peserta_laki: 0,
    link_daftar_hadir: "",
    link_dokumentasi: "",
    periode: `${(/* @__PURE__ */ new Date()).getFullYear()}-Q1`,
    tahun_lapor: (/* @__PURE__ */ new Date()).getFullYear()
  });
  const submit = (e) => {
    e.preventDefault();
    post("/activities");
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Kegiatan" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/activities", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Register Kegiatan"
      ] }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: "Tambah Kegiatan", subtitle: "Catat kegiatan yang dilaksanakan" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Judul *" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.judul, onChange: (e) => setData("judul", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
            errors.judul && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.judul })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Jenis Kegiatan *" }),
              /* @__PURE__ */ jsxs("select", { value: data.jenis_kegiatan, onChange: (e) => setData("jenis_kegiatan", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
                /* @__PURE__ */ jsx("option", { value: "Pelatihan", children: "Pelatihan" }),
                /* @__PURE__ */ jsx("option", { value: "Workshop", children: "Workshop" }),
                /* @__PURE__ */ jsx("option", { value: "Dialog kebijakan", children: "Dialog kebijakan" }),
                /* @__PURE__ */ jsx("option", { value: "Patroli/monitoring", children: "Patroli/monitoring" }),
                /* @__PURE__ */ jsx("option", { value: "Sosialisasi", children: "Sosialisasi" }),
                /* @__PURE__ */ jsx("option", { value: "Lainnya", children: "Lainnya" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Mitra *" }),
              /* @__PURE__ */ jsxs("select", { value: data.mitra_id, onChange: (e) => setData("mitra_id", e.target.value), disabled: !!userMitraId, className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 disabled:bg-appbg", children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Pilih mitra…" }),
                mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
              ] }),
              errors.mitra_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.mitra_id })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Tanggal *" }),
              /* @__PURE__ */ jsx("input", { type: "date", value: data.tanggal_kegiatan, onChange: (e) => setData("tanggal_kegiatan", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Periode *" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.periode, onChange: (e) => setData("periode", e.target.value), placeholder: "2026-Q1", className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Level *" }),
              /* @__PURE__ */ jsxs("select", { value: data.level_kegiatan, onChange: (e) => setData("level_kegiatan", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
                /* @__PURE__ */ jsx("option", { value: "Desa", children: "Desa" }),
                /* @__PURE__ */ jsx("option", { value: "Kabupaten", children: "Kabupaten" }),
                /* @__PURE__ */ jsx("option", { value: "Provinsi", children: "Provinsi" }),
                /* @__PURE__ */ jsx("option", { value: "Nasional", children: "Nasional" }),
                /* @__PURE__ */ jsx("option", { value: "Internasional", children: "Internasional" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Peserta Perempuan *" }),
              /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: data.peserta_perempuan, onChange: (e) => setData("peserta_perempuan", parseInt(e.target.value) || 0), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Peserta Laki-laki *" }),
              /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: data.peserta_laki, onChange: (e) => setData("peserta_laki", parseInt(e.target.value) || 0), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Link Daftar Hadir" }),
              /* @__PURE__ */ jsx("input", { type: "url", value: data.link_daftar_hadir, onChange: (e) => setData("link_daftar_hadir", e.target.value), placeholder: "https://…", className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Link Dokumentasi" }),
              /* @__PURE__ */ jsx("input", { type: "url", value: data.link_dokumentasi, onChange: (e) => setData("link_dokumentasi", e.target.value), placeholder: "https://…", className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50", children: "Simpan" }),
          /* @__PURE__ */ jsx(Link, { href: "/activities", className: "rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg", children: "Batal" })
        ] })
      ] })
    ] })
  ] });
}
export {
  ActivitiesCreate as default
};
