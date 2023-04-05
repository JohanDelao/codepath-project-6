import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="upperSection">
        <div className="textSection">
          <Link id="mainTitle" to="/">Gotta Catch 'Em All!</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout
