import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'


export default function login(resquest: NextApiRequest, response: NextApiResponse) {
    const badResponse = () => {
        return response.status(400).json({
            message: 'Nothing to show'
        })
    }

    if (resquest.method === 'POST') {
        const user = resquest.body.user

        if (user === undefined) {
            badResponse()
        }
        else {
            response.status(200).json({
                token: jwt.sign({user}, process.env.JWT_SECRET, {algorithm: 'HS256'})
            });
        }
    }
    else {
        badResponse()
    }
}