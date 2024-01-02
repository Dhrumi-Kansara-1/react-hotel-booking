
function MailList() {
  return (
    <div id="mail" className="w-full my-6 p-12 bg-violet-900 text-white flex flex-col items-center gap-5">
        <h2 id="mailTitle" className="text-2xl font-bold">Save time, save money!</h2>
        <span id="mailDescription" className="text-violet-400">Sign up and we'll send the best deals to you!</span>
        <div id="mailInputContainer" className="flex flex-col md:flex-row gap-2">
            <input type="text" placeholder="Your Email" className="w-72 h-8 p-2 outline-none text-black "/>
            <button className=" h-8 py-1 px-2 font-medium rounded bg-violet-500 hover:bg-violet-600 focus:bg-violet-600">subscribe</button>
        </div>
    </div>
  )
}

export default MailList