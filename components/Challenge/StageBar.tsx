import Image from "next/image";
import PayforCreate from "./PayforCreate";

export default function StageBar({
  action,
  image,
  title,
}: {
  action?: JSX.Element;
  image: string;
  title: string;
}) {
  return (
    <div className="flex sm:px-12 mx-auto justify-between bg-arena-bg  border-b-[0.1px] border-white/20 rounded-lg shadow-padentro mt-12 max-w-screen-2xl h-[110px]">
      <div className=" flex items-center">
        <Image
          src={image}
          alt=""
          width={1000}
          height={1000}
          className="w-[62px] h-[62px] "
        />
        <p className="sm:text-5xl text-base text-white">{title}</p>
      </div>
      <div className="flex items-center justify-center flex-col">{action}</div>
    </div>
  );
}
