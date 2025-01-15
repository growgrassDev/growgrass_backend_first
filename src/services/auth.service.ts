import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/User';
import { Types } from 'mongoose';

interface TokenPayload {
  userId: string;
  role: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly jwtRefreshExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET as string;
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
    this.jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  public async register(email: string, password: string, name: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({
      email,
      password,
      name,
    });

    return await user.save();
  }

  public async login(email: string, password: string): Promise<AuthTokens> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return this.generateTokens(user);
  }

  public async googleLogin(profile: any): Promise<AuthTokens> {
    const { id, emails, displayName, photos } = profile;

    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = await User.findOne({ email: emails[0].value });
      if (user) {
        user.googleId = id;
        await user.save();
      } else {
        user = await User.create({
          email: emails[0].value,
          name: displayName,
          googleId: id,
          avatar: photos[0]?.value,
        });
      }
    }

    return this.generateTokens(user);
  }

  public async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret) as TokenPayload;
      const user = await User.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  public async logout(userId: Types.ObjectId): Promise<void> {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  private async generateTokens(user: IUser): Promise<AuthTokens> {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      role: user.role,
    };

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });

    const refreshToken = jwt.sign(payload, this.jwtRefreshSecret, {
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

export const authService = new AuthService(); 