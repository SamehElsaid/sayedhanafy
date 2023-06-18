import LayoutDashBoard from "@/app/components/LayoutDashBoard";
import React from "react";

function RootLayout({ children }) {
  return (
   <LayoutDashBoard>{children}</LayoutDashBoard>
  );
}

export default RootLayout;
