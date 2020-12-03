require("dotenv").config();

const axios = require("axios");
const express = require("express");

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  PORT,
  HOSTNAME,
} = process.env;

const app = express();

app.use(express.static("public"));

app.get("/auth/login", (req, res) => {
  const scopes = "user-read-private user-read-email playlist-read-private";

  const baseUrl = "https://accounts.spotify.com/authorize";

  const query = [
    "response_type=code",
    `client_id=${SPOTIFY_CLIENT_ID}`,
    `scope=${encodeURIComponent(scopes)}`,
    `redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`,
    `show_dialog=true`,
  ];

  const redirectUri = `${baseUrl}?${query.join("&")}`;

  console.log(redirectUri);

  res.redirect(redirectUri);
});

app.get("/auth/logged", async (req, res) => {
  const { code } = req.query;

  const url = "https://accounts.spotify.com/api/token";

  const query = [
    "grant_type=authorization_code",
    `code=${code}`,
    `redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`,
  ];

  const encodedBase64 = getSpotifyBase64();

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedBase64}`,
    },
    data: query.join("&"),
    url,
  };

  const { data } = await axios(options);

  console.log("data", data);

  const params = [
    `access_token=${data.access_token}`,
    `refresh_token=${data.refresh_token}`,
  ];

  res.redirect(`${HOSTNAME}?${params.join("&")}`);
});

const getSpotifyBase64 = () => {
  const combinedKeys = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
  const buff = Buffer.from(combinedKeys);
  const encodedBase64 = buff.toString("base64");
  return encodedBase64;
};

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
