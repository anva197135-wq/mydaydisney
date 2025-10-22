import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ATTRACTIONS = [
  { id: 1, name_en: "Main Street, U.S.A.", name_es: "Main Street U.S.A.", coords: [28.4187, -81.5812], zone: "Main Street" },
  { id: 2, name_en: "Peter Pan's Flight", name_es: "Peter Pan's Flight", coords: [28.4201, -81.5831], zone: "Fantasyland", group: "G1" },
  { id: 3, name_en: "Seven Dwarfs Mine Train", name_es: "Seven Dwarfs Mine Train", coords: [28.4208, -81.5841], zone: "Fantasyland", ll: "Individual" },
  { id: 4, name_en: "Under the Sea - Journey of the Little Mermaid", name_es: "Under the Sea - Journey of the Little Mermaid", coords: [28.4204, -81.5827], zone: "Fantasyland", group: "G2" },
  { id: 5, name_en: "Haunted Mansion", name_es: "Haunted Mansion", coords: [28.4193, -81.5839], zone: "Liberty Square", group: "G2" },
  { id: 6, name_en: "Tiana's Bayou Adventure", name_es: "Tiana's Bayou Adventure", coords: [28.4179, -81.5852], zone: "Frontierland", group: "G1" },
  { id: 7, name_en: "Big Thunder Mountain Railroad", name_es: "Big Thunder Mountain Railroad", coords: [28.4180, -81.5860], zone: "Frontierland", group: "G1" },
  { id: 8, name_en: "Jungle Cruise", name_es: "Jungle Cruise", coords: [28.4172, -81.5870], zone: "Adventureland", group: "G2" },
  { id: 9, name_en: "Pirates of the Caribbean", name_es: "Pirates of the Caribbean", coords: [28.4163, -81.5876], zone: "Adventureland", group: "G2" },
  { id: 10, name_en: "Mad Tea Party", name_es: "Mad Tea Party", coords: [28.4212, -81.5845], zone: "Fantasyland", group: "G2" },
  { id: 11, name_en: "Mickey's PhilharMagic", name_es: "Mickey's PhilharMagic", coords: [28.4202, -81.5835], zone: "Fantasyland" },
  { id: 12, name_en: "TRON Lightcycle / Run", name_es: "TRON Lightcycle / Run", coords: [28.4220, -81.5805], zone: "Tomorrowland", ll: "Individual" },
  { id: 13, name_en: "Space Mountain", name_es: "Space Mountain", coords: [28.4215, -81.5810], zone: "Tomorrowland", group: "G1" },
  { id: 14, name_en: "Buzz Lightyear's Space Ranger Spin", name_es: "Buzz Lightyear's Space Ranger Spin", coords: [28.4210, -81.5820], zone: "Tomorrowland", group: "G2" },
  { id: 15, name_en: "Astro Orbiter", name_es: "Astro Orbiter", coords: [28.4223, -81.5808], zone: "Tomorrowland" },
  { id: 16, name_en: "Monsters, Inc. Laugh Floor", name_es: "Monsters, Inc. Laugh Floor", coords: [28.4218, -81.5828], zone: "Tomorrowland" }
];

const ITINERARY = [
  { time: "7:15", en: "Arrival - Photos on Main Street", es: "Llegada - Fotos en Main Street" },
  { time: "8:00", en: "Rope Drop - Fantasyland: Winnie / Mermaid", es: "Rope Drop - Fantasyland: Winnie / Mermaid" },
  { time: "8:30", en: "Peter Pan's Flight (G1) or standby", es: "Peter Pan's Flight (G1) o fila" },
  { time: "9:15", en: "Seven Dwarfs Mine Train (LL Individual)", es: "Seven Dwarfs Mine Train (LL Individual)" },
  { time: "10:00", en: "Tiana's Bayou Adventure (Multi Pass G1)", es: "Tiana's Bayou Adventure (Multi Pass G1)" },
  { time: "11:15", en: "Haunted Mansion (Multi Pass G2)", es: "Haunted Mansion (Multi Pass G2)" },
  { time: "12:15", en: "Lunch - Mobile Order Pecos Bill", es: "Almuerzo - Mobile Order Pecos Bill" },
  { time: "13:15", en: "Jungle Cruise (Multi Pass G2)", es: "Jungle Cruise (Multi Pass G2)" },
  { time: "15:00", en: "Festival of Fantasy Parade", es: "Desfile Festival of Fantasy" },
  { time: "15:30", en: "Big Thunder Mountain (reserve G1 after Tiana)", es: "Big Thunder Mountain (reservar G1 tras Tiana)" },
  { time: "16:30", en: "Mad Tea Party / PhilharMagic", es: "Mad Tea Party / PhilharMagic" },
  { time: "17:30", en: "Peter Pan's Flight (G1 rotation)", es: "Peter Pan's Flight (rotación G1)" },
  { time: "18:30", en: "Dinner - Mobile Order Cosmic Ray's", es: "Cena - Mobile Order Cosmic Ray's" },
  { time: "19:00", en: "TRON Lightcycle / Run (LL Individual)", es: "TRON Lightcycle / Run (LL Individual)" },
  { time: "19:45", en: "Monsters, Inc. Laugh Floor", es: "Monsters, Inc. Laugh Floor" },
  { time: "20:15", en: "Astro Orbiter (if time)", es: "Astro Orbiter (si hay tiempo)" },
  { time: "21:00", en: "Happily Ever After Fireworks", es: "Show Happily Ever After" }
];

