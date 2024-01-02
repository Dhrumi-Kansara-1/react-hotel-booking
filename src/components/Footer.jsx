import React from "react"

function Footer() {
  const items = [
    {
      title: "location",
      links: ["Countries", "Regions", "Cities", "Districts"],
    },
    {
      title: "Property",
      links: ["Homes", "Apartments", "Resorts", "Villas", "Hostels", "B&Bs "],
    },
    {
      title: "Blog",
      links: [
        "Unique places to stay",
        " All destinations",
        "All flight destinations",
        "All car hire locations",
        "Discover",
        "Reviews",
        "Discover monthly stays",
        "Unpacked: Travel articles",
        "Seasonal and holiday deals",
        "Traveller Review Awards",
      ],
    },
    {
      title: "Other",
      links: [
        "Car hire",
        "Flight finder",
        "Restaurant reservations",
        "Booking.com for Travel Agents",
      ],
    },
  ]
  return (
    <div id="footer" className="w-full flex flex-col items-center">
      <div id="fLists" className="w-full mb-6 flex justify-around max-w-5xl lg:justify-between">
        {items.map((item, i) => {
          return (
            <ul id="flist" key={i}>
              <h2 className="md:uppercase text-gray-600 md:font-medium underline text-sm md:mb-2 md:no-underline">
                {item.title}
              </h2>
              {item.links.map((subItem, j) => {
                return (
                  <li
                    id="flistItem"
                    key={j}
                    className="text-violet-900 hidden md:block cursor-pointer hover:underline"
                  >
                    {subItem}
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
      <div id="fText" className="text-sm px-4 ">Copyright @2023 bookit</div>
    </div>
  )
}

export default Footer
