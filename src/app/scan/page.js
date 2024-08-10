
'use client';

import { useState } from "react";
import Scan from "./scan";
import PassCode from "./passcode";

export default function Home() {

    const [scan, setScan] = useState(false);
    const [passCode, setPassCode] = useState(false);

    return (
        <>
            <main>
                <div className="w-full p-12 flex flex-col">
                    <div className="w-full bg-blue-500 text-white text-center rounded-xl py-2" onClick={async () => {
                        setScan(true);
                    }}>SCAN</div>
                    <div className="my-4"></div>
                    <div className="w-full bg-blue-500 text-white text-center rounded-xl py-2" onClick={async () => {
                        setPassCode(true);
                    }}>PASS CODE</div>
                </div>
            </main>

            {scan && (
                <Scan
                    onScanSuccess={async (qrdata) => {
                        console.log("onScanSuccess", qrdata);
                        setScan(false);
                    }}
                    onClose={async () => { setScan(false); }}
                />
            )}

            {passCode && (
                <div className="w-full h-full fixed top-0 left-0 bg-white ">
                    <div className="mt-20 flex flex-col justify-center items-center">
                        <PassCode
                            code="123456"
                            checkOk={() => {
                                setPassCode(false)
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}