// Layout for auth related pages
const Auth = ({ children }) => {
  return (
    <>
      <div className="h-[100vh] w-full flex items-center justify-center bg-imagegram-bg">
        {children}
      </div>
    </>
  );
};

export default Auth;
