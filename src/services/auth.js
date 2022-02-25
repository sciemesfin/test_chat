const auth = {
    isAuthenticated: () => {
        const token = localStorage.getItem("token");
        return token !== null && token !== "undefined";
    },
    setToken(token, uid) {
        localStorage.setItem("token", token)
        localStorage.setItem("uid", uid)
    },
    getToken() {
        const token = localStorage.getItem("token");
        return token
    },
    getUID() {
        const uid = localStorage.getItem("uid");
        return uid
    }
}

export default auth