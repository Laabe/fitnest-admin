"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { X, Upload, Plus } from "lucide-react"
import Image from "next/image"

interface UploadedFile {
    id: string
    file: File
    preview: string
}

interface DropzoneProps {
    multiple?: boolean
}

export function Dropzone({ multiple = true }: DropzoneProps) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) => ({
                id: Math.random().toString(36).substr(2, 9),
                file,
                preview: URL.createObjectURL(file),
            }))

            setUploadedFiles((prev) => {
                if (!multiple) return newFiles.slice(0, 1)
                return [...prev, ...newFiles]
            })
        },
        [multiple]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        maxSize: 5 * 1024 * 1024,
        multiple,
    })

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => {
            const fileToRemove = prev.find((f) => f.id === id)
            if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview)
            return prev.filter((f) => f.id !== id)
        })
    }

    const handleSelectImages = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/png,image/jpeg"
        input.multiple = multiple
        input.onchange = (e) => {
            const files = Array.from((e.target as HTMLInputElement).files || [])
            onDrop(files)
        }
        input.click()
    }

    return (
        <div className="space-y-4">
            {uploadedFiles.length === 0 ? (
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
                            <Upload className="w-6 h-6 text-muted-foreground" />
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
                            type={"button"}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleSelectImages()
                            }}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Select Images
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                            Uploaded File{uploadedFiles.length > 1 ? "s" : ""} ({uploadedFiles.length})
                        </p>

                        {multiple && (
                            <Button variant="outline" size="sm" type={"button"} onClick={handleSelectImages}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add More
                            </Button>
                        )}
                    </div>

                    <div className={`grid ${multiple ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"} gap-4`}>
                        {uploadedFiles.map((uploadedFile) => (
                            <div key={uploadedFile.id} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
                                    <Image
                                        src={uploadedFile.preview}
                                        alt="Uploaded image"
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Remove button */}
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="
                                        absolute -top-2 -right-2 w-6 h-6 rounded-full cursor-pointer
                                        z-20
                                        opacity-100 md:opacity-0 md:group-hover:opacity-100
                                        transition-opacity duration-200
                                    "
                                    onClick={() => removeFile(uploadedFile.id)}
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
