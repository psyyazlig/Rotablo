import Fastify from 'fastify';
import catalogRoutes from './modules/catalog/routes';

const server = Fastify({
  logger: true
});

// Sürüm ve Sağlık Kontrolü
server.get('/', async (request, reply) => {
  return { 
    status: 'ok', 
    service: 'Rotablo Core API', 
    version: '1.0.0' 
  };
});

// Domain Modüllerinin (Routes) Kaydı
server.register(catalogRoutes, { prefix: '/api/v1/catalog' });
// V1 İlerleyişinde buraya auth, trips, vehicles vs eklenecektir

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Rotablo Core API listening at http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
