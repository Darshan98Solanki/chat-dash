import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";

export default function ChatApp() {

    interface message {
        data: string,
        senderId: string,
        bgColor: string,
        type: "sent" | "recieved"
    }

    const [messages, setMessages] = useState<message[]>([]);
    const [bgColor, setBgColor] = useState<string>('');
    const wsRef = useRef<WebSocket>(null);
    const [input, setInput] = useState('');
    const userIdRef = useRef<string>(crypto.randomUUID());
    const roomId = useParams().id

    useEffect(() => {
        const ws = new WebSocket("wss://chat-dash-fpjt.onrender.com");
        wsRef.current = ws;

        ws.onmessage = (event) => {
            const incoming = JSON.parse(event.data);

            if (incoming.type === 'joined') {
                setBgColor(incoming.bgColor || "bg-blue-800");
                console.log(bgColor);
            } else {
                if (incoming.senderId === userIdRef.current) return;

                setMessages(m => [...m, {
                    data: incoming.message,
                    senderId: incoming.senderId,
                    bgColor: incoming.bgColor || "bg-blue-800",
                    type: "recieved"
                }]);
            }
        }

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: 'join',
                payload: {
                    senderId: userIdRef.current,
                    roomId
                }
            }))
        }

    }, [])

    const sendMessage = () => {
        if (input != '') {
            setMessages(m => [...m, {
                data: input,
                senderId: userIdRef.current,
                bgColor,
                type: "sent"
            }]);

            wsRef.current?.send(JSON.stringify({
                type: 'chat',
                payload: {
                    roomId,
                    bgColor,
                    senderId: userIdRef.current,
                    message: input.toString(),
                }
            }))
            setInput('')
        }
    }

    return <>
        <div className="w-full bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col h-[400px]">
                <div className="px-4 py-3 border-b dark:border-zinc-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-zinc-800  dark:text-white">
                            Chat Room # {roomId}
                        </h2>
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Online
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2" id="chatDisplay">
                    {
                        messages.map(message =>
                            (message.type === "recieved") ?
                                <div className={`chat-message self-start ${message.bgColor} text-white max-w-xs rounded-lg px-3 py-1.5 text-sm`}>
                                    {message.data}
                                </div> : <div className={`chat-message self-end ${bgColor} text-white max-w-xs rounded-lg px-3 py-1.5 text-sm`}>
                                    {message.data}
                                </div>
                        )
                    }
                </div>
                <div className="px-3 py-2 border-t dark:border-zinc-700">
                    <div className="flex gap-2">
                        <input
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                            id="chatInput"
                            type="text"
                            value={input}
                            onChange={(event) => {
                                setInput(event.target.value);
                            }}
                            onKeyPress={(event)=>{
                                if(event.key === 'Enter') {
                                    sendMessage();
                                    event.preventDefault();
                                }
                            }}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                            id="sendButton"
                            onClick={() => sendMessage()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </>

}