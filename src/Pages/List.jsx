import { useEffect, useState } from "react"
import { format } from "date-fns"
import Header from "../components/Header"
import { DateRange } from "react-date-range"
import { useLocation } from "react-router-dom"
import SearchItem from "../components/SearchItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../hooks/useFetch"

function List() {
  const location = useLocation()
  const [dates, setDates] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [city, setCity] = useState(location.state.city)
  const [openDate, setOpenDate] = useState(false)
  const [showSearchBody, setShowSearchBody] = useState(true)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?${city ? `city=${city}` : ""}&min=${min || 0}&max=${
      max || 9999
    }`
  )
 

  const handleChangeOptions = ({ key, value }) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSearch = () => {
    reFetch()
  }

  return (
    <div>
      <Header type="list" />
      <div id="listContainer" className="flex   justify-center mt-5">
        <div
          id="listWrapper"
          className="w-full max-w-5xl md:flex-row flex flex-col gap-5 px-6 lg:px-0"
        >
          <div
            id="listSearch"
            className="flex-1 bg-yellow-500 p-4 rounded-lg sticky top-2 h-max "
          >
            <div id="header" className="flex justify-between items-center">
              <h1 id="lsTitle" className=" text-xl text-gray-600 font-bold">
                Search
              </h1>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="md:hidden bg-gray-100 p-2 rounded-full text-violet-500 hover:bg-gray-200"
                onClick={() => {
                  setShowSearchBody((prev) => !prev)
                }}
              />
            </div>

            <div
              id="lsBody "
              className={`${showSearchBody ? "block" : "hidden"} md:block`}
            >
              {/* city */}
              <div id="lsItem" className="flex flex-col gap-1 mt-3">
                <label
                  id="lsItemLabel"
                  className="text-sm"
                  htmlFor="city"
                >
                  Destination
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="city"
                  value={city || ""}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-7 outline-none p-2"
                />
              </div>
              {/* end of city */}
              {/* dates*/}
              <div id="lsItem" className="relative flex flex-col gap-1 mt-3">
                <label
                  id="lsItemLabel"
                  className="text-sm"
                  htmlFor="city"
                >
                  Check-in date
                </label>
                <span
                  id="lsItemDate"
                  className="px-2 py-1 cursor-pointer   bg-white block"
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
                    minDate={new Date()}
                    className="absolute top-12 z-10"
                  />
                )}
              </div>
              {/* end of dates */}
              {/* options */}
              <div id="lsItem" className="flex flex-col gap-1 mt-3 ">
                <label
                  id="lsItemLabel"
                  className="text-sm"
                  htmlFor="city"
                >
                  Options
                </label>
                <div className="px-2 flex flex-col gap-1">
                  <div
                    id="lsOptionItem"
                    className="flex gap-1 justify-between text-gray-600 font-xs"
                  >
                    <span id="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      id="lsOptionInput"
                      className="w-1/4 text-xs pl-1"
                      value={min}
                      onChange={(e) => setMin(Number(e.target.value))}
                    />
                  </div>
                  <div
                    id="lsOptionItem"
                    className="flex gap-1 justify-between text-gray-600 font-xs"
                  >
                    <span id="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      id="lsOptionInput"
                      className="w-1/4 text-xs pl-1"
                      value={max}
                      onChange={(e) => setMax(Number(e.target.value))}
                    />
                  </div>
                  <div
                    id="lsOptionItem"
                    className="flex gap-1 justify-between text-gray-600 font-xs"
                  >
                    <span id="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      id="lsOptionInput"
                      className="w-1/4 text-xs pl-1"
                      value={options.adult}
                      onChange={(e) => {
                        handleChangeOptions({
                          key: "adult",
                          value: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div
                    id="lsOptionItem"
                    className="flex gap-1 justify-between text-gray-600 font-xs"
                  >
                    <span id="lsOptionText">children</span>
                    <input
                      type="number"
                      min={0}
                      id="lsOptionInput"
                      className="w-1/4 text-xs pl-1"
                      value={options.children}
                      onChange={(e) => {
                        handleChangeOptions({
                          key: "children",
                          value: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div
                    id="lsOptionItem"
                    className="flex gap-1 justify-between text-gray-600 font-xs"
                  >
                    <span id="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      id="lsOptionInput"
                      className="w-1/4 text-xs pl-1"
                      value={options.room}
                      onChange={(e) => {
                        handleChangeOptions({
                          key: "room",
                          value: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* end of options */}
              <button
                onClick={handleSearch}
                className="w-full bg-violet-500 text-white font-bold py-1 mt-4 focus:ring-3 rounded-md hover:bg-violet-600 focus:bg-violet-600"
              >
                Search
              </button>
            </div>
          </div>
          <div id="listResults" className="flex-[3] flex flex-col gap-3">
            {loading
              ? "loading..."
              : data &&
                data.length > 0 &&
                data.map((item, index) => {
                  return <SearchItem key={index} item={item} />
                })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
