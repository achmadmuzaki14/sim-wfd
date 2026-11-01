import { jsx, jsxs } from "react/jsx-runtime";
const colorMap = {
  navy: "#1F3864",
  teal: "#2E9B8F",
  outcome1: "#2F7FBF",
  outcome2: "#3AAE7C",
  outcome3: "#E28A3C",
  danger: "#D9534F",
  warning: "#E8B93B"
};
function KpiCard({ label, value, subtext, color = "navy" }) {
  const borderColor = colorMap[color] ?? colorMap.navy;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "rounded-card border border-border bg-card shadow-sm",
      style: { borderTop: `3px solid ${borderColor}` },
      children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted", children: label }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold text-navy-500", children: value }),
        subtext && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted", children: subtext })
      ] })
    }
  );
}
export {
  KpiCard as K
};
