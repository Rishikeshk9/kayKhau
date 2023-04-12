import { createDishes } from "../../utils/dishesSchema";
import fs from "fs";
import csvParser from "csv-parser";
export default async function handler(req, res) {
  console.log("Request Body: ", req.body);
  const { key } = req.body;
  if (key === process.env.KEY) {
    const csvFilePath = "db/cuisines.csv";
    const imagesDirectory = "db/image_for_cuisines";
    loadCSVAndSaveDishes(
      csvFilePath,
      imagesDirectory,
      (progress) => {
        console.log(`Progress: ${progress.toFixed(2)}%`);
      }
    )
      .then((ids) => {
        console.log(`Successfully saved dishes with ids: ${ids.join(", ")}`);
      })
      .catch((error) => {
        console.error(`Error saving dishes: ${error}`);
      });
  }
  res.status(200).json({ id: "done" });
}

async function loadCSVAndSaveDishes(filePath, imagesDirectory, progressCallback) {
    const dishes = [];
  
    // Read and sort image filenames
    const imageFilenames = fs.readdirSync(imagesDirectory).sort();
  
    return new Promise((resolve, reject) => {
      let rowIndex = 0;
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => {
          const { name } = data;
  
          // Find the corresponding image filename based on the row number
          const imageFilename = imageFilenames.find((filename) =>
            filename.startsWith(`${rowIndex + 1}.`)
          );
  
          if (imageFilename) {
            const imageUrl = `https://nftstorage.link/ipfs/bafybeihcf6akls2h5n3457zuib2kjjs6amwkisy33poaxyyd66urey273a/${imageFilename}`;
            dishes.push({
              name,
              image: imageUrl,
              description: "",
            });
          } else {
            console.error(`Image not found for dish: ${name}`);
          }
  
          rowIndex++;
        })
        .on("end", async () => {
          try {
            const ids = await createDishes(dishes, progressCallback);
            resolve(ids);
          } catch (error) {
            reject(error);
          }
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
