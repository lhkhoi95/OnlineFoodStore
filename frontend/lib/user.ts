export default async function login(username: any, password: any) {
    // Send request to server to log the user in
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "abc@gmail.com",
            password: "123",
        }),
    });

    if (res.ok) {
        const user = await res.json();
        return user;
    }

    return null;
}