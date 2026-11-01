import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { ArrowLeft } from "lucide-react";
import "react";
function GroupsCreate({ mitraList, userMitraId }) {
  const { data, setData, post, processing, errors } = useForm({
    nama: "",
    tipe: "KUPS",
    mitra_id: userMitraId ?? "",
    provinsi: "",
    desa: "",
    luas_hektar: "",
    anggota_perempuan: 0,
    anggota_laki: 0,
    dipimpin_perempuan: true,
    periode: `${(/* @__PURE__ */ new Date()).getFullYear()}-Q1`
  });
  const submit = (e) => {
    e.preventDefault();
    post("/groups");
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Kelompok" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/groups", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Kelompok"
      ] }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: "Tambah Kelompok", subtitle: "Daftarkan kelompok baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Nama Kelompok *" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.nama, onChange: (e) => setData("nama", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
            errors.nama && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.nama })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Tipe *" }),
              /* @__PURE__ */ jsxs("select", { value: data.tipe, onChange: (e) => setData("tipe", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400", children: [
                /* @__PURE__ */ jsx("option", { value: "Kelompok Monitoring Hutan", children: "Kelompok Monitoring Hutan" }),
                /* @__PURE__ */ jsx("option", { value: "KPS", children: "KPS" }),
                /* @__PURE__ */ jsx("option", { value: "KUPS", children: "KUPS" })
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
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Provinsi" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.provinsi, onChange: (e) => setData("provinsi", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Desa" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.desa, onChange: (e) => setData("desa", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Luas (hektar)" }),
              /* @__PURE__ */ jsx("input", { type: "number", step: "0.01", value: data.luas_hektar, onChange: (e) => setData("luas_hektar", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Anggota Perempuan" }),
              /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: data.anggota_perempuan, onChange: (e) => setData("anggota_perempuan", parseInt(e.target.value) || 0), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Anggota Laki-laki" }),
              /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: data.anggota_laki, onChange: (e) => setData("anggota_laki", parseInt(e.target.value) || 0), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-navy-500", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.dipimpin_perempuan, onChange: (e) => setData("dipimpin_perempuan", e.target.checked), className: "rounded border-border" }),
            "Dipimpin oleh perempuan"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50", children: "Simpan" }),
          /* @__PURE__ */ jsx(Link, { href: "/groups", className: "rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg", children: "Batal" })
        ] })
      ] })
    ] })
  ] });
}
export {
  GroupsCreate as default
};
