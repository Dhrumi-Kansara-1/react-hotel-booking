import { Link } from "react-router-dom"

function SearchItem({ item }) {
  return (
    <div
      id="serchItem"
      className="flex flex-col md:flex-row gap-3 justify-between border-2 p-2 rounded"
    >
      <img
        src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?cs=srgb&dl=pexels-pixabay-271624.jpg&fm=jpg&_gl=1*1qm2os5*_ga*MTM3ODk2NzIxOS4xNjkzNjQ1Njkx*_ga_8JE65Q40S6*MTcwMDY1NTUyMS4xNS4xLjE3MDA2NTU1MzUuMC4wLjA."
        alt="hotel"
        className="md:w-2/6 object-cover"
      />
      <div id="description" className="  flex flex-col gap-1">
        <h2 id="title" className="text-violet-500 font-bold text-xl">
          {item.name}
        </h2>
        <p id="distance" className="text-sm">
          {item.distance}m from center
        </p>
        <span
          id="taxiOption"
          className="bg-green-700 text-white text-medium p-1 text-xs w-max rounded  "
        >
          Free airport use
        </span>
        <p id="subtitle" className="font-bold text-sm">
          Studio Apartment with Air conditioning
        </p>
        <p id="features" className="text-sm">
          {item.description.split(/\s+/).slice(0, 10).join(" ")}
        </p>
        <span id="cancelOption" className="text-green-800 font-bold text-sm">
          Free cancellation
        </span>
        <span
          id="cancelOptionSubtitle"
          className="text-green-800 font-normal text-sm"
        >
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div id="details" className="flex-2  flex flex-col justify-between">
        {item.rating && (
          <div id="ratingContainer" className="flex justify-between gap-2  ">
            <span id="review" className="font-medium">
              Excellent
            </span>
            <span className="text-white block  bg-violet-500 px-1  py-0.5  font-medium text-sm">
              8.9
            </span>
          </div>
        )}
        <div id="priceContainer" className="flex flex-col text-right gap-1">
          <span id="price" className=" text-2xl">
            ${item.cheapestPrice}
          </span>
          <p id="taxOptions" className="text-gray-500 text-xs">
            includes taxes and fees
          </p>
          <Link
            id="avability"
            to={`/hotels/${item._id}`}
            className="w-full bg-violet-500 text-white px-2 text-center  font-bold text-sm py-1 focus:ring-3 rounded-md hover:bg-violet-600 focus:bg-violet-600"
          >
            See avability
          </Link>
         </div>
      </div>
    </div>
  )
}

export default SearchItem
