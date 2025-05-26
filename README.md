## 🚀 Live Demo

[Click here to view the live app](https://chat-dash-1.onrender.com/)

# 💬 Chat Dash

A modern real-time chat application built with **React**, **Tailwind CSS**, and a **WebSocket** backend. Designed with smooth animations, responsive UI, and real-time messaging across chat rooms.

![image](https://github.com/user-attachments/assets/25afc2b6-c6f3-4931-b9b2-7938923afe35)


---

## 🚀 Features

- 🌐 Real-time messaging with WebSockets
- 🎨 Neon-themed modern UI using Tailwind CSS
- 📱 Fully responsive for mobile, tablet, and desktop
- ✨ Focus and animation effects with Framer Motion
- 🧠 Unique user identity & color per session
- 🔐 Room-based chat system

---

## 🛠 Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite

**Backend:**
- Node.js
- WebSocket (`ws` library)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Darshan98Solanki/chat-dash.git
cd chat-dash
````

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd ../backend
npm install
node index.js
```

Make sure the WebSocket server is running at `ws://localhost:8080`.

---

## 🖼️ Screenshots

> ![image](https://github.com/user-attachments/assets/dfa718a1-d4bf-4763-b362-8f4305850ec3)
> ![image](https://github.com/user-attachments/assets/1f5d659b-e173-421e-8287-aa23368bc419)
> ![image](https://github.com/user-attachments/assets/ce6631fb-d944-414d-b494-8b8db02d9d13)
> ![image](https://github.com/user-attachments/assets/855864ab-c4d8-4326-b1a9-3a9f8b3f26fe)





---

## 🔧 Configuration

* WebSocket server port: `8080`
* Client WebSocket URL: `ws://localhost:8080`
* Room ID is passed via URL: `/chat/:id`

---

## 🧪 TODO / Improvements

* [ ] Add authentication
* [ ] Store chat history (e.g., MongoDB or Redis)
* [ ] Typing indicators
* [ ] File sharing
* [ ] Dark mode toggle

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License. Feel free to use, modify, and distribute.

---

## ✨ Author

Built with 💙 by [Darshan Solanki](https://github.com/Darshan98Solanki)
