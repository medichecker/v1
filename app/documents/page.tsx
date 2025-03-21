"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, File, Eye, FileImage } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Document {
  id: string
  name: string
  type: string
  date: string
  size: string
  status: "processed" | "processing" | "error"
  fileType: "pdf" | "image"
  url?: string
}

export default function UploadDocuments() {
  const [documentType, setDocumentType] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  // Sample documents
  const documents: Document[] = [
    {
      id: "doc-1",
      name: "Hospital_Bill_Memorial_Jan2023.pdf",
      type: "Medical Bill",
      date: "2023-01-15",
      size: "1.2 MB",
      status: "processed",
      fileType: "pdf",
      url: "/placeholder.svg?height=800&width=600",
    },
    {
      id: "doc-2",
      name: "Insurance_EOB_BlueCross_Jan2023.pdf",
      type: "Insurance Document",
      date: "2023-01-20",
      size: "0.8 MB",
      status: "processed",
      fileType: "pdf",
      url: "/placeholder.svg?height=800&width=600",
    },
    {
      id: "doc-3",
      name: "Patient_Portal_Lab_Results.jpg",
      type: "EHR Patient Portal",
      date: "2023-01-25",
      size: "2.1 MB",
      status: "processing",
      fileType: "image",
      url: "/placeholder.svg?height=800&width=600",
    },
    {
      id: "doc-4",
      name: "Follow_Up_Visit_Summary.png",
      type: "EHR Patient Portal",
      date: "2023-02-05",
      size: "1.5 MB",
      status: "processed",
      fileType: "image",
      url: "/placeholder.svg?height=800&width=600",
    },
    {
      id: "doc-5",
      name: "Insurance_Policy_Details.pdf",
      type: "Insurance Document",
      date: "2023-01-10",
      size: "3.2 MB",
      status: "error",
      fileType: "pdf",
      url: "/placeholder.svg?height=800&width=600",
    },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file upload logic here
    if (e.dataTransfer.files && e.dataTransfer.files[0] && documentType) {
      // Process files
      console.log("File dropped:", e.dataTransfer.files[0].name)
      console.log("Document type:", documentType)
      // You would typically upload the file to your server here
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && documentType) {
      // Process files
      console.log("File selected:", e.target.files[0].name)
      console.log("Document type:", documentType)
      // You would typically upload the file to your server here
    }
  }

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc)
    setShowPreview(true)
  }

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-teal-600">Processed</Badge>
      case "processing":
        return <Badge className="bg-gray-500">Processing</Badge>
      case "error":
        return <Badge className="bg-red-900">Error</Badge>
      default:
        return null
    }
  }

  const getFileIcon = (fileType: Document["fileType"]) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-6 w-6 text-teal-600" />
      case "image":
        return <FileImage className="h-6 w-6 text-teal-600" />
      default:
        return <File className="h-6 w-6 text-teal-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath="/upload-documents" />

      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Documents</h1>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="collection">My Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Upload a New Document</CardTitle>
                  <CardDescription>Select the document type and upload your file to begin analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Document Type</label>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical-bill">Medical Bill</SelectItem>
                          <SelectItem value="ehr-portal">EHR Patient Portal Documents</SelectItem>
                          <SelectItem value="insurance">Insurance Documents</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        dragActive ? "border-teal-500 bg-teal-50" : "border-gray-300"
                      } ${!documentType ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Upload className={`h-10 w-10 ${dragActive ? "text-teal-600" : "text-gray-400"}`} />
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-gray-700">
                            {dragActive ? "Drop your file here" : "Drag & drop your file here"}
                          </h3>
                          <p className="text-sm text-gray-500">or click to browse from your computer</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileChange}
                          disabled={!documentType}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("file-upload")?.click()}
                          disabled={!documentType}
                          className="border-teal-200 text-teal-700 hover:bg-teal-50"
                        >
                          Select File
                        </Button>
                      </div>
                    </div>

                    {!documentType && (
                      <p className="text-sm text-amber-600">Please select a document type before uploading</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6 flex justify-between">
                  <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG (Max size: 10MB)</p>
                  <Button disabled={!documentType} className="bg-teal-600 hover:bg-teal-700">
                    Upload & Analyze
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="collection">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>My Documents</CardTitle>
                  <CardDescription>View and manage all your uploaded documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded">{getFileIcon(doc.fileType)}</div>
                            <div>
                              <h4 className="font-medium text-gray-800">{doc.name}</h4>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(doc.status)}
                            <Button variant="ghost" size="icon" onClick={() => handleViewDocument(doc)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm text-gray-500">Total documents: {documents.length}</p>
                    {/* <Button
                      variant="outline"
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                      onClick={() => document.getElementById("tabs-upload")?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button> */}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Document Preview Dialog */}
      {selectedDocument && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getFileIcon(selectedDocument.fileType)}
                {selectedDocument.name}
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 bg-gray-100 rounded-lg h-[500px] flex items-center justify-center overflow-hidden">
              {selectedDocument.fileType === "pdf" ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <iframe src={selectedDocument.url} className="w-full h-full border-0" title={selectedDocument.name} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={selectedDocument.url || "/placeholder.svg"}
                    alt={selectedDocument.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

