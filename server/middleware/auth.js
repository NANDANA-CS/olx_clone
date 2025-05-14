import pkg from "jsonwebtoken";

const { verify } = pkg;
export default async function auth(req, res, next) {
    try {
        console.log("Auth middleware");
        const key = req.headers.authorization;
        if (!key || !key.startsWith("Bearer ")) {
            console.log("no token");
            return res.status(403).json({ message: "Token missing" });
        }
        const token = key.split(" ")[1];
        const auth = await verify(token, process.env.JWT_KEY);
        req.user = auth.id;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(403).json({ message: "Unauthorized - Invalid token" });
    }
}


// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };