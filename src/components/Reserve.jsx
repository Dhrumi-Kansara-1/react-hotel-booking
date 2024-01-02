import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext, useMemo, useState } from "react"
import useFetch from "../hooks/useFetch"
import { SearchContext } from "../context/SearchContext"
import { useNavigate } from "react-router-dom"
import axios from "../utlis/axios.js"

function Reserve({ setOpenReserve, hotelId }) {
  const navigate=useNavigate()
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`)
  const { date } = useContext(SearchContext)

  const [selectedRooms, setSelectedRooms] = useState([])
 
  const getDateInRange = ({ startDate, endDate }) => {
    const tempDate = new Date(startDate.getTime())
    let dateRange = []
    while (tempDate <= endDate) {
      dateRange.push(new Date(tempDate).getTime())
      tempDate.setDate(tempDate.getDate() + 1)
    }
    return dateRange
  }

  let dateRange=useMemo(()=>getDateInRange({ startDate: date.start, endDate: date.end }),[date])


  const areDatesAvailable = ({roomNumber}) => { 
    const isFound = roomNumber.unavailableDates.some((date) =>
      dateRange.includes(new Date(date).getTime())
    )
    return !isFound
   }

  const handleReserveRoom = async () => {
    try {
      await Promise.all(selectedRooms.map((roomNumberId)=>{
        console.log(roomNumberId)
        const res=axios.put(`/rooms/availability/${roomNumberId}`,{
          dates: dateRange
        })
        return res.data;
      }))    
      setOpenReserve(false)
      } catch (error) {
      console.log(error)
    }
  }

  const handleSelectRoom = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item != value)
    )
  }
  return (
    <div
      id="reserve"
      className="w-full h-full   p-2    fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        id="container"
        className="bg-white md:w-1/2 m-2 text-black p-3 relative overflow-scroll"
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => {
            setOpenReserve(false)
          }}
          className="cursor-pointer hover:text-gray-800 focus:text-gray-800  p-1 absolute top-3 right-3 text-base"
        />
        <span>Select your rooms:</span>
        <div className="flex flex-col gap-3 p-5 text-sm">
          {data.map((item, index) => {
            return (
              <div id="reserveItem" key={index} className="flex items-center justify-between">
                <div id="info" className="flex flex-col flex-[3] gap-0.5 ">
                  <p id="title" className="font-semibold text-base">
                    {item.title}
                  </p>
                  <p id="description" className=" ">
                    {item.description}
                  </p>
                  <p id="maxPeople" className=" ">
                    Max people:<span className="ml-1 font-medium">{item.maxPeople}</span>
                  </p>
                  <p id="price" className="font-medium text-violet-800">
                    ${item.price}
                  </p>
                </div>
                <div id="rooms" className="flex items-start flex-[1] gap-2 flex-wrap  text-xs text-gray-800 justify-end">
                  {item.roomNumbers.map((roomNumber, j) => {
                    return (
                      <div key={j} className="flex flex-col items-center    justify-start ">
                        <label className="text-xs text-gray-500">{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleSelectRoom}
                          disabled={!areDatesAvailable({roomNumber})}  
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <button
          onClick={handleReserveRoom}
          className="w-full bg-violet-500 text-white font-bold py-2 px-6 mt-4 focus:ring-3 rounded-md hover:bg-violet-600 focus:bg-violet-600"
        >
          Reserve Now
        </button>
      </div>
    </div>
  )
}

export default Reserve
