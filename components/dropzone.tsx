"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { X, Upload, Plus, Loader2 } from "lucide-react"
import Image from "next/image"
import { API_BASE } from "@/lib/env";
import {storage} from "@/lib/storage";

interface UploadedFile {
    id: string
    file: File
    preview: string
    publicUrl?: string
    isUploading?: boolean
}

interface DropzoneProps {
    multiple?: boolean
    onChange?: (urls: string | string[]) => void
    defaultValue?: string | string[]
    previewSize?: "sm" | "md" | "lg"
}

export function Dropzone({ multiple = true, onChange, defaultValue, previewSize = "md" }: DropzoneProps) {
    
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(() => {
        // Initialize with default value if provided
        if (!defaultValue) return []
        
        const urls = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
        return urls.map(url => ({
            id: Math.random().toString(36).substr(2, 9),
            file: null as any, // No file object for pre-existing URLs
            preview: url,
            publicUrl: url,
        }))
    })

    // Track previous URLs to prevent infinite loops
    const prevUrlsRef = useRef<string>('')

    // Keep onChange ref current to avoid stale closures and unnecessary effect re-runs
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    // Sync uploaded files with parent component
    useEffect(() => {
        const handler = onChangeRef.current
        if (!handler) return

        const uploadedUrls = uploadedFiles
            .filter((f) => f.publicUrl && !f.isUploading)
            .map((f) => f.publicUrl!)
        
        const currentUrlsString = multiple 
            ? uploadedUrls.join(',') 
            : uploadedUrls[0] || ''
        
        // Only call onChange if URLs actually changed
        if (prevUrlsRef.current !== currentUrlsString) {
            prevUrlsRef.current = currentUrlsString
            handler(multiple ? uploadedUrls : uploadedUrls[0] || '')
        }
    }, [uploadedFiles, multiple])

    const uploadToS3 = async (file: File): Promise<string> => {
        try {
            // Step 1: Get presigned URL from your API
            const response = await fetch(`${API_BASE}/api/media/upload`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storage.getToken()}`,
                },
                body: JSON.stringify({
                    content_type: file.type,
                    filename: file.name,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to get upload URL')
            }

            const data = await response.json()
            
            // Step 2: Upload file to S3 using presigned URL
            const uploadResponse = await fetch(data.upload_url.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                    ...data.upload_url.headers,
                },
                body: file,
            })

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload file to S3')
            }

            // Step 3: Return the public URL
            return data.public_url
        } catch (error) {
            console.error('Upload error:', error)
            throw error
        }
    }

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) => ({
                id: Math.random().toString(36).substr(2, 9),
                file,
                preview: URL.createObjectURL(file),
                isUploading: true,
            }))

            setUploadedFiles((prev) => {
                if (!multiple) return newFiles.slice(0, 1)
                return [...prev, ...newFiles]
            })

            // Upload files to S3
            for (const uploadedFile of newFiles) {
                try {
                    const publicUrl = await uploadToS3(uploadedFile.file)
                    
                    setUploadedFiles((prev) =>
                        prev.map((f) =>
                            f.id === uploadedFile.id
                                ? { ...f, publicUrl, isUploading: false }
                                : f
                        )
                    )
                } catch (error) {
                    // Remove failed upload
                    setUploadedFiles((prev) => prev.filter((f) => f.id !== uploadedFile.id))
                }
            }
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
            if (fileToRemove && fileToRemove.preview && !fileToRemove.publicUrl) {
                URL.revokeObjectURL(fileToRemove.preview)
            }
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

                    <div className={`grid ${multiple ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"} gap-4 ${
                        !multiple && previewSize === "sm" ? "max-w-[150px]" : 
                        !multiple && previewSize === "md" ? "max-w-[250px]" : 
                        !multiple && previewSize === "lg" ? "max-w-[400px]" : ""
                    }`}>
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
                                    
                                    {/* Upload loading overlay */}
                                    {uploadedFile.isUploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>

                                {/* Remove button */}
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    type="button"
                                    disabled={uploadedFile.isUploading}
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
