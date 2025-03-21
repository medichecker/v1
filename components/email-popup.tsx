"use client"

import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Email {
  id: number
  subject: string
  sender: string
  recipient: string
  date: string
  content: string
  status?: "sent" | "received"
}

interface EmailPopupProps {
    email: Email | null;
    onClose: () => void;
    onViewDetails?: (email: Email) => void;
    onPreview?: (email: Email) => void;
  }

  export function EmailPopup({ email, onClose, onViewDetails, onPreview }: EmailPopupProps) {
  if (!email) return null

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between bg-teal-50/50 py-3">
        <CardTitle className="text-sm font-medium text-teal-700">Email Preview</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[300px] pr-3">
          <div className="space-y-2">
            <h4 className="font-medium text-teal-700">{email.subject}</h4>
            <div className="text-xs text-gray-600">
              <p>
                <span className="font-medium">From:</span> {email.sender}
              </p>
              <p>
                <span className="font-medium">To:</span> {email.recipient}
              </p>
              <p>
                <span className="font-medium">Date:</span> {email.date}
              </p>
            </div>
            <Separator className="bg-teal-100" />
            <div className="text-xs whitespace-pre-line">{email.content}</div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

