import {FastifyPluginAsync, FastifyReply, FastifyRequest} from 'fastify'
import {CovidCase} from "../entity/CovidCase";
import {AppDataSource} from "../data-source";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/covidCases', async function (request, reply) {
    return AppDataSource.manager.find(CovidCase)
  })
  const addPostOpts = {
    schema: {
        body: {
          type: 'object',
          properties: {
            userId: {type: 'string'}
          }
        }

      },
    handler: (req: FastifyRequest, reply:FastifyReply) => AppDataSource.manager.save(new CovidCase())
    }
  fastify.post('/covidCases', addPostOpts)
}

export default root;
