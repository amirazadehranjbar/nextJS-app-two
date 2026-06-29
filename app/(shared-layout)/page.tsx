import {CardSplitAccordion} from "@/components/myComponents/card-split-accordion";


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center bg-chart-4 text-gray-500 h-full">
            <h1 className="text-3xl text-foreground">its from main page</h1>
            <CardSplitAccordion/>
        </div>
    );
}
