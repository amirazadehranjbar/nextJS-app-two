import {mutation} from "./_generated/server";
import {v} from "convex/values";

export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        authorId: v.string()
    },
    handler: async (ctx, args) => {
        const blogArticle = await ctx.db.insert("posts",
            {
                title: args.title,
                body: args.body,
                authorId: args.body
            }
        );
        // do something with `taskId`
    },
});