import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../src/types/user'


export default function user(request: NextApiRequest, response: NextApiResponse<User>) {
    const username = request.body.user
    const url = `https://api.github.com/users/${username}`

    response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')

    fetch(url).then(async (data) => {
        const github = await data.json()

        response.status(200).json({
            name: github.name,
            user: github.login,
            image: github.avatar_url
        })
    });
}
