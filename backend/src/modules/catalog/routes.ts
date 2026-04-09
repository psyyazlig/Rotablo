import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Tekil instance (Gerçek senaryoda Prisma plugin/decorator olarak DI ile verilebilir)
// Şimdilik stub kurulum yapıyoruz
const prisma = new PrismaClient();

const catalogRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {

  // 1. Tüm rotaları listeleme (Cache'li V1 konseptine uygun public endpoint)
  server.get('/routes', async (request, reply) => {
    try {
      const routes = await prisma.route.findMany({
        where: { status: 'active' },
        orderBy: { code: 'asc' }
      });
      
      return reply.code(200).send({
        data: routes,
        meta: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      server.log.error(error);
      return reply.code(500).send({ error: "Internal Server Error" });
    }
  });

  // 2. Etapları listeleme
  server.get('/routes/:id/stages', async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const stages = await prisma.stage.findMany({
        where: { routeId: id },
        orderBy: { sequenceIndex: 'asc' },
        include: { sideQuests: true } // Side questler de dahil
      });
      
      return reply.code(200).send({
        data: stages,
        meta: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      server.log.error(error);
      return reply.code(500).send({ error: "Internal Server Error" });
    }
  });

};

export default catalogRoutes;
