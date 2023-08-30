import {test, afterEach, beforeEach} from 'tap'
import {build} from '../helper'
import {AppDataSource} from "../../src/data-source";
import {CovidCaseDTO} from "../../src/dto/CovidCaseDTO";

beforeEach(async () => {
  await AppDataSource.initialize()
})
afterEach(async () => {
  await AppDataSource.destroy()
})

test('should get existing covid cases', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/covidCases'
  })
  t.same(res.statusCode, 200)
  t.same((JSON.parse(res.payload) as CovidCaseDTO[]).length > 0, true)
})

test('default root route', async (t) => {
  const app = await build(t)
  const requestBody = {userId: "eae12a54-c136-4a94-afc5-3611e558327d"} as CovidCaseDTO
  const res = await app.inject({
    method: 'POST',
    url: '/covidCases',
    body: requestBody
  })
  t.same(res.statusCode, 200)
})
