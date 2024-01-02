import {
  faBed,
  faCalendarDays,
  faCar,
  faMinus,
  faPerson,
  faPlane,
  faPlus,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns"
import { useContext, useState } from "react"
import "react-date-range/dist/styles.css" // main css file
import { DateRange } from "react-date-range"
import { useNavigate } from "react-router-dom"
import "react-date-range/dist/theme/default.css" // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SearchContext } from "../context/SearchContext.jsx"

const headerList = [
  {
    icon: faBed,
    label: "Stays",
  },
  {
    icon: faPlane,
    label: "Flights",
  },
  {
    icon: faCar,
    label: "Attractions",
  },
  {
    icon: faCar,
    label: "Car Rentals",
  },
  {
    icon: faTaxi,
    label: "Airport taxis",
  },
]

function Header({ type = "normal" }) {
  const navigate = useNavigate()
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const [city, setCity] = useState()
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)

  const { dispatch } = useContext(SearchContext)

  const handleOptions = ({ key, value, type }) => {
    switch (type) {
      case "i":
        value = value + 1
        break
      case "d":
        if (value > 0) {
          value = value - 1
        }
        break
    }
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        city:city,
        date: {
          start: dates[0].startDate,
          end: dates[0].endDate,
        },
        options,
      },
    }) 
    navigate("/hotels", { state: { city, dates, options } })
  }

  return (
    <div
      id="header"
      className="flex justify-center bg-violet-900  text-white relative"
    >
      <div
        id="headerContainer"
        className={`w-full max-w-5xl lg:px-0 px-6 ${
          type === "list" ? "mb-6" : "mb-24"
        }`}
      >
        <div
          id="headerList"
          className="flex gap-10 py-2 scrollbar-thin md:scrollbar-none cursor-pointer hover:scrollerbar-thumb-violet-500  scrollbar-thumb-violet-600 scrollbar-track-violet-500 overflow-x-scroll"
        >
          {headerList.map((obj, index) => {
            return (
              <div
                id="headerListItem"
                key={index}
                className="flex whitespace-nowrap items-center border border-violet-900 gap-2 first:border-violet-500 active:bg-violet-800   p-2 cursor-pointer rounded-xl"
              >
                <FontAwesomeIcon icon={obj.icon} />
                <span className="whitespace-nowrap">{obj.label}</span>
              </div>
            )
          })}
        </div>
        {type !== "list" && (
          <div>
            <h2 id="headerTitle" className="text-3xl pt-6 pb-3 font-semibold">
              A lifetimeof discounts? It's Genius.
            </h2>
            <p id="headerDesc" className="mb-5">
              Get rewarded on your travels - unlock instant savings of 10% or
              more with a free bookit account
            </p>
            <button
              id="headerButton"
              className="bg-violet-500 hover:bg-violet-600 focus:bg-violet-600 font-medium p-2 cursor-pointer"
            >
              Sign in / Register
            </button>
            <div
              id="headerSearch"
              className=" max-w-5xl w-11/12  rounded absolute  bg-white h-fit text-gray-600 flex -bottom-16 border-4  border-yellow-500  items-center justify-around  flex-col mb-6 lg:-bottom-10   lg:flex-row mx-0 px-0   "
            >
              <div
                id="headerSearchItem"
                className={`flex flex-[2] items-center gap-2 w-full border-b-4 border-b-yellow-500 lg:border-b-0 px-3`}
              >
                <FontAwesomeIcon
                  id="headerSearchIcon"
                  icon={faBed}
                  className="text-gray-400"
                />
                <input
                  id="headerSearchInput"
                  placeholder={"where are you going?"}
                  type="text"
                  className="border-none outline-none w-full bg-transparent"
                  onChange={(e) => setCity(e.target.value)}
                  value={city || ""}
                />
              </div>
              {/* calender */}
              <div
                id="headerSearchItem"
                className={`flex flex-[2] items-center gap-2 w-full  border-b-4 border-b-yellow-500 lg:border-b-0 lg:border-l-4 lg:border-l-yellow-500 px-3 lg`}
              >
                <FontAwesomeIcon
                  id="headerSearchIcon"
                  icon={faCalendarDays}
                  className="text-gray-400"
                />
                <span
                  id="headerSearchText"
                  className="text-gray-400 cursor-pointer"
                  onClick={() => {
                    setOpenDate((prev) => !prev)
                  }}
                >
                  {format(dates[0].startDate, "dd/MM/yyyy")} to{" "}
                  {format(dates[0].endDate, "dd/MM/yyyy")}
                </span>
                {openDate && (
                  <DateRange
                    id="dates"
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="absolute top-12 z-10"
                    minDate={new Date()}
                  />
                )}
              </div>
              {/* person */}
              <div
                id="headerSearchItem"
                className={`flex flex-[2]  items-center gap-2 w-full border-b-4 border-b-yellow-500 lg:border-b-0 px-3 lg:border-l-4 lg:border-l-yellow-500`}
              >
                <FontAwesomeIcon
                  id="headerSearchIcon"
                  icon={faPerson}
                  className="text-gray-400"
                />
                <span
                  id="headerSearchText"
                  className="text-gray-400 cursor-pointer"
                  onClick={() => {
                    setOpenOptions((prev) => !prev)
                  }}
                >
                  {options.adult} adult, {options.children} children,{" "}
                  {options.room} room
                </span>

                {/* options */}
                {openOptions && (
                  <div
                    id="options"
                    className="absolute top-12 bg-gray-50 rounded shadow-sm z-10"
                  >
                    {Object.entries(options).map((row, index) => {
                      return (
                        <div
                          id="optionItem"
                          key={index}
                          className="w-52 flex justify-between m-4"
                        >
                          <span id="OptionText" className="capitalize">
                            {row[0]}
                          </span>
                          <div
                            id="optionCount"
                            className="flex items-center gap-2  text-black"
                          >
                            <button
                              id="optionCounterButton"
                              className="w-6 h-6 disabled:cursor-not-allowed hover:ring-1 focus:ring-1  text-violet-500 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
                              onClick={() => {
                                handleOptions({
                                  key: row[0],
                                  value: row[1],
                                  type: "d",
                                })
                              }}
                              /* disable minus button */
                              disabled={
                                row[0] === "children"
                                  ? row[1] <= 0
                                  : row[1] <= 1
                              }
                            >
                              <FontAwesomeIcon icon={faMinus} size="xs" />
                            </button>
                            <span
                              id="optionCounterAddNumber"
                              className="w-6 text-center text-xs"
                            >
                              {row[1]}
                            </span>
                            <button
                              id="optionCounterButton"
                              className="w-6 h-6 text-violet-500 cursor-pointer hover:ring-1 focus:ring-1 bg-gray-200 hover:bg-gray-300   rounded"
                              onClick={() => {
                                handleOptions({
                                  key: row[0],
                                  value: row[1],
                                  type: "i",
                                })
                              }}
                            >
                              <FontAwesomeIcon icon={faPlus} size="xs" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              {/* button */}
              <div
                id="headerSearchItem"
                className={`flex flex-[1]  w-full items-center   gap-2 lg:border-l-4 lg:border-l-yellow-500`}
              >
                <button
                  id="headerSearchButton"
                  className=" text-white py-1 px-2 w-full font-semibold text-lg block rounded-sm text-center bg-violet-500 hover:bg-violet-600"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
