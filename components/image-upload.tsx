
"use client";

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";
import { useRouter } from "next/navigation";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export default function ImageUpload({ onSuccess }: { onSuccess: (res: any) => void }) {
    const router = useRouter();

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticator = async () => {
        try {
            const response = await fetch("/api/imagekit/auth");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error: any) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    const onError = (err: any) => {
        console.error("ImageKit Upload Error:", err);
        setError(typeof err === 'string' ? err : err.message || "Upload failed. Please try again.");
        setUploading(false);
    };

    const onUploadSuccess = (res: any) => {
        console.log("Success", res);
        setUploading(false);
        onSuccess(res);
    };

    const onUploadStart = (evt: any) => {
        console.log("Start", evt);
        setUploading(true);
        setError(null);
    };

    return (
        <div className="space-y-4">
            <ImageKitProvider
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticator={authenticator}
            >
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 hover:bg-gray-50 transition">
                    <IKUpload
                        fileName="test-upload.png"
                        onError={onError}
                        onSuccess={onUploadSuccess}
                        onUploadStart={onUploadStart}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <span className="text-sm font-medium text-gray-900">Click to upload image</span>
                        <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span>
                    </label>
                </div>
            </ImageKitProvider>

            {uploading && (
                <p className="text-center text-sm text-blue-600">Uploading...</p>
            )}

            {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
