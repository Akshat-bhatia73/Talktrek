import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-neutral-900 lg:p-2">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
