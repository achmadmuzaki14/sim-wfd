import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Target, GitBranch, BarChart3, Users, Package, ShieldCheck, BookOpen, Coins, FileText, Calendar, CheckCircle2, FileSpreadsheet, Settings, History, Bell, User, LogOut } from "lucide-react";
const navSections = [
  {
    title: "MONITORING",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Indikator & Output", href: "/indicators", icon: Target },
      { label: "Pelacak Proses", href: "/processes", icon: GitBranch },
      { label: "Capaian per Mitra", href: "/achievements-by-partner", icon: BarChart3 }
    ]
  },
  {
    title: "REGISTER PROGRAM",
    items: [
      { label: "Kelompok", href: "/groups", icon: Users },
      { label: "Produk & Penjualan", href: "/products-sales", icon: Package },
      { label: "Kebijakan", href: "/policies", icon: ShieldCheck },
      { label: "Learning Stories", href: "/learning-stories", icon: BookOpen },
      { label: "Dana Ungkit", href: "/leverage", icon: Coins }
    ]
  },
  {
    title: "INPUT DATA",
    items: [
      { label: "Register WFD", href: "/wfd", icon: Users },
      { label: "Register Dokumen", href: "/documents", icon: FileText },
      { label: "Register Kegiatan", href: "/activities", icon: Calendar }
    ]
  },
  {
    title: "KUALITAS DATA",
    items: [
      { label: "Antrean Verifikasi", href: "/verification", icon: CheckCircle2, roles: ["admin", "verifikator", "mitra"] },
      { label: "Log DQA", href: "/data-quality", icon: ShieldCheck, roles: ["admin", "verifikator"] },
      { label: "Kepatuhan Laporan", href: "/report-compliance", icon: FileSpreadsheet, roles: ["admin", "verifikator"] }
    ]
  },
  {
    title: "PELAPORAN",
    items: [
      { label: "Laporan & Ekspor", href: "/reports", icon: FileSpreadsheet }
    ]
  },
  {
    title: "ADMINISTRASI",
    items: [
      { label: "Pengguna & Peran", href: "/administration/users", icon: Settings, roles: ["admin"] },
      { label: "Data Referensi", href: "/administration/references", icon: Settings, roles: ["admin"] },
      { label: "Audit Log", href: "/administration/audit-log", icon: History, roles: ["admin"] }
    ]
  }
];
function AppSidebar() {
  var _a;
  const { auth } = usePage().props;
  const userRole = (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.peran;
  const [mobileOpen, setMobileOpen] = useState(false);
  const canAccess = (item) => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setMobileOpen(true),
        className: "fixed left-4 top-4 z-50 rounded-lg bg-navy-500 p-2 text-white lg:hidden",
        "aria-label": "Buka menu",
        children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
      }
    ),
    mobileOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/50 lg:hidden",
        onClick: () => setMobileOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed left-0 top-0 z-40 h-screen w-sidebar overflow-y-auto bg-navy-500 text-white transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-navy-400/30 px-6 py-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold tracking-tight", children: "SIM-WFD" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-navy-100", children: "Women Forest Defenders" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMobileOpen(false),
                className: "rounded p-1 hover:bg-navy-400 lg:hidden",
                "aria-label": "Tutup menu",
                children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "px-3 py-4", children: navSections.map((section) => {
            const visibleItems = section.items.filter(canAccess);
            if (visibleItems.length === 0) return null;
            return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-navy-200", children: section.title }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: visibleItems.map((item) => {
                const Icon = item.icon;
                return /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: item.href,
                    className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-50 transition-colors hover:bg-navy-400/50 [&.active]:bg-navy-400",
                    onClick: () => setMobileOpen(false),
                    children: [
                      /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }),
                      /* @__PURE__ */ jsx("span", { children: item.label })
                    ]
                  },
                  item.href
                );
              }) })
            ] }, section.title);
          }) })
        ]
      }
    )
  ] });
}
function AppTopbar() {
  var _a;
  const { auth } = usePage().props;
  const user = auth == null ? void 0 : auth.user;
  const [menuOpen, setMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-navy-500", children: "Sistem Informasi Monitoring Women Forest Defenders" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "relative rounded-lg p-2 text-muted hover:bg-appbg",
          "aria-label": "Notifikasi",
          children: [
            /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setMenuOpen(!menuOpen),
            className: "flex items-center gap-2 rounded-lg p-2 hover:bg-appbg",
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-navy-500 text-sm font-semibold text-white", children: ((_a = user == null ? void 0 : user.name) == null ? void 0 : _a.charAt(0)) ?? "U" }),
              /* @__PURE__ */ jsxs("div", { className: "hidden text-left sm:block", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-navy-500", children: user == null ? void 0 : user.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted capitalize", children: user == null ? void 0 : user.peran })
              ] })
            ]
          }
        ),
        menuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "fixed inset-0 z-10",
              onClick: () => setMenuOpen(false)
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-border bg-card py-2 shadow-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "border-b border-border px-4 py-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-navy-500", children: user == null ? void 0 : user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: user == null ? void 0 : user.email }),
              (user == null ? void 0 : user.mitra_nama) && /* @__PURE__ */ jsx("p", { className: "text-xs text-teal mt-1", children: user.mitra_nama })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/profile",
                className: "flex items-center gap-2 px-4 py-2 text-sm text-navy-500 hover:bg-appbg",
                children: [
                  /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                  "Profil"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/logout",
                method: "post",
                as: "button",
                className: "flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-50",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                  "Keluar"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function AuthenticatedLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-appbg", children: [
    /* @__PURE__ */ jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxs("div", { className: "lg:pl-sidebar", children: [
      /* @__PURE__ */ jsx(AppTopbar, {}),
      /* @__PURE__ */ jsx("main", { className: "p-4 lg:p-6", children })
    ] })
  ] });
}
export {
  AuthenticatedLayout as A
};
