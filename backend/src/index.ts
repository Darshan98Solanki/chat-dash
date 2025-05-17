import { RawData, WebSocket, WebSocketServer } from "ws";
import { tailwindDarkBgColors } from "./colors";

const wss = new WebSocketServer({ port: 8080 });

interface Payload {
    type: string,
    payload: {
        roomId: string,
        message: string,
        senderId: string,
        bgColor: string,
    }
}

const userBackgroundMap = new Map<string, string>()

let allRooms = new Map<string, WebSocket[]>();
let SocketToRooms = new Map<WebSocket, string>();

wss.on("connection", (socket: WebSocket) => {

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
                userBackgroundMap.set(parseData.payload.senderId, bgColor)
                socket.send(JSON.stringify({type:"joined",bgColor}));
            }

            if (parseData.type === "chat") {
                const currenUserRoom = allRooms.get(parseData.payload.roomId);
                currenUserRoom?.map(room => (room !== socket) ? room.send(JSON.stringify(
                    {
                        message: parseData.payload.message,
                        senderId: parseData.payload.senderId,
                        bgColor: userBackgroundMap.get(parseData.payload.senderId)
                    })) : '');
            }

        } catch (e) {
            socket.send("Something wrong happend")
        }

    })

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
    })
})
