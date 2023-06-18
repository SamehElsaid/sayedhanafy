
import DayOrder from "@/app/components/DayOrder";
import React from "react";

function page({params:{day}}) {
  return (
   <DayOrder day={day}/>
  );
}

export default page;
