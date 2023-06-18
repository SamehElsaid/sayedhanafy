"use client";
import React from "react";
import LayOutGetLoc from "./LayOutGetLoc";
import { Provider } from "react-redux";
import store from "../redux/Store";
import { usePathname } from "next/navigation";
function Providers({ children }) {
  const pathName = usePathname();
  return (
    <Provider store={store}>
      {pathName.includes("admin") ? (
        <div className="">{children}</div>
      ) : (
        <LayOutGetLoc>{children}</LayOutGetLoc>
      )}
    </Provider>
  );
}

export default Providers;
