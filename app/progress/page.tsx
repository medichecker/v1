"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageSquare, Mail, ArrowRight, Reply, Forward, Calendar, User, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sidebar } from "@/components/sidebar"

// Email interface
interface Email {
  id: number
  subject: string
  sender: string
  recipient: string
  date: string
  content: string
  status?: "sent" | "received"
}

// Email card props
interface EmailCardProps {
  email: Email
  onViewDetails: (email: Email) => void
  onPreview: (email: Email | null) => void
}

// Email card component
function EmailCard({ email, onViewDetails, onPreview }: EmailCardProps) {
  return (
    <div
      className="p-4 hover:bg-teal-50/50 transition-colors"
      onMouseEnter={() => onPreview(email)}
      onMouseLeave={() => onPreview(null)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant={email.status === "sent" ? "default" : "secondary"}
              className={`text-xs ${email.status === "sent" ? "bg-teal-600" : "bg-gray-600"}`}
            >
              {email.status === "sent" ? "Sent" : "Received"}
            </Badge>
            <h3 className="font-medium text-sm sm:text-base truncate">{email.subject}</h3>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-1 sm:gap-3">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className="truncate">{email.sender}</span>
            </div>
            <ArrowRight className="hidden sm:block h-3 w-3" />
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span className="truncate">{email.recipient}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-gray-500 whitespace-nowrap">{email.date}</span>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 border-teal-200 text-teal-700 hover:bg-teal-50"
            onClick={() => onViewDetails(email)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main component
export default function EmailTracker() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [previewEmail, setPreviewEmail] = useState<Email | null>(null)

  // Sample emails data
  const emails: Email[] = [
    {
      id: 1,
      subject: "Initial Billing Inquiry",
      sender: "Your Startup",
      recipient: "Memorial Hospital Billing",
      date: "2023-02-01",
      content:
        "Dear Memorial Hospital Billing Department,\n\nI am writing on behalf of our client regarding invoice #MH-29384 dated January 15, 2023. We have identified several potential billing errors that we would like to discuss.\n\nOur review indicates that the charges for the MRI procedure (code 70553) appear to be significantly higher than the Medicare allowable rate. Additionally, there seems to be a duplicate charge for the initial consultation.\n\nCould we schedule a time to review these discrepancies?\n\nThank you for your assistance,\nYour Startup Team",
      status: "sent",
    },
    {
      id: 2,
      subject: "Re: Initial Billing Inquiry",
      sender: "Memorial Hospital Billing",
      recipient: "Your Startup",
      date: "2023-02-05",
      content:
        "Dear Your Startup Team,\n\nThank you for your inquiry regarding invoice #MH-29384. We have received your request and will review the charges you've mentioned.\n\nOur billing specialist will need approximately 5-7 business days to conduct a thorough review of the account. Once completed, we will contact you to discuss our findings.\n\nPlease let us know if you have any additional questions in the meantime.\n\nRegards,\nJennifer Smith\nBilling Department\nMemorial Hospital",
      status: "received",
    },
    {
      id: 3,
      subject: "Follow-up on Billing Review",
      sender: "Your Startup",
      recipient: "Memorial Hospital Billing",
      date: "2023-02-15",
      content:
        "Dear Jennifer,\n\nI'm following up on our previous correspondence regarding invoice #MH-29384. It has been 10 business days since our initial inquiry, and we haven't received an update on the billing review.\n\nOur client is anxious to resolve this matter. Could you please provide a status update on the review process?\n\nThank you for your attention to this matter.\n\nBest regards,\nYour Startup Team",
      status: "sent",
    },
    {
      id: 4,
      subject: "Billing Adjustment Confirmation",
      sender: "Memorial Hospital Billing",
      recipient: "Your Startup",
      date: "2023-02-18",
      content:
        "Dear Your Startup Team,\n\nWe have completed our review of invoice #MH-29384 and have identified the billing errors you mentioned. You were correct about the MRI procedure being charged above the Medicare allowable rate and the duplicate consultation charge.\n\nWe have adjusted the invoice accordingly, reducing the total amount by $3,245.00. The revised invoice will be sent to your client directly within the next 48 hours.\n\nWe apologize for the inconvenience and thank you for bringing this to our attention.\n\nSincerely,\nJennifer Smith\nBilling Department\nMemorial Hospital",
      status: "received",
    },
    {
      id: 5,
      subject: "Confirmation of Revised Invoice Receipt",
      sender: "Your Startup",
      recipient: "Memorial Hospital Billing",
      date: "2023-02-22",
      content:
        "Dear Jennifer,\n\nWe are writing to confirm that our client has received the revised invoice reflecting the adjustments discussed. We appreciate your thorough review and prompt resolution of this matter.\n\nThank you for your cooperation and professionalism throughout this process.\n\nBest regards,\nYour Startup Team",
      status: "sent",
    },
  ]

  const handleViewDetails = (email: Email) => {
    setSelectedEmail(email)
    setOpenDialog(true)
  }

  // Create email preview content
  const emailPreviewContent = previewEmail ? (
    <div className="space-y-2 p-1">
      <h4 className="font-medium text-teal-700">{previewEmail.subject}</h4>
      <div className="text-xs text-gray-600">
        <p>
          <span className="font-medium">From:</span> {previewEmail.sender}
        </p>
        <p>
          <span className="font-medium">To:</span> {previewEmail.recipient}
        </p>
        <p>
          <span className="font-medium">Date:</span> {previewEmail.date}
        </p>
      </div>
      <Separator className="bg-teal-100" />
      <div className="text-xs whitespace-pre-line">
        {previewEmail.content.substring(0, 200)}
        {previewEmail.content.length > 200 && "..."}
      </div>
      <Button
        size="sm"
        variant="outline"
        className="w-full mt-2 text-xs border-teal-200 text-teal-700 hover:bg-teal-50"
        onClick={() => handleViewDetails(previewEmail)}
      >
        View Full Email
      </Button>
    </div>
  ) : null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath="/email-tracker" emailPreview={emailPreviewContent} />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-white border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-teal-600" />
                  <h2 className="text-xl font-bold text-teal-700">Email Communications</h2>
                </div>
                <Badge variant="outline" className="bg-white text-teal-700 border-teal-200">
                  {emails.length} Messages
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="divide-y">
                  {emails.map((email) => (
                    <EmailCard
                      key={email.id}
                      email={email}
                      onViewDetails={handleViewDetails}
                      onPreview={setPreviewEmail}
                    />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedEmail && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-teal-600" />
                Email Details
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div className="bg-teal-50/50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium mb-2 text-teal-800">{selectedEmail.subject}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-teal-600" />
                        <span className="text-teal-700">From:</span>
                      </div>
                      <p className="font-medium pl-6">{selectedEmail.sender}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-teal-600" />
                        <span className="text-teal-700">To:</span>
                      </div>
                      <p className="font-medium pl-6">{selectedEmail.recipient}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <span className="text-teal-700">Date:</span>
                      </div>
                      <p className="font-medium pl-6">{selectedEmail.date}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={selectedEmail.status === "sent" ? "default" : "secondary"}
                          className={selectedEmail.status === "sent" ? "bg-teal-600" : "bg-gray-600"}
                        >
                          {selectedEmail.status === "sent" ? "Sent" : "Received"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="bg-teal-100" />
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-teal-700 mb-2">Content:</h4>
                  <div className="whitespace-pre-line text-sm">{selectedEmail.content}</div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="border-t p-4 gap-2">
              <Button variant="outline" className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50">
                <Reply className="h-4 w-4" />
                Reply
              </Button>
              <Button variant="outline" className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50">
                <Forward className="h-4 w-4" />
                Forward
              </Button>
              <Button
                variant="default"
                className="ml-auto bg-teal-600 hover:bg-teal-700"
                onClick={() => setOpenDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

