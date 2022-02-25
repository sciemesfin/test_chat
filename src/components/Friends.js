import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readUsers, selectUser } from "../redux/user.slice";

export default function Friends() {
    const users = useSelector(readUsers)
    const [friends, setFriends] = useState([])
    useEffect(() => fetchUsers(), [])
    const fetchUsers = async () => {
        const userData = await users
        dispatch(selectUser(userData[0]))
        setFriends(userData)
    }

    const dispatch = useDispatch();

    return <div>
        <div className="contacts">
            <i className="fas fa-bars fa-2x"></i>
            <h2>
                Contacts
            </h2>
            <div>
                {
                    friends.map((x, i) => <div key={i} className="contact"
                        onClick={() => dispatch(selectUser(x))}
                    >
                        <div className="pic stark"></div>
                        <div className="name"> {x.fullName}  </div>
                        <div className="message"> {x.email} </div>
                    </div>)
                }
            </div>
        </div>
    </div>
}