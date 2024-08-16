
'use client';
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser"
import { useEffect, useState, useRef } from 'react';

// QRコードリーダーの表示領域のhtmlのID
const qrcodeId = 'qr-code-reader';

export default function Scanz({
    onScanSuccess,
    onScanFailure,
    onClose,
}) {
    const videoRef = useRef(null);
    const controlsRef = useRef(null);
    const [load, setLoad] = useState(true);
    const [detail, setDetail] = useState("");

    useEffect(() => {
        if (videoRef.current) {
            const codeReader = new BrowserQRCodeReader();
            codeReader.decodeFromVideoDevice(
                null,
                videoRef.current,
                (result, error, controls) => {
                    if (error) {
                        console.log("decodeFromVideoDevice", "error", error);
                    }
                    if (result) {
                        console.log("decodeFromVideoDevice", "result", result);
                    }
                }).then((controls) => {
                    console.log("decodeFromVideoDevice", "then");
                    controlsRef.current = controls;
                    console.dir(controls);
                    setLoad(false);
                });
        }
    }, []);

    const stop = async () => {
        if (controlsRef.current) {
            await controlsRef.current.stop();
            controlsRef.current = null;
        }
    };

    return (
        <>
            <div className="w-full h-full bg-black fixed top-0 left-0 flex justify-center items-center">
                <video className='w-full mx-auto' ref={videoRef}></video>
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
            </>)
            }
            {
                load && (
                    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center">
                        <div className="animate-spin h-20 w-20 mx-1 rounded-full border-2 border-slate-300 border-t-white"></div>
                    </div >
                )
            }
        </>
    )
}