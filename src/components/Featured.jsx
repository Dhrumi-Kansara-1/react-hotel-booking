import React from "react"
import useFetch from "../hooks/useFetch"

function Featured() {
  const { data, loading, error } = useFetch(
    "/hotels/countbycity?cities=berlin,london,mumbai"
  )
 
  const featuredItems = [
    {
      img: "https://images.pexels.com/photos/7556135/pexels-photo-7556135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title1: "Berlin", 
    },
    {
      img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600",
      title1: "London", 
    },
    {
      img: "https://images.pexels.com/photos/706352/pexels-photo-706352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title1: "Mumbai", 
    }, 
  ]
  return (
    <div
      id="featured"
     >
      {loading ? (
        "Loading"
      ) : (
        <div
          id="featured"
          className="w-full max-w-5xl lg:px-0 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3    gap-2  z-[1]"
        > 
          {data.map((item, index) => { 
            return (
              <div
                id="featuredItem"
                key={index}
                className="relative  text-white rounded-md overflow-hidden  shadow-md"
              >
                <img
                  src={featuredItems[index].img}
                  alt={featuredItems[index].title1}
                  className="object-cover h-full brightness-[.85]"
                />
                <div
                  id="featuredTitles"
                  className="absolute bottom-5 left-5 text-white p-2 "
                >
                  <h2 className="text-xl font-bold capitalize">{featuredItems[index].title1}</h2>
                  <h3 className=" font-medium">{item} Properties</h3>
                </div>
              </div>
            )
          })}
        </div>
      )}
   
    </div>
  )
}

export default Featured
