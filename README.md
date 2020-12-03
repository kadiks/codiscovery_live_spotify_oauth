# Spotify backend

## Environment variable necessary

SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI
PORT
HOSTNAME

## Steps

### Part 1

- curl/postman
- access_token
- manual api call from browser

### Part 2

- server node
- access_token
- browser api call

### Part 3

- refresh token
- random playlist
- play sounds

## Playlist ids

{ type: "playlists", id: "7oBeEkujcRybm7dCAUAIhG" },
{ type: "playlists", id: "2IamgqJjhiz48fBY9W0kpa" },
{ type: "playlists", id: "6J7xdAmvpquhkPG1sxldMp" },
{ type: "playlists", id: "5zITOyhjFoptruddJLJwFU" },
{ type: "playlists", id: "0pDroIJqt63NYXt29OzYlm" },

## Example

https://accounts.spotify.com/authorize?response_type=code&client_id=b03b12c995444d98b7d03db0a90ed154&scope=user-read-private%20user-read-email&redirect_uri=https%3A%2F%2Fgoogle.com&show_dialog=true

code = AQD1FdZeqySaSmijhUNc2oZX10X98HEWcvD3DBFbdzGrYJPJcByLxbBx6GZgmkjCcwfKQ\_\_Zh5k0XvluyiohCmwOK1lxuUMdxevfeu9e5ze_GZm_8ejjN8i943dRqq-1gAV_Jx7hEIxMe8gbdUI4Xq6L8o0pkvp-IciRoKSqZfX6gE96YhA7HwYg3qEkPdQsmtreP51CDwDLyg

b03b12c995444d98b7d03db0a90ed154:2529e22301fe4eee96c0471fd7559eb6

curl \
-d grant_type=authorization_code \
-d code=AQDbXV8bvRdkiM-Od85phRm12waCLEpDdQCcLe6_EtfZQDVSDLIwYQkz-BDtkTRZn3nRvFjoOeD9T2ZUiBv3r_Ty_SxnborxXnyx1v_rUSb8Mne7faLT_gyeCGAJ3mRpCLPgxuNaIJDc95ASPGZHJ8_h2GxE0pRxVycYzxbcsM4HBdxju-vT_If2WEExOTg1zBWYGogMLa7GWQ \
-d redirect_uri=https%3A%2F%2Fgoogle.com \
-H "Authorization: Basic YjAzYjEyYzk5NTQ0NGQ5OGI3ZDAzZGIwYTkwZWQxNTQ6MjUyOWUyMjMwMWZlNGVlZTk2YzA0NzFmZDc1NTllYjY=" \
https://accounts.spotify.com/api/token
