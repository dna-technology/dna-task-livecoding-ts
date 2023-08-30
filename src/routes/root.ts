import {FastifyPluginAsync, FastifyReply, FastifyRequest} from 'fastify'
import {CovidCase} from "../entity/CovidCase";
import {AppDataSource} from "../data-source";
import {CovidCaseDTO} from "../dto/CovidCaseDTO";

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
    handler: (req: FastifyRequest, reply:FastifyReply) => AppDataSource.manager.save(new CovidCase((req.body as CovidCaseDTO).userId))
    }
  fastify.post('/covidCases', addPostOpts)
}

export default root;
