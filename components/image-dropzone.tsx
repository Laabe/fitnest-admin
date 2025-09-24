"use client"

import {useState, useCallback} from "react"
import {useDropzone} from "react-dropzone"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {X, Upload, Plus} from "lucide-react"
import Image from "next/image"

interface UploadedFile {
    id: string
    file: File
    preview: string
}

export function ProductImageDropzone() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: URL.createObjectURL(file),
        }))

        setUploadedFiles((prev) => [...prev, ...newFiles])
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: true,
    })

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => {
            const fileToRemove = prev.find((f) => f.id === id)
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.preview)
            }
            return prev.filter((f) => f.id !== id)
        })
    }

    const handleSelectImages = () => {
        // Trigger file input click
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/png,image/jpeg"
        input.multiple = true
        input.onchange = (e) => {
            const files = Array.from((e.target as HTMLInputElement).files || [])
            onDrop(files)
        }
        input.click()
    }

    return (
        <div className="space-y-4">
            {uploadedFiles.length === 0 ? (
                // Empty state
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-muted-foreground/50"
                    }`}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <Upload className="w-6 h-6 text-muted-foreground"/>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">
                                {isDragActive ? "Drop your images here" : "Drop your images here"}
                            </p>
                            <p className="text-xs text-muted-foreground">PNG or JPG (max. 5MB)</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleSelectImages()
                            }}
                        >
                            <Upload className="w-4 h-4 mr-2"/>
                            Select Images
                        </Button>
                    </div>
                </div>
            ) : (
                // Files uploaded state
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</p>
                        <Button variant="outline" size="sm" onClick={handleSelectImages}>
                            <Plus className="w-4 h-4 mr-2"/>
                            Add more
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadedFiles.map((uploadedFile) => (
                            <div key={uploadedFile.id} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                                    <Image
                                        src={uploadedFile.preview || "/placeholder.svg"}
                                        alt="Uploaded image"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full cursor-pointer"
                                    onClick={() => removeFile(uploadedFile.id)}
                                >
                                    <X className="w-3 h-3"/>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
