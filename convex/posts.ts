import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";
import {authComponent} from "./betterAuth/auth";
import {toast} from "sonner";

export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        // authorId: v.string()
    },
    handler: async (ctx, args) => {

        const user =await authComponent.safeGetAuthUser(ctx);

        if(!user){
            throw new ConvexError("You must be logged in to perform this action.");

        }

        const blogArticle = await ctx.db.insert("posts",
            {
                title: args.title,
                body: args.body,
                authorId: user._id
            }
        );
        // do something with `blogArticle`
    },
});

export const getPosts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db.query("posts").collect();
        return posts;
    },
});