import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";
import {authComponent} from "./betterAuth/auth";

export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        storageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);

        if (!user) {
            throw new ConvexError("You must be logged in to perform this action.");
        }

        const image = args.storageId ? await ctx.storage.getUrl(args.storageId) : undefined;

        await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user._id,
            image: image ?? undefined,
        });
    },
});


export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) throw new ConvexError("You must be logged in to perform this action.");
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