import Footer from "../components/Footer"
import Header from "../components/Header"
import MailList from "../components/MailList"
import Featured from "../components/Featured"
import PropertyList from "../components/PropertyList"
import FeaturedProperties from "../components/FeaturedProperties"

function Home() {
  return (
    <div className="">
      <Header /> 
      <div
        id="homeContainer"
        className="mt-12 flex flex-col items-center gap-7"
      >
        <Featured />
        <h1 id="homeTitle" className="w-full max-w-5xl lg:px-0 px-6 text-xl font-bold text-left">Browse by property type</h1>
        <PropertyList />
        <h1 id="homeTitle" className="w-full max-w-5xl lg:px-0 px-6 text-xl font-bold text-left">Homes guest loves</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home
