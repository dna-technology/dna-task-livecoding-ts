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
  // given
  const app = await build(t)
  // when
  const res = await loadAllCovidCases(app);
  // then
  t.same(res.statusCode, 200)
  t.same((JSON.parse(res.payload) as CovidCaseDTO[]).length > 0, true)
})

test('should create new case', async (t) => {
  // given
  const app = await build(t)
  const uuid = uuidv4()
  const requestBody = {userId: uuid} as CovidCaseDTO
  // when
  const res = await addCovidCase(app, requestBody)
  // then
  t.same(res.statusCode, 200)
  const resList = await loadAllCovidCases(app);
  t.same((JSON.parse(resList.payload) as CovidCaseDTO[]).filter(item => item.userId === uuid).length > 0,
    true)
})

async function loadAllCovidCases(app: any) {
  return await app.inject({
    url: '/cases'
  });
}

async function addCovidCase(app: any, requestBody: CovidCaseDTO) {
  return await app.inject({
    method: 'POST',
    url: '/cases',
    body: requestBody
  });
}