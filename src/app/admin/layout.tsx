// app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Warehouses", href: "/admin/warehouses" },
  { label: "Deliver Persons", href: "/admin/deliver-persons" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Inventories", href: "/admin/inventories" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-white flex flex-col">
        {/* Company name */}
        <div className="h-16 flex items-center px-6 border-b">
          <span className="font-semibold text-lg tracking-tight">Choco Inc</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-2 text-sm text-gray-700 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              href={item.href}
              active={
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href)
              }
            />
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b bg-white flex items-center px-4 md:px-6 gap-4">
          <div className="flex-1 max-w-xl">
            <h2>You are an admin</h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </header>

        {/* Page content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

type NavItemProps = {
  label: string;
  href: string;
  active?: boolean;
};

function NavItem({ label, href, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 md:px-6 py-2.5 whitespace-nowrap text-left hover:bg-gray-50 ${
        active
          ? "font-medium text-gray-900 bg-gray-100 md:border-l-2 md:border-gray-900"
          : "text-gray-600"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-gray-300" />
      <span>{label}</span>
    </Link>
  );
}

export default AdminLayout;
