export function storeUser(user: NextAuthUser) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {

    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }

    return null;

}

export function clearUser() {
    localStorage.removeItem("user");
}