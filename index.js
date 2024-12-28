const express = require("express");

const app = express();
const port = 3000;

const botToken = "";

async function getUserAvatar(userId) {
    try {
        const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bot ${botToken}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data && data.avatar) {
            const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${data.avatar}.png`;
            return avatarUrl;
        } else {
            throw new Error('User does not have an avatar.');
        }
    } catch (error) {
        console.error("Error retrieving avatar:", error);
        throw error
    }
}

app.get('/', (req, res) => {
    res.send("Avatar Fetching");
});

app.get("/avatar/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const avatarUrl = await getUserAvatar(userId);
        res.json({ avatarUrl });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve avatar" });
    }
});

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});