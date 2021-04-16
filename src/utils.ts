import jwt from "jsonwebtoken";

const getTokenPayload = (token: string) =>
  // @ts-ignore
  jwt.verify(token, process.env.APP_SECRET);

export const getUserId = (req: any, authToken: string = "") => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
};
