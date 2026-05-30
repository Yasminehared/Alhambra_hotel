import Header from "./composant/header";
import Footer from "./composant/footer";
import BookingBar from "./composant/BookingBar";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
    <style>{`/* ===== GLOBAL ===== */
.home {
  background-color: #f8f6f2;
  color: #3a2e1e;
  overflow: hidden;
}

/* ===== HERO ===== */
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

Link {
}

.hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  animation: slowZoom 18s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  from { transform: scale(1.1); }
  to   { transform: scale(1.0); }
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.30);
}

.hero__content {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  padding: 0 1.5rem;
}

.hero__tagline {
  text-transform: uppercase;
  letter-spacing: 6px;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.hero__title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  line-height: 1.15;
  max-width: 64rem;
  margin: 0;
}

.hero__btn {
  margin-top: 2.5rem;
  border: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s;
}

.hero__btn:hover {
  background-color: #ffffff;
  color: #000000;
}

/* ===== ABOUT ===== */
.about {
  padding: 8rem 1.5rem;
}

@media (min-width: 768px) {
  .about { padding: 8rem 5rem; }
}

.about__header {
  text-align: center;
  margin-bottom: 6rem;
}

.about__divider {
  width: 1px;
  height: 6rem;
  background-color: #b8975a;
  margin: 0 auto 2.5rem;
}

.about__title {
  font-size: clamp(2.5rem, 6vw, 4.375rem);
  font-weight: 300;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.2;
}

.about__grid {
  display: grid;
  gap: 5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .about__grid { grid-template-columns: 1fr 1fr; }
}

.about__img-wrapper {
  position: relative;
  overflow: hidden;
}

.about__img-wrapper:hover .about__img {
  transform: scale(1.05);
}

.about__img {
  width: 100%;
  height: 750px;
  object-fit: cover;
  transition: transform 2000ms ease;
}

.about__img-border {
  position: absolute;
  inset: 2.5rem;
  border: 1px solid #d4b37a;
  pointer-events: none;
}

.about__label {
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #b8975a;
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.about__subtitle {
  font-size: clamp(2rem, 4vw, 3.125rem);
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 2.5rem;
}

.about__text {
  color: #4b5563;
  line-height: 2.25;
  margin-bottom: 2rem;
}

.about__btn {
  margin-top: 1.5rem;
  background-color: #b8975a;
  color: #ffffff;
  border: none;
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.5s;
}

.about__btn:hover {
  background-color: #94733e;
}

/* ===== ACCOMMODATION ===== */
.accommodation {
  display: grid;
}

@media (min-width: 768px) {
  .accommodation { grid-template-columns: 1fr 1fr; }
}

.accommodation__info {
  background-color: #e8ddcf;
  padding: 6rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 768px) {
  .accommodation__info { padding: 6rem 5rem; }
}

.accommodation__label {
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #b8975a;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.accommodation__title {
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 400;
  margin-bottom: 3.5rem;
}

.accommodation__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.75rem;
  margin-bottom: 2.5rem;
}

.accommodation__nav a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
}

.accommodation__nav a:hover {
  color: #b8975a;
}

.accommodation__text {
  color: #4b5563;
  line-height: 2.25;
  max-width: 36rem;
}

.accommodation__img-wrapper {
  position: relative;
  overflow: hidden;
  height: 700px;
}

.accommodation__img-wrapper:hover .accommodation__img {
  transform: scale(1.1);
}

.accommodation__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 2500ms ease;
}

.accommodation__img-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.20);
}

.accommodation__caption {
  position: absolute;
  bottom: 4rem;
  left: 4rem;
  color: #ffffff;
}

.accommodation__caption h3 {
  font-size: clamp(2rem, 4vw, 3.125rem);
  font-weight: 400;
  margin-bottom: 1rem;
}

.accommodation__caption a {
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.875rem;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
}

.accommodation__caption a:hover {
  color: #d4b37a;
}

/* ===== SPA ===== */
.spa {
  padding: 8rem 1.5rem;
}

@media (min-width: 768px) {
  .spa { padding: 8rem 5rem; }
}

.spa__grid {
  display: grid;
  gap: 5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .spa__grid { grid-template-columns: 1fr 1fr; }
}

.spa__img-main-wrapper {
  overflow: hidden;
}

.spa__img-main-wrapper:hover .spa__img-main {
  transform: scale(1.05);
}

.spa__img-main {
  width: 100%;
  height: 850px;
  object-fit: cover;
  transition: transform 2000ms ease;
}

.spa__label {
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #b8975a;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.spa__title {
  font-size: clamp(2rem, 4vw, 3.125rem);
  font-weight: 400;
  margin-bottom: 2.5rem;
  line-height: 1.2;
}

.spa__text {
  color: #4b5563;
  line-height: 2.25;
  margin-bottom: 2.5rem;
}

.spa__btn {
  background-color: #b8975a;
  color: #ffffff;
  border: none;
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.5s;
}

.spa__btn:hover {
  background-color: #94733e;
}

.spa__img-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 4rem;
}

.spa__img-thumb-wrapper {
  overflow: hidden;
}

.spa__img-thumb-wrapper:hover .spa__img-thumb {
  transform: scale(1.1);
}

.spa__img-thumb {
  height: 18rem;
  width: 100%;
  object-fit: cover;
  transition: transform 2000ms ease;
}

/* ===== RESTAURANT ===== */
.restaurant {
  padding: 8rem 1.5rem;
}

@media (min-width: 768px) {
  .restaurant { padding: 8rem 5rem; }
}

.restaurant__grid {
  display: grid;
  gap: 5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .restaurant__grid { grid-template-columns: 1fr 1fr; }
}

.restaurant__label {
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #b8975a;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.restaurant__title {
  font-size: clamp(2rem, 4vw, 3.125rem);
  font-weight: 400;
  margin-bottom: 2.5rem;
  line-height: 1.2;
}

.restaurant__text {
  color: #4b5563;
  line-height: 2.25;
  margin-bottom: 2.5rem;
}

.restaurant__btn {
  background-color: #b8975a;
  color: #ffffff;
  border: none;
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.5s;
}

.restaurant__btn:hover {
  background-color: #94733e;
}

.restaurant__img-wrapper {
  overflow: hidden;
  height: 700px;
}

.restaurant__img-wrapper:hover .restaurant__img {
  transform: scale(1.1);
}

.restaurant__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 2500ms ease;
}`}</style>
     <div className="home">
 
      {/* HERO */}
      <section className="hero">
 
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt=""
          className="hero__img"
        />
 
        <div className="hero__overlay" />
 
        <Header  />
 
        {/* HERO TEXT */}
        <div className="hero__content">
 
          <p className="hero__tagline">
            Luxury Redefined
          </p>
 
          <h1 className="hero__title">
            Experience Timeless
            <br />
            Moroccan Elegance
          </h1>
 
          <Link to="/stay">Explore Hotel</Link>
           
        </div>
 
        <BookingBar />
      </section>
 
      {/* ABOUT */}
      <section className="about">
 
        <div className="about__header">
          <div className="about__divider" />
          <h2 className="about__title">
            A Palace With
            <br />
            Singular Atmosphere
          </h2>
        </div>
 
        <div className="about__grid">
 
          <div className="about__img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
              alt=""
              className="about__img"
            />
            <div className="about__img-border" />
          </div>
 
          <div>
            <p className="about__label">Welcome To Alhambra</p>
 
            <h3 className="about__subtitle">
              Luxury Hospitality
              <br />
              In The Heart
              <br />
              Of Tangier
            </h3>
 
            <p className="about__text">
              At the foot of the Atlas Mountains stands a
              palace of unique charm and refined elegance.
            </p>
 
            <p className="about__text">
              Combining Arab-Moorish architecture with
              contemporary luxury, Alhambra offers an
              unforgettable experience.
            </p>
 
            <Link to="/about-us">Explore Hotel</Link>

          </div>
        </div>
      </section>
 
      {/* ACCOMMODATION */}
      <section className="accommodation">
 
        <div className="accommodation__info">
          <p className="accommodation__label">Our Collection</p>
 
          <h2 className="accommodation__title">
            Accommodations
          </h2>
 
          <nav className="accommodation__nav">
            <Link to="/hotel-service/rooms">Rooms</Link>
            <Link to="hotel-service/suites">Suites</Link>
            <Link to="hotel-service/villas">Villas</Link>
          </nav>
 
          <p className="accommodation__text">
            Elegant accommodations meticulously appointed
            with refined comfort and luxury amenities.
          </p>
        </div>
 
        <div className="accommodation__img-wrapper">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            alt=""
            className="accommodation__img"
          />
          <div className="accommodation__img-overlay" />
          <div className="accommodation__caption">
            <h3>Luxury Rooms</h3>
            <Link to="hotel-service/rooms">Discover →</Link>
          </div>
        </div>
      </section>
 
      {/* SPA */}
      <section className="spa">
 
        <div className="spa__grid">
 
          <div className="spa__img-main-wrapper">
            <img
              src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8"
              alt=""
              className="spa__img-main"
            />
          </div>
 
          <div>
            <p className="spa__label">Wellness & Serenity</p>
 
            <h2 className="spa__title">
              Signature Spa
              <br />
              Experience
            </h2>
 
            <p className="spa__text">
              Discover a sanctuary dedicated to relaxation,
              rejuvenation and holistic wellbeing.
            </p>
            <Link to="/hotel-service/spa">
              Discover Spa
            </Link>
            <div className="spa__img-grid">
 
              <div className="spa__img-thumb-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  alt=""
                  className="spa__img-thumb"
                />
              </div>
 
              <div className="spa__img-thumb-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
                  alt=""
                  className="spa__img-thumb"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* RESTAURANT */}
      <section className="restaurant">
 
        <div className="restaurant__grid">
 
          <div>
            <p className="restaurant__label">Fine Dining</p>
 
            <h2 className="restaurant__title">
              Gastronomic
              <br />
              Journey
            </h2>
 
            <p className="restaurant__text">
              Experience world-class cuisine in a refined
              atmosphere inspired by Moroccan elegance.
            </p>
 
            <Link To="/restaurant">
              Reserve Table
            </Link>
          </div>
 
          <div className="restaurant__img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
              alt=""
              className="restaurant__img"
            />
          </div>
        </div>
      </section>
 
      <Footer />
    </div>
    </>
  );
}

export default Home;