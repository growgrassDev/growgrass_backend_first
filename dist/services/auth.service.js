"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
class AuthService {
    jwtSecret;
    jwtRefreshSecret;
    jwtExpiresIn;
    jwtRefreshExpiresIn;
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
        this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
        this.jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
    }
    async register(email, password, name) {
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = new User_1.User({
            email,
            password,
            name,
        });
        return await user.save();
    }
    async login(email, password) {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        return this.generateTokens(user);
    }
    async googleLogin(profile) {
        const { id, emails, displayName, photos } = profile;
        if (!emails?.[0]?.value) {
            throw new Error('Email is required from Google profile');
        }
        const email = emails[0].value;
        let user = await User_1.User.findOne({ googleId: id });
        if (!user) {
            user = await User_1.User.findOne({ email });
            if (user) {
                user.googleId = id;
                await user.save();
            }
            else {
                user = await User_1.User.create({
                    email,
                    name: displayName,
                    googleId: id,
                    avatar: photos?.[0]?.value || undefined,
                });
            }
        }
        return this.generateTokens(user);
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, this.jwtRefreshSecret);
            const user = await User_1.User.findById(decoded.userId);
            if (!user || user.refreshToken !== refreshToken) {
                throw new Error('Invalid refresh token');
            }
            return this.generateTokens(user);
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    async logout(userId) {
        await User_1.User.findByIdAndUpdate(userId, { refreshToken: null });
    }
    async generateTokens(user) {
        const payload = {
            userId: user._id.toString(),
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, this.jwtSecret, {
            expiresIn: this.jwtExpiresIn,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, this.jwtRefreshSecret, {
            expiresIn: this.jwtRefreshExpiresIn,
        });
        user.refreshToken = refreshToken;
        await user.save();
        return {
            accessToken,
            refreshToken,
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map