import { mutation } from "./_generated/server";

export const getUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
