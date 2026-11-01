import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function Pagination({
  data
}) {
  if (!data || data.last_page <= 1) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
      "Menampilkan ",
      data.from ?? 0,
      "–",
      data.to ?? 0,
      " dari",
      " ",
      data.total,
      " data"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      data.prev_page_url ? /* @__PURE__ */ jsx(
        Link,
        {
          href: data.prev_page_url,
          preserveScroll: true,
          preserveState: true,
          className: "rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50",
          children: "Sebelumnya"
        }
      ) : /* @__PURE__ */ jsx("span", { className: "cursor-not-allowed rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400", children: "Sebelumnya" }),
      /* @__PURE__ */ jsxs("span", { className: "px-2 text-sm text-gray-600", children: [
        "Hal. ",
        data.current_page,
        " / ",
        data.last_page
      ] }),
      data.next_page_url ? /* @__PURE__ */ jsx(
        Link,
        {
          href: data.next_page_url,
          preserveScroll: true,
          preserveState: true,
          className: "rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50",
          children: "Berikutnya"
        }
      ) : /* @__PURE__ */ jsx("span", { className: "cursor-not-allowed rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400", children: "Berikutnya" })
    ] })
  ] });
}
export {
  Pagination as P
};
