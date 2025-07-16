import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default layout;
