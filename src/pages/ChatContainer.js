
import React from "react";
import Chat from "../components/Chat";
import Friends from "../components/Friends";

export default function ChatContainer() {

    return <div className="center">
        <Friends />
        <Chat />
    </div>
}