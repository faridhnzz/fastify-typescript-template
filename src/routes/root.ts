import { FastifyInstance } from 'fastify';
export default async function (app: FastifyInstance) {
  app.route({
    method: ['GET'],
    url: '/',
    handler: async function () {
      return 'Hello from Fayln.';
    },
  });

  app.route({
    method: ['GET'],
    url: '/favicon.ico',
    logLevel: 'silent',
    handler: async function (req, reply) {
      return reply.callNotFound();
    },
  });
}
