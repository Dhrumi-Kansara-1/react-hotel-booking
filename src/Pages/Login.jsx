import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"
import axios from "../utlis/axios.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const {   error, loading, dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data })
      navigate("/")
    } catch (err) {
      console.log(err)
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data })
    }
  }

  return (
    <div
      id="login"
      className=" flex  items-center justify-center  h-screen w-screen"
    >
      <div id="container" className="flex flex-col gap-2  ">
        <div id="inputContainer" className="  border border-gray-500 p-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-500" />

          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="outline-none px-2"
          />
        </div>
        <div id="inputContainer" className="  border border-gray-500 p-2 ">
          <FontAwesomeIcon icon={faLock} className="text-gray-500" />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="outline-none px-2"
          />
        </div>
        <button
          id="login"
          onClick={handleLogin}
          disabled={loading}
          className="hover:bg-violet-600 py-1 bg-violet-500 text-white"
        >
          Login
        </button>
        {error && (
          <span id="error" className="text-center text-red-500">
            {error.message}
          </span>
        )}
      </div>
    </div>
  )
}

export default Login
