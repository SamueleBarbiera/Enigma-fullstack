import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error'
import { NextPageContext } from 'next'

export type ErrorPageProps = {
    err: Error
    statusCode: number
}

const Error = ({ statusCode, err }: ErrorPageProps): JSX.Element => {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server , ${JSON.stringify(err)}`
                : `An error occurred on client, ${JSON.stringify(err)}`}
        </p>
    )
}

Error.getInitialProps = async ({ err, res }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode, err }
}

export default Error
