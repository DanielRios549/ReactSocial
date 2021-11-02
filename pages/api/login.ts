import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../src/types/user'
import Relation from '../../src/types/relation'


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
        const url = 'https://api.github.com/users'
        const username = resquest.body.user

        const headers = {
            Authorization: `Basic ${auth}`
        }

        const user = await fetch(`${url}/${username}`, {
            headers: headers
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
                image: user.avatar_url
            }

            // Find more info after verify if the user exists

            const followFetch = async (link: string) => {
                const items = await fetch(link, {
                    headers: headers
                })
                .then(async (data) => {
                    const github: any[] = await data.json()
                    const returnData: Relation[] = []
    
                    github.map((item) => {
                        returnData.push({
                            name: item.login,
                            image: item.avatar_url
                        })
                    })
    
                    return returnData
                })

                return items
            }

            const following = await followFetch(`${url}/${info.user}/following`)

            const followers = await followFetch(`${url}/${info.user}/followers`)

            response.status(200).json({
                token: jwt.sign(info, process.env.JWT_SECRET, {algorithm: 'HS256'}),
                following: following,
                followers: followers
            });
        }
    }
    else {
        badResponse(400, 'Nothing to show')
    }
}