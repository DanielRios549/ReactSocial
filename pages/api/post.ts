import type { NextApiRequest, NextApiResponse } from 'next'


export default function post(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        const token = process.env.BACKEND_API_TOKEN
        const url = process.env.BACKEND_API_URL

        response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({query: `
                query {
                    allPosts {
                        id
                        user
                        text
                        image
                        _status
                        _firstPublishedAt
                    }
                }`
            })
        })
        .then(async (data) => {
            const dato = await data.json()
            response.status(200).json(dato)
        })
    }
    else {
        response.json({
            message: 'Nothing to show.'
        })
    }
}
