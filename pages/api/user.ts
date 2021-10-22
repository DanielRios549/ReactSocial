// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../src/types/user'


const handler = (request: NextApiRequest, response: NextApiResponse<User>) => {
    const username = 'DanielRios549'
    const url = `https://api.github.com/users/${username}`

    fetch(url).then(async (data) => {
        const github = await data.json()

        response.status(200).json({
            name: github.name,
            user: github.login,
            image: github.avatar_url
        })
    });
}

export default handler
