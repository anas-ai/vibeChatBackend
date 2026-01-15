import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET! as string, { expiresIn: '15m' })
}


export const generateRefreshToken =  (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' })
}

