import Navbar from './Navbar.tsx';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container-fluid">
        {children}
      </main>
    </>
  );
};

export default Layout;
