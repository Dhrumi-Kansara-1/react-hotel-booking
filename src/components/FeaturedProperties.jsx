import React from "react"
import useFetch from "../hooks/useFetch"

function FeaturedProperties() {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=3")
  
  const items = [
    {
      img: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      img: "https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      img: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      img: "https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ]

  function capitalize(word) {
    const lower = word.toLowerCase()
    return word.charAt(0).toUpperCase() + lower.slice(1)
  }

  return (
    <div
      id="pList"
      className="max-w-5xl lg:px-0 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 "
    >
      {loading
        ? "Loading..."
        : data.map((item, index) => { 
            return (
              <div
                id="fpItem"
                className="rounded-md  overflow-hidden cursor-pointer shadow-md"
                key={index}
              >
                <img
                  src={items[index % items.length].img}
                  alt={item.name}
                  className="h-48   object-cover  brightness-[.85]"
                />
                <div id="fpbody" className="m-2">
                  <span id="fpName" className="block font-bold">
                    {item.name}
                  </span>
                  <span id="fpCity" className="block font-light capitalize">
                    {item.city}
                  </span>
                  <span id="fpPrice" className="block font-normal">
                    Starting from ${item.cheapestPrice}
                  </span>
                  {item.rating && (
                    <div id="fpRating" className="text-sm py-2">
                      <span className="text-white bg-violet-500 px-1  py-0.5 rounded font-medium">
                        {item.rating}
                      </span>
                      <span className="ml-2 capitalize ">
                        {capitalize("excellent")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
    </div>
  )
}

export default FeaturedProperties
