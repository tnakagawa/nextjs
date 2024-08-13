
'use client';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useState, useRef } from 'react';

// QRコードリーダーの表示領域のhtmlのID
const qrcodeId = 'qr-code-reader';

export default function Scan({
    onScanSuccess,
    onScanFailure,
    onClose,
}) {
    const html5QrCodeRef = useRef(null);
    const [load, setLoad] = useState(true);
    const [detail, setDetail] = useState("");


    const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
        console.log("Scan", "Success", decodedText);
        console.log("Scan", "Success", decodedResult);
        if (onScanSuccess) {
            await html5QrCodeRef.current.stop();
            console.log("Html5Qrcode", "stop");
            html5QrCodeRef.current = null;
            await onScanSuccess(decodedText);
        }
    }

    const qrCodeErrorCallback = async (errorMessage) => {
        console.log("Scan", "Error", errorMessage);
        if (onScanFailure) {
            await onScanFailure(errorMessage);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        console.log("Scan", "useEffect");
        let ratio = window.devicePixelRatio;
        let videoWidth = window.screen.availHeight;
        let videoHeight = window.screen.availWidth;
        if (searchParams.get("ratio")) {
            ratio = 1 / ratio;
            videoWidth = window.screen.availWidth;
            videoHeight = window.screen.availHeight;
        }
        const detail = ""
            + "navigator.userAgent" + navigator.userAgent + "\n"
            + "raito" + ratio + "\n"
            + "window.devicePixelRatio:" + window.devicePixelRatio + "\n"
            + "(window.innerWidth,window.innerHeight):(" + window.innerWidth + "," + window.innerHeight + ")\n"
            + "(window.outerWidth,window.outerHeight):(" + window.outerWidth + "," + window.outerHeight + ")\n"
            + "(window.screen.width,window.screen.height):(" + window.screen.width + "," + window.screen.height + ")\n"
            + "(window.screen.availWidth,window.screen.availHeight):(" + window.screen.availWidth + "," + window.screen.availHeight + ")";
        console.log(detail);
        if (searchParams.get("detail")) {
            setDetail(detail);
        }
        const cameraIdOrConfig = {
            facingMode: "environment",
        };
        console.log("Scan", "cameraIdOrConfig", cameraIdOrConfig);
        const configuration = {
            fps: 10,
            qrbox: 250,
            aspectRatio: ratio,
            videoConstraints: {
                facingMode: "environment",
                aspectRatio: ratio,
                width: videoWidth,
                height: videoHeight,
            }
        };
        console.log("Scan", "configuration", configuration);
        if (!html5QrCodeRef.current) {
            const html5QrCode = new Html5Qrcode(qrcodeId);
            html5QrCodeRef.current = html5QrCode;
            // console.dir(html5QrCode);
            html5QrCodeRef.current.start(cameraIdOrConfig, configuration, qrCodeSuccessCallback, qrCodeErrorCallback)
                .then(() => {
                    console.log("Html5Qrcode", "start");
                    console.dir(html5QrCodeRef.current);
                    setLoad(false);
                })
                .catch((e) => {
                    console.error(e);
                    html5QrCodeRef.current = null;
                    setLoad(false);
                });
        }
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="w-full h-full bg-black fixed top-0 left-0 flex justify-center items-center">
                <div className='w-full mx-auto' id={qrcodeId}></div>
            </div>
            {!load && (<>
                <div onClick={async () => {
                    if (html5QrCodeRef.current) {
                        await html5QrCodeRef.current.stop();
                        console.log("Html5Qrcode", "stop");
                        html5QrCodeRef.current = null;
                    }
                    await onClose();
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