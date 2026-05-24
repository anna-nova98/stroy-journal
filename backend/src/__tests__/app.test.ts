import request from 'supertest';
import app from '@/index';

describe('API Tests', () => {
  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Work Types API', () => {
    it('should return list of work types', async () => {
      const response = await request(app).get('/api/work-types');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('Work Logs API', () => {
    it('should return list of work logs', async () => {
      const response = await request(app).get('/api/work-logs');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter work logs by date', async () => {
      const response = await request(app)
        .get('/api/work-logs')
        .query({ date: '2024-01-15' });
      expect(response.status).toBe(200);
    });

    it('should return 404 for non-existent work log', async () => {
      const response = await request(app).get('/api/work-logs/non-existent-id');
      expect(response.status).toBe(404);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent route', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});