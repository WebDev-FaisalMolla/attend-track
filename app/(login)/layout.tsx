import Navbar from "@/components/Navbar";

export default function LoginLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-col h-full w-full gap-10 lg:gap-20">
      <Navbar />
      {children}
    </div>
  );
}
