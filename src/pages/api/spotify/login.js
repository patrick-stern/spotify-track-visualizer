import queryString from 'query-string';
import { serialize } from 'cookie';

export default function handler(req, res) {
    const auth_id = Math.random().toString(36).slice(5, 11).toUpperCase();

    const query = queryString.stringify({
      response_type: 'code',
      scope: ["playlist-read-collaborative playlist-read-private streaming user-read-email user-read-private user-read-playback-state user-read-recently-played user-modify-playback-state"],
      state: auth_id,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    });

    res.setHeader('Set-Cookie', serialize('SPOTIFY_STATE_ID', auth_id, { path: '/' }));
    res.redirect('https://accounts.spotify.com/authorize?' + query)
}
  