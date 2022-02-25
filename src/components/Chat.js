
import React, { useEffect, useState } from "react";
import auth from "../services/auth";
import moment from "moment";
import { selectedUser } from "../redux/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { readMessages, sendMessage } from "../redux/message.slice";

export default function Chat(props) {
    const friend = useSelector(selectedUser)
    const dispatch = useDispatch();

    const [sent, setSent] = useState(false)
    const rawMsgs = useSelector(readMessages)
    const [messages, setMessages] = useState([])
    const [msgId, setMssgId] = useState("")
    const [message, setMessage] = useState("")
    useEffect(() => fetchMessages(), [sent, friend])
    const fetchMessages = async () => {

        let filteredData = (await rawMsgs).
            filter(f => (f.uid === auth.getUID() && f.touid === friend.id)
                || (f.touid === auth.getUID() && f.uid === friend.id))
        setMessages(filteredData.sort((a, b) => a.date - b.date))
        const recdata = filteredData.filter(f => f.uid !== auth.getUID())
        setMssgId(recdata[recdata.length - 1].id)
    }

    function sendNewMessage() {
        dispatch(sendMessage({
            uid: auth.getUID(),
            touid: friend.id,
            message: message,
        }))
        setMessage("")
        setSent(!sent)
    }

    return <div className="chat"
        style={{ width: window.screen.width / 1.3 }}
    >
        <div className="contact bar">
            <div container style={{
                display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
                <div item>
                    {!friend.id ? null : <div>
                        <div className="pic stark"></div>
                        <div className="name">{friend.fullName} </div>
                        <div className="seen"> {friend.email} </div>
                    </div>}
                </div>
                <div item>
                    <button className="btn"
                        variant="contained" color="primary"
                        onClick={() => {
                            localStorage.clear()
                            window.location.reload()
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>

        </div>
        <div className="messages" id="chat">
            <div>
                {
                    messages.map((x, i) => <div key={i} className="contact bar">
                        {msgId === x.id
                            ? <div className="pic stark"></div> : null}

                        <div className={x.uid === auth.getUID() ?
                            `message parker` : `message stark`}>
                            <div className="name">{x.message}</div>
                            <small className="seen">{`${moment(new Date(x.date.toDate()), 'ddd DD-MMM-YYYY, hh:mm A').format('lll')}`} </small>
                        </div>
                    </div>)
                }

            </div>
        </div>
        <div className="input">
            <input placeholder="Type your message here!" type="text"
                value={message}
                onInput={e => setMessage(e.target.value)}
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        setMessage(e.target.value)
                        sendNewMessage()
                    }
                }}
            />
            <button variant="contained" color="primary"
                disabled={message === "" || !friend.id ? true : false}
                className={message === "" || !friend.id ? "disabled-btn" : "btn"}
                onClick={sendNewMessage}>Send</button>
        </div>
    </div>
}