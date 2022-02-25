import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "../services/firebase.config";
import userAuth from "../services/auth";

import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../services/firebase.config";

const provider = new GoogleAuthProvider();
export default function Signin() {
    function launchSignin() {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                //Check if the use exists.
                const q = query(collection(db, "users"),
                    where("id", "==", user.uid),
                );

                const querySnapshot = await getDocs(q);
                let data = []
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() })
                });

                if (data.length < 1)
                    await addDoc(collection(db, "users"), {
                        id: user.uid,
                        fullName: user.displayName,
                        email: user.email,
                        date: new Date()
                    });

                // console.log(userData)
                userAuth.setToken(token, user.uid)
                window.location.reload()
                // ...
            }).catch((error) => {
                GoogleAuthProvider.credentialFromError(error);
                console.log(error)
            });
    }
    return <div>

        <div container
            style={{
                height: '100vh', width: "100%",
                position: "relative",
            }}>

            <div className="btn-center">
                <button className="btn" block variant="contained" color="primary"
                    onClick={launchSignin} style={{ height: 45 }}
                >
                    <div style={{ display: "flex", alignItems: "center", }}>
                        <img src={require('../assets/images/google.png')}
                            style={{ width: 30, height: 30, paddingRight: 10 }}
                            alt="google-logo"
                        />
                        <p> Sign in with Google</p>
                    </div>

                </button>
            </div>

        </div>
    </div>
}