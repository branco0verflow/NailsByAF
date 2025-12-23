import { cn } from "@/components/ui/cn";

export function SectionShell({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative h-[100svh] w-full overflow-hidden",
        "snap-start snap-always",
        className
      )}
    >
      {children}
    </section>
  );
}
