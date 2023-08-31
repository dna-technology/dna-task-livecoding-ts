import {FastifyPluginAsync, FastifyRequest} from 'fastify'
import {CovidCase} from "../entity/CovidCase";
import {AppDataSource} from "../data-source";
import {CovidCaseDTO} from "../dto/CovidCaseDTO";

const cases: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/cases', async function () {
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
    handler: (req: FastifyRequest) => AppDataSource.manager.save(new CovidCase((req.body as CovidCaseDTO).userId))
    }
  fastify.post('/cases', addPostOpts)
}

export default cases;
