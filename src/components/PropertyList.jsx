import React from "react"
import useFetch from "../hooks/useFetch"

function PropertyList() {

  const { data, loading, error } = useFetch(
    "/hotels/countbytype"
  )


  const items = [
    {
      img: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Hotels",
      total: 232,
    },
    {
      img: "https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Apartments",
      total: 232,
    },
    {
      img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Resorts",
      total: 232,
    },
    {
      img: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Villas",
      total: 232,
    },
    {
      img: "https://images.pexels.com/photos/2294125/pexels-photo-2294125.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Cabins",
      total: 232,
    },
    
  ]
  return ( 
    <div
      id="pList"
      className="max-w-5xl lg:px-0 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-start gap-5 "
    >
      {data.map((item, index) => {
        return (
          
          <div
            id="pListItem"
            className=" rounded-md overflow-hidden cursor-pointer shadow-md"
            key={index}
          >
            <img src={items[index].img} alt={item.type} className="w-full object-cover h-36 brightness-[.85]"/>
            <div id="pListTitle" className="m-2">
              <h2 className="text-lg font-bold capitalize">{item.type}</h2>
              <h3 className="text-sm ">{item.count} <span className="lowercase">{item.type}</span></h3>
            </div>
          </div>
        )
      })}
    </div>  
  )
}

export default PropertyList
