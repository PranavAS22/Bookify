import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
    // Extract cookies from headers
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
        return res.status(401).json({ message: "Unauthorized: No cookies found" });
    }

    // Parse cookies into an object
    const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => c.split("=")));
    const token = cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
        // Verify JWT token
        const verified = jwt.verify(token, process.env.SECRET_KEY);

        // Attach user data to request object
        req.user = {
            id: verified.userId,  // Fix ID reference
            userName: verified.userName,  // Fix username reference
            role: verified.userRole,  // Fix role reference
        };

        next(); // Proceed to next middleware
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export { auth };
