import { useState } from "react";
import Squares from "../components/Background";
import ChatApp from "../components/ChatBox";

export default function Chat() {

    const [isConnected, setIsConnected] = useState(false);

    return <>
        <div className="relative flex justify-center items-center min-h-screen bg-slate-900 overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 text-cyan-400 drop-shadow-[0_0_10px_#0ff]">
                {
                    isConnected &&
                    <Squares
                        speed={0.5}
                        squareSize={40}
                        direction="diagonal"
                        borderColor="#0ff"
                        hoverFillColor="#0ff"
                    />
                }
            </div>

            {/* Foreground Layer */}
            <div className="z-10 w-full max-w-3xl px-4">
                <ChatApp isConnected={isConnected} setIsConnected={setIsConnected} />
            </div>
        </div></>
}