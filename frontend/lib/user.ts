import axios, { AxiosResponse } from "axios";

export async function logout(accessToken: string) {
    try {
        const headers = {
            "auth-token": `${accessToken}`
        }
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, { headers: headers });
        console.log(data);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to logout");
    }
}

export async function getUserByEmail(email: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/getUserByEmail?email=${email}`);
        const user = response.data;
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get user");
    }
}

export async function loginWithProvider(user: any) {
    const body = ({
        name: user.name,
        email: user.email,
        loginWithProvider: true,
        avatar: user.image,
    });
    try {
        const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/loginWithProvider`, body);

        const user = response.data as NextAuthUser;

        if (user) return user;
        return null;

    } catch (err: any) {
        console.log("ERROR", err.response.data);
        throw new Error(err.response.status);
    }
}