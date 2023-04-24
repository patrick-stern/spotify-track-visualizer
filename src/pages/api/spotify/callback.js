// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import request from 'request';
import { serialize } from 'cookie';

export default function handler(req, res) {
    const code = req.query.code || null

    if (code === null) return res.json({
        error: true,
        message: 'No login code present.'
    })

    const config = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            Authorization: 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
    }

    request.post(config, (error, response, {
        access_token,
        refresh_token
    }) => {
        const cookies = [
            serialize('SPOTIFY_ACCESS_TOKEN', access_token, { path: '/' }),
            serialize('SPOTIFY_REFRESH_TOKEN', refresh_token, { path: '/' }),
            serialize('SPOTIFY_REFRESH_CODE', code, { path: '/' }),
        ]
        res.setHeader('Set-Cookie', cookies);

        res.redirect(process.env.PROJECT_ROOT)
    })
}