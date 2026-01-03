import Image from "next/image";

export function Logo() {
  return (
    <div className="select-none text-center flex flex-col items-center">
      <div className="relative w-[540px] sm:w-[500px] aspect-[3/1]">

        <Image
          src="/Logo111.png"
          alt="Nails Demo"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="mt-4 text-sm sm:text-base text-white/70 tracking-wide">
        Nail Art • Turnos • Cursos
      </div>
    </div>
  );
}
