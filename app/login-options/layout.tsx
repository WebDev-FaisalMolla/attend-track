import Navbar from "@/components/Navbar";

export default function LoginOptsLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      {children}
    </div>
  );
}
