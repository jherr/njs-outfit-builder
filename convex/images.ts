import { internalMutation } from "./_generated/server";

export const getUploadUrl = internalMutation(async ({ storage }) => {
  return await storage.generateUploadUrl();
});
