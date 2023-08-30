import { test } from 'tap'
import { build } from '../helper'
import {TestAppDataSource} from "../../src/data-source";

test('should get existing covid cases', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/covidCases'
  })

  t.beforeEach(async t => {
    t.context.connection = await TestAppDataSource.initialize()
  })

  t.afterEach(t => {
    t.context.connection.disconnect()
  })
  t.same(JSON.parse(res.payload), [{ id: 1, userId: "eae12a54-c136-4a94-afc5-3611e558327c" }])
})

test('default root route', async (t) => {
  const app = await build(t)
  const requestBody = {id: 2, userId: "eae12a54-c136-4a94-afc5-3611e558327d"}
  const res = await app.inject({
    url: '/covidCases',
    body: requestBody
  })

  t.beforeEach(async t => {
    t.context.connection = await TestAppDataSource.initialize()
  })

  t.afterEach(t => {
    t.context.connection.disconnect()
  })

  t.same(res.statusCode, 200)
})
