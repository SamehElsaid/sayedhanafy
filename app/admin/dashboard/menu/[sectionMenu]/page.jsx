import SectionMenu from "@/app/components/SectionMenu";
import React from "react";
function page({ params: { sectionMenu } }) {
  return <SectionMenu sectionMenu={sectionMenu} />;
}

export default page;
