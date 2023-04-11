import { createClient } from "redis";
import { Entity, Schema, Repository } from "redis-om";

const client = new createClient({ url: process.env.REDIS_URL });
let dishesSchema = new Schema(
  'dishes',
  {
    name: { type: "string", textSearch: true },
    description: { type: "string", textSearch: true },
    image: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createDish(data) {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("Data Came: ", data)
  const repository = new Repository(dishesSchema, client);

  const id = await repository.save(data);
  console.log('Id', id)
  return id;
}

export async function checkDishPresent(name) {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("name: ", name)
  const repository = new Repository(dishesSchema, client);
  const dishName = await repository.search().where('name').equals(name).return.all();
  await client.quit();
  return dishName || false;

}

// Needs to be done only once per Schema Change
export async function createIndex() {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect()

  const repository = new Repository(dishesSchema, client);
  await repository.createIndex();
}

