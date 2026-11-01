import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BxbqghbO.js";
import { P as PageHeader } from "./PageHeader-C7cFJNlv.js";
import { C as Card } from "./Card-BGeIv_se.js";
import { S as StatusPill } from "./StatusPill-DbCVXjIp.js";
import { ArrowLeft } from "lucide-react";
import "react";
function ProcessesShow({ proses }) {
  var _a, _b;
  const { data, setData, post, processing, errors, reset } = useForm({
    periode: `${(/* @__PURE__ */ new Date()).getFullYear()}-Q1`,
    nomor_tahapan: proses.tahapan_saat_ini + 1,
    nama_tahapan: "",
    perkembangan: "",
    hambatan: "",
    rencana_kuartal_depan: "",
    link_bukti: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(`/processes/${proses.id}/update-quarter`, {
      onSuccess: () => reset()
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Proses ${proses.kode}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { href: "/processes", className: "inline-flex items-center gap-1 text-sm text-muted hover:text-navy-500", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Kembali ke Pelacak Proses"
      ] }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: proses.judul, subtitle: `Kode: ${proses.kode}` }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx(Card, { title: "Informasi Proses", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Indikator:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: ((_a = proses.indikator) == null ? void 0 : _a.kode) ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Mitra:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: ((_b = proses.mitra) == null ? void 0 : _b.nama) ?? "–" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Jenis:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: proses.jenis_proses })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Tahapan:" }),
            " ",
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              proses.tahapan_saat_ini,
              "/",
              proses.total_tahapan
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted", children: "Status:" }),
            " ",
            /* @__PURE__ */ jsx(StatusPill, { status: proses.status_proses })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { title: "Timeline", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 rounded-full bg-appbg h-2", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "rounded-full bg-teal h-2 transition-all",
                style: { width: `${Math.min(100, proses.tahapan_saat_ini / proses.total_tahapan * 100)}%` }
              }
            ) }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-navy-500", children: [
              Math.round(proses.tahapan_saat_ini / proses.total_tahapan * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted", children: [
            "Update terakhir: ",
            proses.periode_update_terakhir ?? "Belum ada"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Card, { title: "Riwayat Update Kuartalan", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: proses.updates.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-muted", children: "Belum ada update kuartalan." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase text-muted", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Periode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tahapan" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Perkembangan" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Hambatan" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Rencana Depan" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: proses.updates.map((u) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border last:border-0", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-navy-500", children: u.periode }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-muted", children: [
            "Tahap ",
            u.nomor_tahapan,
            ": ",
            u.nama_tahapan
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: u.perkembangan }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: u.hambatan ?? "–" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted", children: u.rencana_kuartal_depan ?? "–" })
        ] }, u.id)) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Card, { title: "Update Kuartal Baru", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Periode *" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.periode, onChange: (e) => setData("periode", e.target.value), placeholder: "2026-Q1", className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
            errors.periode && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.periode })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Nomor Tahapan *" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: 1, value: data.nomor_tahapan, onChange: (e) => setData("nomor_tahapan", parseInt(e.target.value) || 1), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
            errors.nomor_tahapan && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.nomor_tahapan })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Nama Tahapan *" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.nama_tahapan, onChange: (e) => setData("nama_tahapan", e.target.value), className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
            errors.nama_tahapan && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.nama_tahapan })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Perkembangan *" }),
          /* @__PURE__ */ jsx("textarea", { value: data.perkembangan, onChange: (e) => setData("perkembangan", e.target.value), rows: 3, className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" }),
          errors.perkembangan && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger", children: errors.perkembangan })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Hambatan" }),
            /* @__PURE__ */ jsx("textarea", { value: data.hambatan, onChange: (e) => setData("hambatan", e.target.value), rows: 2, className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Rencana Kuartal Depan" }),
            /* @__PURE__ */ jsx("textarea", { value: data.rencana_kuartal_depan, onChange: (e) => setData("rencana_kuartal_depan", e.target.value), rows: 2, className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-navy-500", children: "Link Bukti" }),
          /* @__PURE__ */ jsx("input", { type: "url", value: data.link_bukti, onChange: (e) => setData("link_bukti", e.target.value), placeholder: "https://…", className: "mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "rounded-lg bg-teal px-6 py-2 text-sm font-medium text-white hover:bg-teal-600 disabled:opacity-50", children: "Simpan Update" })
      ] }) })
    ] })
  ] });
}
export {
  ProcessesShow as default
};
