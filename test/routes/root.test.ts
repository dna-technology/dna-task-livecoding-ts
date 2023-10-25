import { build } from '../helper'
import { CovidCaseDTO } from "../../src/dto/CovidCaseDTO";
import { v4 as uuidv4 } from 'uuid';

const app = build()
test('should get existing covid cases', async () => {
  // given
  // when
  const res = await loadAllCovidCases(app);
  // then
  expect(res.statusCode).toEqual(200);
  const resLength = (JSON.parse(res.payload) as CovidCaseDTO[]).length;
  expect(resLength).toBeGreaterThan(0);
})

test('should create new case', async () => {
  // given
  const uuid = uuidv4()
  const requestBody = { userId: uuid } as CovidCaseDTO
  // when
  const res = await addCovidCase(app, requestBody)
  // then
  expect(res.statusCode).toEqual(200);
  const resList = await loadAllCovidCases(app);
  const matchingItemLength = (JSON.parse(resList.payload) as CovidCaseDTO[]).filter(item => item.userId === uuid).length;
  expect(matchingItemLength).toEqual(1);
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