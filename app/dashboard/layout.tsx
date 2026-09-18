import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Fixed sidebar for PC / Bottom bar for Mobile */}
      <Sidebar />

      {/*
        Main content container:
        - md:pl-64 shifts content right on PC to prevent the fixed sidebar from overlapping it.
        - pb-20 prevents the mobile bottom bar from covering the lowest elements on a phone.
      */}
      <div className="flex-1 md:pl-64 pb-20 md:pb-0">
        <div className="w-full px-6 pt-6">{children}</div>
      </div>
    </div>
  );
}
