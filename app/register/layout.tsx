import Navbar from "@/components/Navbar";

export default function RegisterLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-col h-full w-full gap-5 lg:gap-10">
      <Navbar />
      {children}
    </div>
  );
}
