import { query } from "./_generated/server";
import { asyncMap } from "./lib/relationships";

export const get = query(async ({ db, storage }) => {
  const products = await db.query("products").collect();
  return await asyncMap(products, async (product) => ({
    ...product,
    image: (await storage.getUrl(product.imageId)) ?? "",
  }));
});
