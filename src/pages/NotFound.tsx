import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-medium text-[#2C2C2A]">Page not found</h1>
        <p className="mb-6 text-base leading-[1.75] text-[#5F5E5A]">That page does not exist or has moved.</p>
        <Link
          to="/"
          className="text-base font-medium text-[#1D9E75] underline-offset-2 transition-opacity duration-200 hover:opacity-90 hover:underline"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
