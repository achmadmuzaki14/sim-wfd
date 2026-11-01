import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { ArrowLeft } from "lucide-react";
import "react";
const jenisProsesOptions = [
  "Advokasi Kebijakan",
  "Penguatan Kelembagaan",
  "Dokumen Perencanaan",
  "Legalitas Produk",
  "Akses Pasar",
  "Pengembangan Produk",
  "Peningkatan Kapasitas"
];
function ProcessesCreate({ indicators, mitraList, userMitraId }) {
  const { data, setData, post, processing, errors } = useForm({
    judul: "",
    indikator_id: "",
    mitra_id: userMitraId ?? "",
    jenis_proses: "Advokasi Kebijakan",
    total_tahapan: 5
  });
  const submit = (e) => {
    e.preventDefault();
    post("/processes");
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Proses" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/processes", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Pelacak Proses"
      ] }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: "Tambah Proses", subtitle: "Buat pelacak proses baru" }),
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
                mitraList.map((m) => /* @__PURE__ */ jsx("option", { value: m.id, children: m.nama }, m.id))
              ] }),
              errors.mitra_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.mitra_id })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Jenis Proses *" }),
              /* @__PURE__ */ jsx("select", { value: data.jenis_proses, onChange: (e) => setData("jenis_proses", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: jenisProsesOptions.map((j) => /* @__PURE__ */ jsx("option", { value: j, children: j }, j)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Total Tahapan *" }),
              /* @__PURE__ */ jsx("input", { type: "number", min: 1, max: 20, value: data.total_tahapan, onChange: (e) => setData("total_tahapan", parseInt(e.target.value) || 1), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
              errors.total_tahapan && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.total_tahapan })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50", children: "Simpan" }),
          /* @__PURE__ */ jsx(Link, { href: "/processes", className: "rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg", children: "Batal" })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProcessesCreate as default
};
