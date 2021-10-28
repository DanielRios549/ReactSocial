import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'


export default async function login(resquest: NextApiRequest, response: NextApiResponse) {
    // Authenticaton to use Github API
    // Without this you can use the API only 60 times per hours

    const auth = `${process.env.GITHUB_USER}:${process.env.GITHUB_TOKEN}`
    const url = `https://api.github.com/users`
    console.log(auth)

    //response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')

    const badResponse = (error: number, message: string) => {
        return response.status(error).json({
            message: message
        })
    }

    if (resquest.method === 'POST') {
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
            response.status(200).json({
                token: jwt.sign({user}, process.env.JWT_SECRET, {algorithm: 'HS256'})
            });
        }
    }
    else {
        badResponse(400, 'Nothing to show')
    }
}