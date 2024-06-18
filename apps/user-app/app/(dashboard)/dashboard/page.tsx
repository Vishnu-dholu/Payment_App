export default function () {
  return (
    <main className="flex flex-1 flex-col lg:flex-row justify-center items-center bg-gray-100 p-6 lg:p-12 relative">
      <div className="bg-blue-100 rounded-lg shadow-md p-6 lg:p-8 relative z-0 w-full lg:max-w-4xl lg:mr-36 h-auto lg:h-3/4">
        <div className="text-4xl lg:text-7xl font-normal mb-4">
          Fast, safe
          <br />
          social
          <br />
          payments
        </div>
        <div className="text-base lg:text-lg mb-4">
          Pay, get paid, grow a business, and more. Join{" "}
          <br className="hidden lg:block" />
          the tens of millions of people on Venmo.
        </div>
        <button className="bg-blue-500 mt-6 text-white shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px] shadow-purple-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300">
          Get PayTM
        </button>
      </div>
      <div className="absolute bottom-16 lg:bottom-auto lg:top-1/2 lg:transform lg:-translate-y-1/2 right-10 lg:right-20 z-10 w-full max-w-sm md:max-w-md lg:max-w-xl lg:ml-12">
        <img
          src="/home.jpg"
          alt="Group of friends"
          width={600}
          height={600}
          className="rounded-lg w-full"
        />
      </div>
    </main>
  );
}
