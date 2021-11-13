import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
    const url = process.env.SITE_URL
    const {token} = request.cookies

    const page = request.page.name || '/none'
    // Pages to intercept

    const authPages = [
        '/'
    ]

    if (authPages.includes(page)) {
        if (token !== undefined) {
            const {isAuthenticated} = await fetch(url + '/api/auth', {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then((data) => data.json())
            // Token is not valid

            if (isAuthenticated !== true) {
                return NextResponse.redirect('/login', 308)
            }
        }

        // Token does not exists

        else {
            return NextResponse.redirect('/login', 308)
        }
    }
}