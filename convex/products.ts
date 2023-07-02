import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query(async ({ db, storage }) => {
  return Promise.all(
    (await db.query("products").collect()).map(async (product) => ({
      ...product,
      image: (await storage.getUrl(product.imageId)) ?? "",
    }))
  );
});

export const add = mutation({
  args: {
    imageId: v.string(),
    title: v.string(),
    type: v.string(),
    price: v.number(),
  },
  handler: async ({ db }, { imageId, title, price, type }) => {
    await db.insert("products", {
      title,
      type,
      price,
      imageId,
    });
  },
});