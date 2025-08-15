import { AuthLayout } from "@/module/auth/ui/layouts/auth-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
