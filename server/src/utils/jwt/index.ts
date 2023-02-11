
import jwt, {JwtPayload} from 'jsonwebtoken';

export const generateToken = (data : Object)  => {
  return  jwt.sign(data, process.env.JWT_SECRET_KEY as string, {expiresIn: "2d"})
}

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY as string, {complete: true}) as JwtPayload;
}