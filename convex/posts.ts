import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";
import {authComponent} from "./betterAuth/auth";

export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        storageId: v.optional(v.id("_storage")),   // was called imageUrl before — renamed
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) throw new ConvexError("You must be logged in to perform this action.");

        const resolvedImageUrl = args.storageId
            ? await ctx.storage.getUrl(args.storageId)
            : undefined;

        await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user._id,
            imageUrl: resolvedImageUrl ?? undefined,   // the real URL, matches schema.ts
        });
    },
});

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) throw new ConvexError("Login required");
        return await ctx.storage.generateUploadUrl();
    },
});


export const getPosts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db.query("posts").collect();
        return posts;
    },
});