"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

function About() {
    const tasks = useQuery(api.tasks.get);
    return (
        <div>
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
    </main>
        </div>
    )
}

export default About
