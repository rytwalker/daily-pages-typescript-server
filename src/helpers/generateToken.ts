import jwt from "jsonwebtoken";

export function generateToken(writer: any) {
  const payload = {
    writerId: writer.id,
    email: writer.email
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret!, options);
}
