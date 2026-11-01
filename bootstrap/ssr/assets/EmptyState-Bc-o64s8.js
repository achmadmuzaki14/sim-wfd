import { jsxs, jsx } from "react/jsx-runtime";
function EmptyState({ title, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-navy-500", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted", children: description })
  ] });
}
export {
  EmptyState as E
};
