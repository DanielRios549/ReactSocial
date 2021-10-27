import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'


export default function auth(request: NextApiRequest, response: NextApiResponse) {
    const badResponse = () => {
        return response.status(200).json({
            isAuthenticated: false
        })
    }

    if (request.method === 'POST') {
        const token = request.headers.authorization
        if (token === undefined) {
            badResponse()
        }
        else {
            let verify = undefined
    
            try {
                verify = jwt.verify(token, process.env.JWT_SECRET)
            }
            catch {
                verify = undefined
            }

            let isAuthenticated = false

            if (verify !== undefined) {
                isAuthenticated = true
            }

            response.status(200).json({isAuthenticated});
        }
    }
    else {
        badResponse()
    }
}