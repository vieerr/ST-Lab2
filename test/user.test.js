// Importar el cliente HTTP supertest para pruebas
const request = require('supertest');
// Importar app Express
const app = require('../src/app');

describe('User API Tests', () => {
  // Prueba que GET devuelva lista vacía inicialmente
  test('GET /api/users should return an empty list initially', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Prueba que POST cree un nuevo usuario correctamente
  test('POST /api/users should create a new user correctly', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  // Prueba que el endpoint rechace peticiones inválidas
  test('POST /api/users should reject invalid requests', async () => {
    // Sin name
    const response1 = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com' });

    expect(response1.status).toBe(400);
    expect(response1.body).toHaveProperty('message');

    // Sin email
    const response2 = await request(app)
      .post('/api/users')
      .send({ name: 'Test User' });

    expect(response2.status).toBe(400);
    expect(response2.body).toHaveProperty('message');

    // Sin datos
    const response3 = await request(app)
      .post('/api/users')
      .send({});

    expect(response3.status).toBe(400);
    expect(response3.body).toHaveProperty('message');
  });

  // Prueba de flujo completo: crear usuarios y verificar con GET
  test('Should create users and retrieve them with GET', async () => {
    // Crear primer usuario
    const user1 = { name: 'Alice', email: 'alice@example.com' };
    await request(app).post('/api/users').send(user1);

    // Crear segundo usuario
    const user2 = { name: 'Bob', email: 'bob@example.com' };
    await request(app).post('/api/users').send(user2);

    // Verificar que GET devuelve ambos usuarios
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  // Prueba del manejador 404
  test('Should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Route not found');
  });
});
