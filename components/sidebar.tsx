// components/sidebar.tsx
import Link from "next/link";
import { ShieldCheck, Upload, Home, FileText, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
    currentPath?: string
    emailPreview?: React.ReactNode
  }
  

export function Sidebar({ currentPath = "/dashboard", emailPreview }: SidebarProps) {
  const navItems = [
    { href: "/documents", icon: Upload, label: "Upload Documents" },
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/progress", icon: FileText, label: "Progress" },
    // { href: "/messages", icon: MessageSquare, label: "Messages" },
    // { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r rounded-lg shadow-md">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-teal-600 stroke-current fill-none" />
          <h1 className="text-xl font-bold text-teal-600">veyra</h1>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-teal-50 ${
                    isActive ? "text-teal-700 bg-teal-50 font-medium" : "text-gray-700"
                  }`}
                >
                  <Icon className="h-5 w-5 stroke-current fill-none" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Email Preview Section */}
      {emailPreview && (
        <>
          <Separator className="mx-4 py-100 bg-teal-100" />
          <div className="p-4">
            <h3 className="text-sm font-medium text-teal-700 mb-2">Email Preview</h3>
            <ScrollArea className="h-[300px]">{emailPreview}</ScrollArea>
          </div>
        </>
      )}

      <div className="p-4 border-t border-teal-100">
        <Button variant="outline" className="w-full justify-start text-gray-700 border-teal-200 hover:bg-teal-50">
          <LogOut className="h-5 w-5 mr-2 stroke-current fill-none" />
          Log out
        </Button>
      </div>
    </aside>
  )
}
