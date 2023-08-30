import { FastifyPluginAsync } from 'fastify'
import {CovidCase} from "../entity/CovidCase";
import {AppDataSource} from "../data-source";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/covidCases', async function (request, reply) {
    return AppDataSource.manager.find(CovidCase)
  })

  fastify.post('/covidCases', async function (request, reply) {
    return AppDataSource.manager.save(CovidCase)
  })
}

export default root;
