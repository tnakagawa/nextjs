
import { useState } from 'react';
import './style.css';

export default function PassCode({ enterPassCode }) {
    const [passCode, setPassCode] = useState("");
    const [passCodeCancel, setPassCodeCancel] = useState(false);

    const addPassCode = (num) => {
        try {
            if (!passCodeCancel) {
                let newPassCode = passCode;
                if (num == -1 && newPassCode.length > 0) {
                    newPassCode = newPassCode.substring(0, passCode.length - 1);
                } else if (0 <= num && num < 10 && passCode.length < 6) {
                    newPassCode += num;
                }
                console.log("PassCode", passCode, newPassCode);
                if (newPassCode.length == 6) {
                    setPassCode(newPassCode);
                    enterPassCode(newPassCode, cancel);
                } else {
                    if (newPassCode != passCode) {
                        setPassCode(newPassCode);
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    const cancel = () => {
        setPassCodeCancel(true);
        setTimeout(() => {
            setPassCode("");
            setPassCodeCancel(false);
        }, 1000);
    }

    const Dots = () => {
        const item = [];
        for (let i = 0; i < 6; i++) {
            item.push(<div className='w-8 h-8 flex justify-center items-center mx-auto'>
                {(passCode && passCode.length > i) ? (
                    <div key={i} className='w-4 h-4 rounded-full border-2 border-slate-300 bg-black'></div>
                ) : (
                    <div key={i} className='w-4 h-4 rounded-full border-2 border-slate-400'></div>
                )}
            </div>);
        }
        return item;
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center select-none">
            <div className='mb-2 mt-2 text-slate-500 text-lg'>パスコードを入力</div>
            <div className={(passCodeCancel) ? ('grid grid-cols-6 mb-12 mx-auto passcodeng') : ('grid grid-cols-6 mb-12 mx-auto')}>
                <Dots />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(1); }}>
                    <div className='text-xl text-slate-400'>1</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(2); }}>
                    <div className='text-xl text-slate-400'>2</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(3); }}>
                    <div className='text-xl text-slate-400'>3</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(4); }}>
                    <div className='text-xl text-slate-400'>4</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(5); }}>
                    <div className='text-xl text-slate-400'>5</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(6); }}>
                    <div className='text-xl text-slate-400'>6</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(7); }}>
                    <div className='text-xl text-slate-400'>7</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(8); }}>
                    <div className='text-xl text-slate-400'>8</div>
                </div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(9); }}>
                    <div className='text-xl text-slate-400'>9</div>
                </div>
                <div></div>
                <div className='w-16 h-16 rounded-full border-2 flex justify-center items-center bg-slate-100 active:bg-white'
                    onClick={() => { addPassCode(0); }}>
                    <div className='text-xl text-slate-400'>0</div>
                </div>
                <div className='w-16 h-16 rounded-full border-0 flex justify-center items-center active:bg-slate-100'
                    onClick={() => { addPassCode(-1); }}>
                    <div className='text-base text-slate-400'>削除</div>
                </div>
                {/* <Nums /> */}
            </div>
        </div>
    );
}