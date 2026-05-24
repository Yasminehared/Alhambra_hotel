import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import BookingBar from "./components/BookingBar";

function Home() {
  return (
    <div className="bg-[#f8f6f2] text-[#3a2e1e] overflow-hidden">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt=""
          className="absolute inset-0 w-full h-full object-cover
          scale-110 animate-[slowZoom_18s_ease-in-out_infinite_alternate]"
        />

        <div className="absolute inset-0 bg-black/30" />

        <Navbar transparent />

        {/* HERO TEXT */}
        <div
          className="absolute inset-0 z-20
          flex flex-col items-center justify-center
          text-center text-white px-6"
        >

          <p className="uppercase tracking-[6px] text-sm mb-6">
            Luxury Redefined
          </p>

          <h1
            className="text-5xl md:text-8xl font-light
            leading-tight max-w-5xl"
          >
            Experience Timeless
            <br />
            Moroccan Elegance
          </h1>

          <button
            className="mt-10 border border-white
            px-10 py-4 uppercase tracking-[4px]
            text-xs hover:bg-white hover:text-black
            duration-500"
          >
            Discover More
          </button>
        </div>

        <BookingBar />
      </section>

      {/* ABOUT */}
      <section className="py-32 px-6 md:px-20">

        <div className="text-center mb-24">

          <div className="w-px h-24 bg-[#b8975a] mx-auto mb-10" />

          <h2 className="text-5xl md:text-7xl font-light uppercase">
            A Palace With
            <br />
            Singular Atmosphere
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">

          <div className="relative overflow-hidden group">

            <img
              src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
              alt=""
              className="w-full h-[750px] object-cover
              group-hover:scale-105 duration-[2000ms]"
            />

            <div
              className="absolute inset-10 border
              border-[#d4b37a]"
            />
          </div>

          <div>

            <p className="uppercase tracking-[4px]
            text-[#b8975a] text-sm mb-8">
              Welcome To Alhambra
            </p>

            <h3 className="text-5xl mb-10 leading-tight">
              Luxury Hospitality
              <br />
              In The Heart
              <br />
              Of Tangier
            </h3>

            <p className="text-gray-600 leading-9 mb-8">
              At the foot of the Atlas Mountains stands a
              palace of unique charm and refined elegance.
            </p>

            <p className="text-gray-600 leading-9 mb-8">
              Combining Arab-Moorish architecture with
              contemporary luxury, Alhambra offers an
              unforgettable experience.
            </p>

            <button
              className="mt-6 bg-[#b8975a]
              hover:bg-[#94733e]
              text-white px-10 py-4
              uppercase tracking-[4px]
              text-xs duration-500"
            >
              Explore Hotel
            </button>
          </div>
        </div>
      </section>

      {/* ACCOMMODATION */}
      <section className="grid md:grid-cols-2">

        <div
          className="bg-[#e8ddcf]
          px-10 md:px-20 py-24
          flex flex-col justify-center"
        >

          <p
            className="uppercase tracking-[4px]
            text-[#b8975a] text-sm mb-6"
          >
            Our Collection
          </p>

          <h2 className="text-5xl md:text-6xl mb-14">
            Accommodations
          </h2>

          <div className="flex flex-wrap gap-6 uppercase
          tracking-[3px] text-xs mb-10">

            <a href="/rooms" className="hover:text-[#b8975a]">
              Rooms
            </a>

            <a href="/suites" className="hover:text-[#b8975a]">
              Suites
            </a>

            <a href="/villas" className="hover:text-[#b8975a]">
              Villas
            </a>
          </div>

          <p className="text-gray-600 leading-9 max-w-xl">
            Elegant accommodations meticulously appointed
            with refined comfort and luxury amenities.
          </p>
        </div>

        <div className="relative overflow-hidden group h-[700px]">

          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            alt=""
            className="w-full h-full object-cover
            group-hover:scale-110 duration-[2500ms]"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-16 left-16 text-white">

            <h3 className="text-5xl mb-4">
              Luxury Rooms
            </h3>

            <a
              href="/rooms"
              className="uppercase tracking-[4px]
              text-sm hover:text-[#d4b37a]"
            >
              Discover →
            </a>
          </div>
        </div>
      </section>

      {/* SPA */}
      <section className="py-32 px-6 md:px-20">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          <div className="overflow-hidden group">

            <img
              src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8"
              alt=""
              className="w-full h-[850px] object-cover
              group-hover:scale-105 duration-[2000ms]"
            />
          </div>

          <div>

            <p className="uppercase tracking-[4px]
            text-[#b8975a] text-sm mb-6">
              Wellness & Serenity
            </p>

            <h2 className="text-5xl mb-10">
              Signature Spa
              <br />
              Experience
            </h2>

            <p className="text-gray-600 leading-9 mb-10">
              Discover a sanctuary dedicated to relaxation,
              rejuvenation and holistic wellbeing.
            </p>

            <button
              className="bg-[#b8975a]
              hover:bg-[#94733e]
              text-white px-10 py-4
              uppercase tracking-[4px]
              text-xs duration-500"
            >
              Discover Spa
            </button>

            <div className="grid grid-cols-2 gap-6 mt-16">

              <div className="overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  alt=""
                  className="h-72 w-full object-cover
                  group-hover:scale-110 duration-[2000ms]"
                />
              </div>

              <div className="overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
                  alt=""
                  className="h-72 w-full object-cover
                  group-hover:scale-110 duration-[2000ms]"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* RESTAURANT */}
      <section className="py-32 px-6 md:px-20">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          <div>

            <p className="uppercase tracking-[4px]
            text-[#b8975a] text-sm mb-6">
              Fine Dining
            </p>

            <h2 className="text-5xl mb-10">
              Gastronomic
              <br />
              Journey
            </h2>

            <p className="text-gray-600 leading-9 mb-10">
              Experience world-class cuisine in a refined
              atmosphere inspired by Moroccan elegance.
            </p>

            <button
              className="bg-[#b8975a]
              hover:bg-[#94733e]
              text-white px-10 py-4
              uppercase tracking-[4px]
              text-xs duration-500"
            >
              Reserve Table
            </button>
          </div>

          <div className="overflow-hidden group h-[700px]">

            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
              alt=""
              className="w-full h-full object-cover
              group-hover:scale-110 duration-[2500ms]"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;