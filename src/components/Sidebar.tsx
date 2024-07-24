import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-auto min-h-screen border-r-2 w-[20%] shadow-xl">
      <div className="my-20">
        <ul className="text-sm md:text-2xl font-bold cursor-pointer">
          <Link to={"/"}>
            <li className="hover:text-purple-500 my-5">Contact</li>
          </Link>
          <Link to={"/contacts"}>
            <li className="hover:text-purple-500 my-5">Contact List</li>
          </Link>
          <Link to={"/dashboard"}>
            <li className="hover:text-purple-500 my-5">Maps and Charts</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
