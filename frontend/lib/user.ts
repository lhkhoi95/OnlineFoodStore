import axios from "axios";

export default async function logout(accessToken: string) {
    try {
        const headers = {
            "auth-token": `${accessToken}`
        }
        const { data } = await axios.post("http://localhost:3000/auth/logout", {}, { headers: headers });
        console.log(data);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to logout");
    }
}