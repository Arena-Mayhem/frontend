import Image from "next/image";

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
    <div className="flex md:items-center max-w-screen-2xl md:ml-16 mx-4 mt-8 py-3 md:p-4 bg-arena-bg border-b border-white/20 rounded-lg shadow-padentro">
      <div className="flex items-center gap-3 flex-1">
        <Image
          src={image}
          alt=""
          width={1000}
          height={1000}
          className="w-12 h-12 md:w-16 md:h-16"
        />
        <h1 className="-mx-4 text-lg md:text-4xl text-white">{title}</h1>
      </div>

      {action && <div className="md:mt-0 w-full md:w-auto">{action}</div>}
    </div>
  );
}
