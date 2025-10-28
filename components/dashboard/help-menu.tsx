"use client"

import { HelpCircle, Book, Keyboard, LifeBuoy, Info } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export function HelpMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Help menu"
        >
          <HelpCircle className="w-5 h-5 text-slate-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() =>
            toast.info("Tutorial Coming Soon", {
              description: "Interactive tutorial will be available soon",
            })
          }
        >
          <Book className="w-4 h-4 mr-2" />
          View Tutorial
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast.info("Keyboard Shortcuts", {
              description: "Cmd/Ctrl+K for search, Esc to close modals",
            })
          }
        >
          <Keyboard className="w-4 h-4 mr-2" />
          Keyboard Shortcuts
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast.info("Contact Support", {
              description: "Email: support@businesssupportpro.com",
            })
          }
        >
          <LifeBuoy className="w-4 h-4 mr-2" />
          Contact Support
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast.info("About", {
              description: "Business Support Pro v1.0.0 - Demo Build",
            })
          }
        >
          <Info className="w-4 h-4 mr-2" />
          About
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
