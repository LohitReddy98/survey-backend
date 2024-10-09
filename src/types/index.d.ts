
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    role: string;
    iat: number;
    exp: number;
  };
}
