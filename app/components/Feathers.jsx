import Image from "next/image";
import React from "react";

function Feathers() {
  return (
    <div className="flex || container || justify-between || lg:gap-10 || my-20 || flex-wrap || lg:flex-nowrap">
      <div className="h-[280px] || relative || group || w-[45%] || lg:w-[25%] || overflow-hidden">
       
      </div>
      <div className="h-[280px] || relative || group || w-[50%] || overflow-hidden || hidden || lg:block">
        <Image
          src="/assets/img/2.jpg"
          alt="Feathers_2"
          fill
          sizes="100%, 100%"
          objectFit="cover"
          quality={100}
          className="group-hover:scale-110 || duration-500"
        />
      </div>
      <div className="h-[280px] || relative || group || w-[50%] || lg:w-[25%] || overflow-hidden">
        <Image
          src="/assets/img/3.jpg"
          alt="Feathers_3"
          fill
          sizes="100%, 100%"
          objectFit="cover"
          quality={100}
          className="group-hover:scale-110 || duration-500"
        />
      </div>
      <div className="h-[280px] || relative || group || w-[100%] || overflow-hidden || block || lg:hidden">
        <Image
          src="/assets/img/2.jpg"
          alt="Feathers_2"
          fill
          sizes="100%, 100%"
          objectFit="cover"
          quality={100}
          className="group-hover:scale-110 || duration-500"
        />
      </div>
    </div>
  );
}

export default Feathers;
