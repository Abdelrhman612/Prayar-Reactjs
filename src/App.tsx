/* eslint-disable prefer-const */
import { useEffect, useState } from "react";
import Cities from "./components/Cities/Cities";
import Prayer from "./components/Prayer/Prayer";
import { cities } from "./data/Cities";

function App() {
  interface PrayerTimes {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  }

  const [prayerTimes, setPrayerTimes] = useState<Partial<PrayerTimes>>({});
  const [DateTimes, setDateTimes] = useState("");
  const [city, setCity] = useState("Cairo");
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`
        );
        const dataPrayer = await response.json();
        setPrayerTimes(dataPrayer.data.timings);
        setDateTimes(dataPrayer.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrayerTimes();
  }, [city]);

  const FormatTimes = (time: string) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "Pm" : "Am";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}${perd}`;
  };
  return (
    <>
      <section>
        <div className="container">
          <div className="top_sec">
            <Cities cities={cities} setCity={setCity} city={city} />

            <div className="date">
              <h3>التاريخ</h3>
              <h2>{DateTimes}</h2>
            </div>
          </div>
          <Prayer name="الفجر" time={FormatTimes(prayerTimes.Fajr || "null")} />
          <Prayer
            name="الظهر"
            time={FormatTimes(prayerTimes.Dhuhr || "null")}
          />
          <Prayer name="العصر" time={FormatTimes(prayerTimes.Asr || "null")} />
          <Prayer
            name="المغرب"
            time={FormatTimes(prayerTimes.Maghrib || "null")}
          />
          <Prayer
            name="العشاء"
            time={FormatTimes(prayerTimes.Isha || "null")}
          />
        </div>
      </section>
    </>
  );
}

export default App;
