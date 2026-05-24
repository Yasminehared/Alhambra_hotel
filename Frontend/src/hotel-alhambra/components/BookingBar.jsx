export default function BookingBar() {
  return (
    <div
      className="absolute bottom-10 left-1/2
      -translate-x-1/2 bg-white shadow-2xl
      flex flex-col md:flex-row
      w-[92%] md:w-[78%]"
    >

      <div className="flex-1 p-6 border-r">
        <p className="text-gray-500 text-sm">
          Arrival
        </p>

        <h3 className="text-[#9f7a35] mt-2">
          27 February 2026
        </h3>
      </div>

      <div className="flex-1 p-6 border-r">
        <p className="text-gray-500 text-sm">
          Departure
        </p>

        <h3 className="text-[#9f7a35] mt-2">
          28 February 2026
        </h3>
      </div>

      <div className="flex-1 p-6 border-r">
        <p className="text-gray-500 text-sm">
          Rooms & Guests
        </p>

        <h3 className="text-[#9f7a35] mt-2">
          1 Room / 2 Guests
        </h3>
      </div>

      <button
        className="bg-[#9f7a35]
        hover:bg-[#7e602a]
        duration-300
        text-white px-10 py-6
        uppercase tracking-[3px] text-xs"
      >
        Book Now
      </button>
    </div>
  );
}