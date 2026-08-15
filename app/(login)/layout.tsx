export default function LoginLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-[50%] w-full items-center justify-center">
      {children}
    </div>
  );
}
