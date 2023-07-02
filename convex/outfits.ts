import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query(async ({ db, storage }) => {
  const outfits = await db.query("outfits").order("desc").take(10);

  return Promise.all(
    outfits.map(async (outfit) => {
      const products = await Promise.all(
        outfit.products.map(async (id) => {
          const product = await db.get(id);
          const image = await storage.getUrl(product?.imageId ?? "");

          return {
            ...product,
            image,
          };
        })
      );

      return {
        ...outfit,
        products,
      };
    })
  );
});

export const add = mutation({
  args: {
    products: v.array(v.id("products")),
    title: v.string(),
  },
  handler: async ({ db, auth }, { products, title }) => {
    const identity = await auth.getUserIdentity();
    if (identity == null) {
      throw new Error("Unauthenticated call to mutation");
    }

    await db.insert("outfits", {
      products,
      title,
      author: identity?.name ?? "",
    });
  },
});
