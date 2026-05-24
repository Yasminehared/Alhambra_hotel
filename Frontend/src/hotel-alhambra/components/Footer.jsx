function Footer() {
  return (
    <footer className="bg-[#eee7dd] px-6 md:px-10 py-20">

      <div className="text-center text-4xl text-[#b8975a] tracking-[5px] mb-10">
        ✦ ALHAMBRA ✦
      </div>

      {/* LINKS */}
      <div className="flex flex-wrap justify-center gap-10 uppercase tracking-[3px] text-[11px] mb-16">

        <a href="#" className="hover:text-[#b8975a]">
          Notre Histoire
        </a>

        <a href="#" className="hover:text-[#b8975a]">
          About Us
        </a>

        <a href="#" className="hover:text-[#b8975a]">
          Contact Us
        </a>

        <a href="#" className="hover:text-[#b8975a]">
          Conditions Générales
        </a>

      </div>

      {/* BOTTOM */}
      <div className="grid md:grid-cols-3 gap-10 border-t border-[#b8965a33] pt-10">

        <div>
          <h4 className="uppercase tracking-[3px] text-[10px] text-[#b8975a] mb-4">
            Contact
          </h4>

          <p className="text-[#7a6a58] leading-8 text-sm">
            Km 5, Route Malabata
            <br />
            Tanger 90000
            <br />
            +212 600000000
          </p>
        </div>

        <div>
          <h4 className="uppercase tracking-[3px] text-[10px] text-[#b8975a] mb-4">
            Newsletter
          </h4>

          <input
            type="email"
            placeholder="Votre adresse email"
            className="w-full border border-gray-300 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <h4 className="uppercase tracking-[3px] text-[10px] text-[#b8975a] mb-4">
            Suivez-Nous
          </h4>

          <p className="text-[#7a6a58] text-sm">
            Facebook · Instagram · X
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;