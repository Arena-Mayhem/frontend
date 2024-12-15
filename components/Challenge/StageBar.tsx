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
    <div className="flex flex-col md:flex-row md:px-12 mx-auto gap-4 md:gap-0 bg-arena-bg border-b-[0.1px] border-white/20 rounded-lg shadow-padentro mt-12 max-w-screen-2xl min-h-[110px] p-4 md:p-0 items-center">
      <div className="flex items-center gap-4 justify-center w-full md:w-auto md:justify-start flex-1">
        <Image
          src={image}
          alt=""
          width={1000}
          height={1000}
          className="w-[62px] h-[62px] min-w-[62px]"
        />
        <p className="text-4xl md:text-5xl text-white break-words">{title}</p>
      </div>
      {action && (
        <>
          <div className="w-full h-[1px] bg-white/20 md:hidden" />
          <div className="flex items-center justify-center w-full md:w-auto">
            {action}
          </div>
        </>
      )}
    </div>
  );
}
