import { Request, Response, NextFunction } from 'express';
import { config } from '@/config';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    res.status(400).json({
      error: 'Ошибка валидации',
      details: error.message,
    });
    return;
  }

  if (error.name === 'NotFoundError') {
    res.status(404).json({
      error: 'Ресурс не найден',
    });
    return;
  }

  // Для Prisma ошибок
  if (error.name === 'PrismaClientKnownRequestError') {
    res.status(400).json({
      error: 'Ошибка базы данных',
      details: config.nodeEnv === 'development' ? error.message : undefined,
    });
    return;
  }

  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    details: config.nodeEnv === 'development' ? error.message : undefined,
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Маршрут не найден',
    path: req.path,
    method: req.method,
  });
};