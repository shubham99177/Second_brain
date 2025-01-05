import Jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = Jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
  }
  req.user = decoded;

  next();
};
