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
  await client.quit();
  return id;
}

export async function getDishData(name) {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect()
  const repository = new Repository(dishesSchema, client);
  console.log( 'name: ', name )

  const dishDetails = await repository.search().where('name').eq(name+'*').return.all();
  console.log( 'userData: ', dishDetails )
  client.quit();

  return dishDetails || false;

}

export async function createDishes(dishes, progressCallback) {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();

  const repository = new Repository(dishesSchema, client);
  const totalDishes = dishes.length;
  const ids = [];

  for (let i = 0; i < totalDishes; i++) {
    const id = await repository.save(dishes[i]);
    ids.push(id);

    // Calculate and report progress
    const progress = ((i + 1) / totalDishes) * 100;
    progressCallback(progress);
  }
  await client.quit();
  return ids;
}

export async function checkDishPresent(name) {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("name: ", name)
  const repository = new Repository(dishesSchema, client);
  const dishName = await repository.search().where('name').equals(name).return.all();
  client.quit();
  return dishName || false;
}

// Needs to be done only once per Schema Change
export async function createIndex() {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect()

  const repository = new Repository(dishesSchema, client);
  await repository.createIndex();
  await client.quit();
}

