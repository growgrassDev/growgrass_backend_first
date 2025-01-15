import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { z } from 'zod';

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = registerSchema.parse(req.body);
      const user = await authService.register(email, password, name);
      
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }
      
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const tokens = await authService.login(email, password);

      res.status(200).json({
        message: 'Login successful',
        ...tokens,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid input data', details: error.errors });
        return;
      }

      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token is required' });
        return;
      }

      const tokens = await authService.refreshToken(refreshToken);
      res.status(200).json(tokens);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      await authService.logout(userId);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const authController = new AuthController(); 