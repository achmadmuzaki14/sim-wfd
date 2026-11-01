import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { ArrowLeft } from "lucide-react";
import "react";
function WfdCreate({ partners, indicators, kelompok, userMitraId }) {
  const { data, setData, post, processing, errors } = useForm({
    nama_lengkap: "",
    mitra_id: userMitraId ?? "",
    provinsi: "",
    kabupaten: "",
    desa: "",
    kelompok_id: "",
    kelompok_usia: "25-44",
    disabilitas: false,
    tahun_bergabung: (/* @__PURE__ */ new Date()).getFullYear(),
    persetujuan_data: true,
    catatan: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/wfd");
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah WFD" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/wfd", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Register WFD"
      ] }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: "Tambah WFD", subtitle: "Daftarkan peserta baru Women Forest Defenders" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-border bg-card p-4 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Nama Lengkap *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.nama_lengkap,
                onChange: (e) => setData("nama_lengkap", e.target.value),
                className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              }
            ),
            errors.nama_lengkap && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.nama_lengkap })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Mitra *" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.mitra_id,
                  onChange: (e) => setData("mitra_id", e.target.value),
                  disabled: !!userMitraId,
                  className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 disabled:bg-appbg",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Pilih mitra…" }),
                    partners.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.nama }, p.id))
                  ]
                }
              ),
              errors.mitra_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.mitra_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Kelompok Usia *" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.kelompok_usia,
                  onChange: (e) => setData("kelompok_usia", e.target.value),
                  className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "18-24", children: "18-24" }),
                    /* @__PURE__ */ jsx("option", { value: "25-44", children: "25-44" }),
                    /* @__PURE__ */ jsx("option", { value: "45-59", children: "45-59" }),
                    /* @__PURE__ */ jsx("option", { value: "60+", children: "60+" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Provinsi" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.provinsi,
                  onChange: (e) => setData("provinsi", e.target.value),
                  className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Kabupaten" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.kabupaten,
                  onChange: (e) => setData("kabupaten", e.target.value),
                  className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Desa" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.desa,
                  onChange: (e) => setData("desa", e.target.value),
                  className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Kelompok" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.kelompok_id,
                  onChange: (e) => setData("kelompok_id", e.target.value),
                  className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Tidak terikat kelompok" }),
                    kelompok.map((k) => /* @__PURE__ */ jsx("option", { value: k.id, children: k.nama }, k.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Tahun Bergabung *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: data.tahun_bergabung,
                  onChange: (e) => setData("tahun_bergabung", parseInt(e.target.value) || (/* @__PURE__ */ new Date()).getFullYear()),
                  className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-navy-500", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.disabilitas,
                  onChange: (e) => setData("disabilitas", e.target.checked),
                  className: "rounded border-border"
                }
              ),
              "Disabilitas"
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-navy-500", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.persetujuan_data,
                  onChange: (e) => setData("persetujuan_data", e.target.checked),
                  className: "rounded border-border"
                }
              ),
              "Persetujuan pengolahan data"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Catatan" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.catatan,
                onChange: (e) => setData("catatan", e.target.value),
                rows: 3,
                className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "rounded-lg bg-navy-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-600 disabled:opacity-50",
              children: "Simpan"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/wfd",
              className: "rounded-lg border border-border px-6 py-2 text-sm font-medium text-muted hover:bg-appbg",
              children: "Batal"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  WfdCreate as default
};
