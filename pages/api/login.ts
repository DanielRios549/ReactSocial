import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../src/types/user'


export default async function login(resquest: NextApiRequest, response: NextApiResponse) {
    //response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')

    const badResponse = (error: number, message: string) => {
        return response.status(error).json({
            message: message
        })
    }

    if (resquest.method === 'POST') {
        // Authenticaton to use Github API
        // Without this you can use the API only 60 times per hours

        const auth = `${process.env.GITHUB_USER}:${process.env.GITHUB_TOKEN}`
        const url = `https://api.github.com/users`
        const username = resquest.body.user

        const user = await fetch(`${url}/${username}`, {
            headers: {
                Authorization: `Basic ${auth}`
            }
        })
        .then(async (data) => await data.json())

        if (user.message === 'Not Found') {
            badResponse(404, 'User Not Found on Github')
        }
        else if(user.message !== undefined) {
            badResponse(403, user.message)
        }
        else {
            const info: User = {
                user: user.login,
                name: user.name,
                image: user.avatar_url,
            }
            response.status(200).json({
                token: jwt.sign(info, process.env.JWT_SECRET, {algorithm: 'HS256'})
            });
        }
    }
    else {
        badResponse(400, 'Nothing to show')
    }
}