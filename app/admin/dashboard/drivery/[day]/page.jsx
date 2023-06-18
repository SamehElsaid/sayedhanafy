
import Day from "@/app/components/Day";
import React from "react";

function page({params:{day}}) {
  return (
   <Day day={day}/>
  );
}

export default page;
