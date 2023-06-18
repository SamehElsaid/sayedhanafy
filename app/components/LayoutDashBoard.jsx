"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LayoutDashBoard({ children }) {
  const adminLogin = useSelector((redux) => redux.admin.open);
  const patchName = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let setTimeNew = null;
    if (!adminLogin) {
      setTimeNew = setTimeout(() => {
        setLoading(true);
      }, 10000);
      router.push("/admin");
    } else {
      setLoading(true);
    }
    return () => clearTimeout(setTimeNew);
  }, [patchName, adminLogin]);
  return (
    <div className="flex || admin">
      <div
        className={`w-[300px] || bg-[#051637] || flex || items-center || justify-center ${
          !loading && "bg-[#5e90f9]"
        } `}
      >
        {loading && (
          <ul className="flex || flex-col || gap-4">
            <li>
              <Link
                href="/admin/dashboard"
                className={`${
                  patchName === "/admin/dashboard"
                    ? "text-[#3962ac]"
                    : "text-white"
                } || hover:text-[#3962ac] || duration-300`}
              >
                Section
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/menu"
                className={`${
                  patchName.includes("/admin/dashboard/menu")
                    ? "text-[#3962ac]"
                    : "text-white"
                } || hover:text-[#3962ac] || duration-300`}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/drivery"
                className={`${
                  patchName.includes("/admin/dashboard/drivery")
                    ? "text-[#3962ac]"
                    : "text-white"
                } || hover:text-[#3962ac] || duration-300`}
              >
                Drivery
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/order"
                className={`${
                  patchName.includes("/admin/dashboard/order")
                    ? "text-[#3962ac]"
                    : "text-white"
                } || hover:text-[#3962ac] || duration-300`}
              >
                Order
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-white || hover:text-[#3962ac] || duration-300"
              >
                Loaction
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div
        className={`${
          !loading && "bg-[#5e90f9]"
        } w-[calc(100%-300px)] || h-screen`}
      >
        {loading && children}
      </div>
    </div>
  );
}

export default LayoutDashBoard;
