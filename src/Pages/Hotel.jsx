import {
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import useFetch from "../hooks/useFetch"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MailList from "../components/MailList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../context/SearchContext.jsx"
import { AuthContext } from "../context/authContext.jsx"
import Reserve from "../components/Reserve.jsx"

const photos = [
  {
    src: "https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    src: "https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    src: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    src: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    src: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    src: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

function Hotel() {
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const navigate = useNavigate()
  const { date } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  const { data, loading, error } = useFetch(`/hotels/find/${id}`)

  const [slideNumber, setSlideNumber] = useState(0)
  const [openImgSlider, setOpenImgSlider] = useState(false)
  const [openReserve, setOpenReserve] = useState(false)

  function dayDifference({ startDate = new Date(), endDate = new Date() }) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    const timeDiff = Math.abs(startDate.getTime() - endDate.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }

  const days = dayDifference({ startDate: date?.start, endDate: date?.end })

  const handleClickImage = ({ index }) => {
    setSlideNumber(index)
    setOpenImgSlider(true)
  }
  const handleSlide = ({ type }) => {
    let newSlideNumber = slideNumber

    switch (type) {
      case "next":
        if (newSlideNumber < photos.length - 1) {
          newSlideNumber = newSlideNumber + 1
        } else {
          newSlideNumber = 0
        }
        break
      case "prev":
        if (newSlideNumber > 0) {
          newSlideNumber = newSlideNumber - 1
        } else {
          newSlideNumber = photos.length - 1
        }
        break
    }
  }

  const handleReserve = () => { 

    if (user) {
      setOpenReserve(true)
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="">
      <Header type="list" />
      <div className="mt-12 flex flex-col   gap-7 ">
        {loading ? (
          "loading"
        ) : (
          <div id="container" className="   flex   justify-center">
            <div
              id="wrapper"
              className="flex   max-w-5xl  px-6 lg:px-0 flex-col gap-3"
            >
              <div
                id="top"
                className="flex justify-between md:flex-row flex-col"
              >
                <div id="detail" className="flex flex-col gap-2">
                  <h1 id="title" className="font-bold text-2xl">
                    {data.name}
                  </h1>
                  <p id="address" className="text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="text-xs" />{" "}
                    {data.address}
                  </p>
                  <p id="distance" className="text-violet-500  font-medium">
                    Excellent location - {data.distance}m from center
                  </p>
                  <p id="price" className="text-green-600 font-medium">
                    Book a stay over ${data.cheapestPrice} at this property and
                    get a free airport taxi!{" "}
                  </p>
                </div>
                <div id="booking">
                  <button
                    onClick={handleReserve}
                    className="w-full bg-violet-500 text-white font-bold py-2 px-6 mt-4 focus:ring-3 rounded-md hover:bg-violet-600 focus:bg-violet-600"
                  >
                    Reserver or Book Now!
                  </button>
                </div>
              </div>
              <div
                id="images"
                className="grid grid-cols-2 md:grid-cols-3 gap-1 relative   "
              >
                {openImgSlider && (
                  <div
                    id="slider"
                    className="absolute   z-10  flex items-center bg-gray-200 shadow-md w-full h-full   justify-center   gap-2"
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="absolute bottom-[50%] left-4 z-50 placeholder-opacity-90 bg-white opacity-80 p-2 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSlide({ type: "prev" })}
                    />
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="absolute bottom-[50%] right-4 z-50 placeholder-opacity-90 bg-white opacity-80 p-2 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSlide({ type: "next" })}
                    />

                    <FontAwesomeIcon
                      icon={faXmark}
                      className="absolute top-4 right-4 z-50 placeholder-opacity-90 bg-white   py-1 px-2  rounded hover:bg-gray-100 cursor-pointer"
                      onClick={() => setOpenImgSlider(false)}
                    />

                    <img
                      src={photos[slideNumber].src}
                      alt="img"
                      className="object-cover     cursor-pointer relative brightness-95"
                    />
                  </div>
                )}
                {photos.map((item, index) => {
                  return (
                    <img
                      src={item.src}
                      alt="img"
                      key={index}
                      onClick={() => {
                        handleClickImage({ index })
                      }}
                      className="h-full  object-cover  brightness-[.85] hover:brightness-100 cursor-pointer"
                    />
                  )
                })}
              </div>
              <div
                id="end"
                className="flex mt-5 justify-between flex-col md:flex-row gap-2"
              >
                <div
                  id="description"
                  className="flex-[3] flex flex-col gap-3 mb-2"
                >
                  <h2 id="heading" className="font-bold text-xl">
                    {data.title}
                  </h2>
                  <p id="text">{data.description}</p>
                </div>
                <div
                  id="priceDetails"
                  className="flex-[1]  bg-violet-200 p-4 flex flex-col gap-2"
                >
                  <h3 id="heading" className="font-semibold text-lg">
                    Perfect for a {days && `${days} night`} stay!
                  </h3>
                  <p id="text" className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
                  </p>
                  <p id="price" className="font-bold">
                    ${days ? days * data.cheapestPrice : ""}
                    <span className="text-gray-600 font-normal px-2">
                      ({days && `${days} night`})
                    </span>
                  </p>
                  <button
                    id="button"
                    onClick={handleReserve}
                    className="w-full bg-violet-600 text-white font-bold py-1 mt-4 focus:ring-3 rounded-sm hover:bg-violet-700 focus:bg-violet-700"
                  >
                    Reserve or Book Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
      {openReserve && <Reserve setOpenReserve={setOpenReserve} hotelId={id} />}
    </div>
  )
}

export default Hotel
