import {test} from 'tap'
import {build} from '../helper'
import {TestAppDataSource} from "../../src/data-source";
import {CovidCaseDTO} from "../../src/dto/CovidCaseDTO";

test('should get existing covid cases', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/covidCases'
  })
  t.beforeEach(async () => {
    await TestAppDataSource.initialize()
  })
  t.afterEach(t => {
    t.context.connection.disconnect()
  })
  t.same(res.statusCode, 200)
  t.same((JSON.parse(res.payload) as CovidCaseDTO[]).length > 0, true )
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
