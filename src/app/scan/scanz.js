
'use client';
import { QRCodeReader, RGBLuminanceSource, BinaryBitmap, HybridBinarizer } from "@zxing/library"
import { useEffect, useState, useRef } from 'react';

export default function Scanz({
    onScanSuccess,
    onScanFailure,
    onClose,
}) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const timerRef = useRef(null);
    const startRef = useRef(false);
    const [load, setLoad] = useState(true);
    const [detail, setDetail] = useState("");

    useEffect(() => {
        setLoad(true);
        console.log("useEffect", startRef.current);
        if (!startRef.current) {
            console.log("useEffect", "start");
            startRef.current = true;
            start().then(() => {
                setLoad(false);
            }).finally(() => {
                startRef.current = false;
            });
        }
    }, []);

    const start = async () => {
        try {
            console.log("start");
            const constraints = {
                audio: false,
                video: {
                    facingMode: 'environment',
                    width: window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth,
                    height: window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight,
                },
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(streamRef.current);
            if (streamRef.current) {
                await stop();
            }
            streamRef.current = stream;
            videoRef.current.srcObject = streamRef.current;
            console.dir(videoRef.current);
            videoRef.current.pause();
            videoRef.current.play();
            scan(constraints.video.width, constraints.video.height);
        } catch (e) {
            console.error(e);
        }
    }

    const stop = async () => {
        console.log("stop");
        if (timerRef.current) {
            console.log("stop", "clearInterval", timerRef.current);
            clearInterval(timerRef.current);
        }
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            console.log("stop", "streamRef", tracks);
            tracks[0].stop();
        }
    };

    const scan = (width, height) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            const canvas = new OffscreenCanvas(width, height);
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, width, height);
            const imageData = context.getImageData(0, 0, width, height);
            const source = new RGBLuminanceSource(new Int32Array(imageData.data.buffer), width, height);
            const bitmap = new BinaryBitmap(new HybridBinarizer(source));
            const reader = new QRCodeReader();
            try {
                const result = reader.decode(bitmap);
                console.log(result);
            } catch (e) {
                console.dir(e);
            }
        }, 1000);
    };

    return (
        <>
            <div className="w-full h-full bg-black fixed top-0 left-0 flex justify-center items-center">
                <video ref={videoRef}></video>
            </div>
            {!load && (<>
                <div onClick={async () => {
                    await stop();
                    if (onClose) {
                        await onClose();
                    }
                }} className="text-white absolute top-4 left-4 p-2 text-2xl">✕</div>
                <div className="text-white fixed top-4 left-1/2 -translate-x-1/2 p-2">スキャン</div>
                {detail && (<>
                    <div className="text-white text-xs fixed bottom-4 left-4 whitespace-pre-line">{detail}</div>
                </>)}
            </>)}
            {load && (
                <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center">
                    <div className="animate-spin h-20 w-20 mx-1 rounded-full border-2 border-slate-300 border-t-white"></div>
                </div >
            )}
        </>
    )
}