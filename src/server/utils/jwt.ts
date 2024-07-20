import { TRPCError } from '@trpc/server'
import jwt from 'jsonwebtoken'
import { jwtPayLoad } from '~/types/jwtPayload'

/**
 * Verifies a JSON Web Token (JWT) asynchronously.
 * @param {string} token - The JWT to verify.
 * @param {string} secret - The secret key to use for verification.
 * @returns {Promise<jwtPayLoad>} - A promise that resolves with the decoded payload if verification is successful, or rejects with an error if verification fails.
 */
export const jwtAsyncVerify = async (token: string, secret: string): Promise<jwtPayLoad> => {
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.verify(token, secret)
            resolve(payload as jwtPayLoad)
        } catch (err) {
            reject(err as TRPCError)
        }
    })
}

/**
 * Signs a payload into a JSON Web Token (JWT) asynchronously.
 * @param {object} payload - The payload to sign.
 * @param {string} secret - The secret key to use for signing.
 * @param {string} expiresIn - The expiration time for the token.
 * @returns {Promise<string>} - A promise that resolves with the signed token if successful, or rejects with an error if signing fails.
 */
export const jwtAsyncSignIn = async (payload: object, secret: string, expiresIn: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(payload, secret, {
                expiresIn,
            })
            resolve(token)
        } catch (err) {
            reject(err as TRPCError)
        }
    })
}
