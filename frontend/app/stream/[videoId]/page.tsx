"use client";
import { useEffect, useRef } from "react";
import { useParams } from 'next/navigation';
import HLS from 'hls.js';

export default function Page() {
    const params = useParams<{ videoId: string }>()
    const videoId = params.videoId;

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoId || !videoRef.current) return;

        if (HLS.isSupported()) {
            const hls = new HLS();
            hls.loadSource(`http://localhost:3001/output/${videoId}/master.m3u8`);
            hls.attachMedia(videoRef.current);

            return () => hls.destroy();
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari native support
            videoRef.current.src = `http://localhost:3001/output/${videoId}/master.m3u8`;
        }

    }, [videoId]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
            <div className="w-full bg-white shadow-lg rounded-lg p-6">
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        Video preview {videoId}
                    </h2>

                    <video 
                        controls
                        className="rounded-lg border border-gray-300"
                        width="100%"
                        ref={videoRef}
                    />
                </div>
            </div>
        </div>
    );
}
