// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken'

const protect = async(req, res, next) => {
    // --- EDIT START: Extract raw token from Bearer string ---
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; // Splits "Bearer <token>" and takes index 1
    // --- EDIT END ---

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export default protect