import { Entity, Schema, Repository } from "redis-om";
import { createClient } from "redis";
const client = createClient({ url: process.env.REDIS_URL });
let userSchema = new Schema(
  "user",
  {
    name: { type: "string", textSearch: true },
    email: { type: "string", textSearch: true },
    description: { type: "string", textSearch: true },
    // "dishes-weekdays-lunch": { type: "string" },
    // "dishes-weekdays-dinner": { type: "string" },
    // "dishes-weekends-lunch": { type: "string" },
    // "dishes-weekends-dinner": { type: "string" },
    weekdaysLunch: { type: 'string[]', path: '$.favouriteDishes.weekdaysLunch[*]' },
    weekdaysDinner: { type: 'string[]', path: '$.favouriteDishes.weekdaysDinner[*]' },
    weekendsLunch: { type: 'string[]', path: '$.favouriteDishes.weekendsLunch[*]' },
    weekendsDinner: { type: 'string[]', path: '$.favouriteDishes.weekendsDinner[*]' },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createUser(data) {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect()
  const repository = new Repository(userSchema, client)

  // const User = repository.createEntity(data);
  console.log("Data Came: ", data)
  const id = await repository.save(data);
  console.log('Id', id)
  return id;
}

// Needs to be done only once per Schema Change
export async function createIndex() {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect()
  const repository = new Repository(userSchema, client);
  await repository.createIndex();
}

export async function getUserData(email) {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect()
  const repository = new Repository(userSchema, client);
  console.log( 'email: ', email )

  const userDetails = await repository.search().where('email').equals(email).return.all();
  console.log( 'userData: ', userDetails )
  client.quit();

  return userDetails || false;

}

export async function addDishForUser(entityId, dishId) {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect()
  const repository = new Repository(userSchema, client);
  const userData = await repository.fetch(entityId)
  console.log('userData: ', userData)
  userData.favouriteDishes.weekdaysLunch.push(dishId)
  const id = await repository.save(userData);
  conole.log('updated Data: ', id)
  return id;
}

