/* eslint-disable @typescript-eslint/prefer-for-of */
function tryDecode(str: string, decode: (encodedURIComponent: string) => string) {
    try {
        return decode(str)
    } catch (error: unknown) {
        console.log('🚀 - file: http.ts - line 27 - error', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return str
    }
}

export interface IAuthData {
    auth_token: string
    auth_permissions: string
    key: string | undefined
}

export function parseContextCookie(str: string) {
    const pairSplitRegExp = /; */
    const decode: (encodedURIComponent: string) => string = decodeURIComponent
    let key: string | undefined = ''
    const obj: IAuthData = {
        key: undefined,
        auth_token: '',
        auth_permissions: '',
    }
    //const opt = options || {}
    const pairs = str.split(pairSplitRegExp)
    const dec = decode

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i]
        let eq_idx = pair?.indexOf('=')

        // skip things that don't look like key=value
        if (eq_idx !== undefined) {
            if (eq_idx < 0) {
                continue
            }
            key = pair?.substr(0, eq_idx).trim()
            let val = pair?.substr(++eq_idx, pair.length).trim()

            // quoted values
            if (val !== undefined) {
                if ('"' == val[0]) {
                    val = val.slice(1, -1)
                }
            }

            // only assign once
            if (key !== undefined) {
                if (undefined == obj[key as keyof IAuthData]) {
                    obj[key as keyof IAuthData] = tryDecode(val ?? '', dec)
                }
            }
        }
    }

    return obj
}
