import MyHeader from "@/components/myComponents/myHeader";
import { ReactNode } from "react";

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MyHeader />
      {children}
    </>
  );
}
