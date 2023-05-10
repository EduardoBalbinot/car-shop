import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if ((error as Error).message === 'Invalid mongo id') {
      return res.status(422).json({ message: (error as Error).message });
    }
    res.status(500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;