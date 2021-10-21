// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string,
    user: string
}

const handler = (request: NextApiRequest, response: NextApiResponse<Data>) => {
    response.status(200).json({
        name: 'Daniel Rios',
        user: 'DanielRios549'
    })
}

export default handler
