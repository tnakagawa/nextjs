
'use client';

import { useState } from "react";
import Scan from "./scan";

export default function Home() {

    const [scan, setScan] = useState(false);

    return (
        <>
            <main>
                <div className="w-full p-12">
                    <div className="w-full bg-blue-500 text-white text-center rounded-xl py-2" onClick={async () => {
                        setScan(true);
                    }}>SCAN</div>
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
        </>
    );
}