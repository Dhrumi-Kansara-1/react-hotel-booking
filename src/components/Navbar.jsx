import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons"

function Navbar() {
  const { user } = useContext(AuthContext)
  const [openUserInfo, setOpenUserInfo] = useState(false)
  return (
    <div
      id="navbar"
      className="h-14 py-2 bg-violet-900 flex justify-center lg:px-0 px-6 "
    >
      <div
        id="navContainer"
        className="w-full max-w-5xl text-white flex items-center justify-between"
      >
        <span id="logo" className="font-medium">
          <Link to={"/"}>bookit</Link>
        </span>
        {!user ? (
          <div id="navItems" className="flex gap-2">
            <button
              id="navButtons"
              className="text-base py-1 px-2 text-white  rounded-md cursor-pointer hover:underline focus:underline  "
            >
              Register
            </button>
            <button
              id="navButtons"
              className="text-base py-1 px-2 bg-white text-violet-900 rounded-md cursor-pointer hover:bg-gray-200 focus:bg-gray-200"
            >
              Login
            </button>
          </div>
        ) : (
          <div
            id="navItems"
            className="flex flex-col gap-6 items-center justify-between capitalize relative"
          >
            <div
              id="userInfoContainer "
              className=" flex gap-2 mt-2   flex-col bg-violet-800 h-full  min-w-full cursor-pointer"
            >
              <span
                onClick={() => setOpenUserInfo((prev) => !prev)}
                className="px-3  p-2"
              >
                {" "}
                <FontAwesomeIcon icon={faUser} size="sm" /> {user.username}
              </span>
              {openUserInfo && (
                <div className="absolute top-14 bg-white z-10 py-2 w-max  text-black  ">
                  <div className="py-1 px-2 cursor-default">
                  <p >{user.username}</p>
                  <p >{user.email}</p>
                  </div>
                  <button
                    id="navButtons"
                    className="  py-1 px-2   flex gap-2 items-center w-full rounded-sm cursor-pointer hover:bg-gray-200   "
                  >
                   <FontAwesomeIcon icon={faRightFromBracket} size="sm"  />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
