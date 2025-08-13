const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-screen min-h-screen h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
