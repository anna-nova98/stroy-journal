import { Request, Response, NextFunction } from 'express';
import { config } from '@/config';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Ошибка валидации',
      details: error.message,
    });
  }

  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      error: 'Ресурс не найден',
    });
  }

  // Для Prisma ошибок
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      error: 'Ошибка базы данных',
      details: config.nodeEnv === 'development' ? error.message : undefined,
    });
  }

  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    details: config.nodeEnv === 'development' ? error.message : undefined,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    path: req.path,
    method: req.method,
  });
};