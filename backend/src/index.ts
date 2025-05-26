import { RawData, WebSocket, WebSocketServer } from "ws";
import { tailwindDarkBgColors } from "./colors";
import { createServer } from "http";

interface Payload {
    type: string,
    payload: {
        roomId: string,
        message: string,
        senderId: string,
        bgColor: string,
    }
}

interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
}

// Create a basic HTTP server for keep-alive
const server = createServer((req, res) => {
    if (req.url === "/ping") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("pong");
    } else {
        res.writeHead(404);
        res.end();
    }
});

const wss = new WebSocketServer({ server });


const userBackgroundMap = new Map<string, string>()
let allRooms = new Map<string, WebSocket[]>();
let SocketToRooms = new Map<WebSocket, string>();

// Ping-pong to keep the WebSocket connections alive
const pingInterval = 30000; // Send ping every 30 seconds

wss.on("connection", (socket: ExtWebSocket) => {
    socket.isAlive = true;

    socket.on("pong", () => {
        socket.isAlive = true;
    });

    setInterval(() => {
        wss.clients.forEach((client) => {
            const ws = client as ExtWebSocket;
            if (!ws.isAlive) return ws.terminate();
            ws.isAlive = false;
            ws.ping();
        });
    }, pingInterval);

    socket.on("message", (message: RawData) => {
        try {
            const parseData: Payload = JSON.parse(message.toString());

            if (parseData.type === "join") {
                const roomId = parseData.payload.roomId;
                let chatrooms = allRooms.get(roomId);

                if (chatrooms) {
                    chatrooms.push(socket);
                    allRooms.set(roomId, chatrooms);
                    SocketToRooms.set(socket, roomId);
                } else {
                    allRooms.set(roomId, [socket]);
                }

                const availableColors = tailwindDarkBgColors.filter(color => !Array.from(userBackgroundMap.values()).includes(color))
                let bgColor = availableColors[Math.floor(Math.random() * availableColors.length)];
                userBackgroundMap.set(parseData.payload.senderId, bgColor);
                socket.send(JSON.stringify({ type: "joined", bgColor }));
            }

            if (parseData.type === "chat") {
                const currenUserRoom = allRooms.get(parseData.payload.roomId);
                currenUserRoom?.map(room => {
                    if (room !== socket) {
                        room.send(JSON.stringify(
                            {
                                message: parseData.payload.message,
                                senderId: parseData.payload.senderId,
                                bgColor: userBackgroundMap.get(parseData.payload.senderId)
                            }
                        ));
                    }
                });
            }

        } catch (e) {
            socket.send("Something went wrong");
        }
    });

    socket.on("close", () => {
        const roomId = SocketToRooms.get(socket);
        if (roomId) {
            let room = allRooms.get(roomId);
            if (room) {
                room = room.filter(client => client !== socket);
                if (room.length !== 0) {
                    allRooms.set(roomId, room);
                } else {
                    allRooms.delete(roomId);
                }
            }
            SocketToRooms.delete(socket);
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
