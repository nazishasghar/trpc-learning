import { JwtPayload } from 'jsonwebtoken'

export interface jwtPayLoad extends JwtPayload {
    uuid: string
}
