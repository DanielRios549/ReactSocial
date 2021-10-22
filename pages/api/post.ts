import type { NextApiRequest, NextApiResponse } from 'next'


const post = (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const token = process.env.DATO_READ_TOKEN
        const url = 'https://graphql.datocms.com/'

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

export default post