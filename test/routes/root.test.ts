import {afterEach, beforeEach, test} from 'tap'
import {build} from '../helper'
import {AppDataSource} from "../../src/data-source";
import {CovidCaseDTO} from "../../src/dto/CovidCaseDTO";
import {v4 as uuidv4} from 'uuid';

beforeEach(async () => {
  await AppDataSource.initialize()
})
afterEach(async () => {
  await AppDataSource.destroy()
})

test('should get existing covid cases', async (t) => {
  const app = await build(t)
  const res = await loadAllCovidCases(app);
  t.same(res.statusCode, 200)
  t.same((JSON.parse(res.payload) as CovidCaseDTO[]).length > 0, true)
})

test('default root route', async (t) => {
  const app = await build(t)
  const uuid = uuidv4()
  const requestBody = {userId: uuid} as CovidCaseDTO
  const res = await addCovidCase(app, requestBody)
  t.same(res.statusCode, 200)
  const resList = await loadAllCovidCases(app);
  t.same((JSON.parse(resList.payload) as CovidCaseDTO[]).filter(item => item.userId === uuid).length > 0,
    true)
})

async function loadAllCovidCases(app: any) {
  return await app.inject({
    url: '/covidCases'
  });
}

async function addCovidCase(app: any, requestBody: CovidCaseDTO) {
  return await app.inject({
    method: 'POST',
    url: '/covidCases',
    body: requestBody
  });
}