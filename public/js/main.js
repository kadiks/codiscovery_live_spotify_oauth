let accessToken = null;
let refreshToken = null;
let listEl = null;

const init = async () => {
  listEl = document.querySelector("ul");

  grabTokens();

  const playlists = await getMyPlaylists();

  console.log(playlists);

  displayPlaylists(playlists);
};

const displayPlaylists = (playlists) => {
  playlists.forEach((playlistName) => {
    const liEl = document.createElement("li");
    liEl.textContent = playlistName;
    listEl.appendChild(liEl);
  });
};

const getMyPlaylists = async () => {
  if (accessToken === null) {
    window.location = `${document.location.origin}/auth/login`;
    return;
  }
  const url = "https://api.spotify.com/v1/me/playlists";
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();

  console.log("json", json);

  const publicPlaylists = json.items.filter((p) => p.public);

  const playlists = publicPlaylists.map((p) => p.name);
  return playlists;
};

const grabTokens = () => {
  const urlParams = new URLSearchParams(document.location.search);

  if (urlParams.get("access_token")) {
    grabTokensInUrl();
  } else {
    grabTokensInLocalStorage();
  }
};

const grabTokensInLocalStorage = () => {
  accessToken = localStorage.getItem("spotifyAccessToken");
  refreshToken = localStorage.getItem("spotifyRefreshToken");
};

const grabTokensInUrl = () => {
  const urlParams = new URLSearchParams(document.location.search);

  accessToken = urlParams.get("access_token");
  refreshToken = urlParams.get("refresh_token");

  localStorage.setItem("spotifyAccessToken", accessToken);
  localStorage.setItem("spotifyRefreshToken", refreshToken);
};

window.addEventListener("load", init);
