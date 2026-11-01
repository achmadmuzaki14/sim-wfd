import { jsxs, jsx } from "react/jsx-runtime";
function Card({ title, children, actions, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-card border border-border bg-card shadow-sm ${className}`, children: [
    title && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-navy-500", children: title }),
      actions
    ] }),
    children
  ] });
}
export {
  Card as C
};