export default function App() {
  const [lang, setLang] = useState("es");
  const [checked, setChecked] = useState({});
  const [showExtras, setShowExtras] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("mk_checked");
    if (saved) setChecked(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("mk_checked", JSON.stringify(checked));
  }, [checked]);

  function toggle(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function t(obj) {
    return lang === "es" ? obj.name_es || obj.es || obj.en : obj.name_en || obj.en || obj.es;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">MY DAY DISNEY</h1>
        <div className="flex gap-2">
          <button onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="px-3 py-1 rounded bg-slate-200">{lang === "es" ? "Español" : "English"}</button>
          <button onClick={() => { navigator.share ? navigator.share({ title: 'MK Plan', text: 'Itinerario Magic Kingdom', url: window.location.href }) : alert('Share not supported') }}
            className="px-3 py-1 rounded bg-slate-200">Share</button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="col-span-2">
          <div className="mb-3">
            <h2 className="font-semibold">{lang === 'es' ? 'Itinerario' : 'Itinerary'}</h2>
            <ul className="mt-2 space-y-2">
              {ITINERARY.map((it, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white rounded p-2 shadow-sm">
                  <div className="w-16 text-sm font-mono">{it.time}</div>
                  <div className="flex-1">
                    <div className="text-sm">{lang === 'es' ? it.es : it.en}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">{lang === 'es' ? 'Checklist' : 'Checklist'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {ATTRACTIONS.map(a => (
                <label key={a.id} className="flex items-center gap-2 bg-white p-2 rounded shadow-sm">
                  <input type="checkbox" checked={!!checked[a.id]} onChange={() => toggle(a.id)} />
                  <div className="text-sm">{t(a)} <span className="text-xs text-slate-400">{a.group ? `(${a.group})` : a.ll ? `(LL)` : ''}</span></div>
                </label>
              ))}
            </div>
          </div>

        </section>

        <aside>
          <div className="mb-3 bg-white p-3 rounded shadow-sm">
            <h4 className="font-semibold">{lang === 'es' ? 'Mapa' : 'Map'}</h4>
            <p className="text-xs text-slate-500">{lang === 'es' ? 'Usa tu ubicación en el iPhone para ver dónde estás dentro del parque.' : 'Enable location on your iPhone to see where you are inside the park.'}</p>
            <div className="h-64 mt-2">
              <MapContainer center={[28.420, -81.583]} zoom={16} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {ATTRACTIONS.map(a => (
                  <Marker key={a.id} position={a.coords}>
                    <Popup>
                      <div className="text-sm font-medium">{t(a)}</div>
                      <div className="text-xs text-slate-500">{a.zone}</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="bg-white p-3 rounded shadow-sm">
            <h4 className="font-semibold">{lang === 'es' ? 'Comidas (Mobile Order)' : 'Meals (Mobile Order)'}</h4>
            <ul className="text-sm mt-2 space-y-1">
              <li>Pecos Bill Tall Tale Inn & Cafe — {lang === 'es' ? 'Almuerzo' : 'Lunch'}</li>
              <li>Cosmic Ray's Starlight Cafe — {lang === 'es' ? 'Cena' : 'Dinner'}</li>
              <li>Storybook Treats / Aloha Isle — {lang === 'es' ? 'Snacks' : 'Snacks'}</li>
            </ul>
          </div>

          <div className="mt-3 bg-white p-3 rounded shadow-sm">
            <h4 className="font-semibold">{lang === 'es' ? 'Instrucciones iPhone' : 'iPhone Instructions'}</h4>
            <ol className="text-sm mt-2 list-decimal list-inside">
              <li>{lang === 'es' ? 'Abrir este enlace en Safari.' : 'Open this link in Safari.'}</li>
              <li>{lang === 'es' ? 'Tocar Compartir → Agregar a pantalla de inicio.' : 'Tap Share → Add to Home Screen.'}</li>
              <li>{lang === 'es' ? 'Abrir desde el icono como una app durante tu visita.' : 'Open from the icon as an app during your visit.'}</li>
            </ol>
          </div>

        </aside>
      </main>

      <footer className="text-xs text-slate-500 mt-4">{lang === 'es' ? 'Generado: Itinerario optimizado para iPhone, versión completa (ES/EN).' : 'Generated: Optimized itinerary for iPhone, full version (ES/EN).'}</footer>
    </div>
  );
}
