import { useState } from "react";

/* ── FONTS & GLOBAL CSS ── */
(() => {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
  document.head.appendChild(l);
  const s = document.createElement("style");
  s.textContent = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{background:#f0f2f7;font-family:'Inter',sans-serif;color:#1a1f2e;min-height:100vh}
    input,select,button{font-family:'Inter',sans-serif}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#d0d5dd;border-radius:10px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    .fade-up{animation:fadeUp .36s cubic-bezier(.22,.68,0,1.2) both}
    .if{width:100%;background:#fff;border:1.5px solid #e4e7ec;border-radius:10px;color:#1a1f2e;
        padding:11px 14px;font-size:14px;transition:border-color .18s,box-shadow .18s;appearance:none}
    .if:focus{outline:none;border-color:#1a3a6b;box-shadow:0 0 0 3px rgba(26,58,107,.09)}
    .if::placeholder{color:#b0b8cc}
    .btn{border:none;border-radius:10px;padding:13px 22px;font-size:14px;font-weight:600;
         cursor:pointer;transition:all .17s;display:flex;align-items:center;justify-content:center;gap:8px}
    .btn-p{background:#1a3a6b;color:#fff}
    .btn-p:hover{background:#0f2a55;transform:translateY(-1px);box-shadow:0 4px 18px rgba(26,58,107,.28)}
    .btn-p:disabled{opacity:.45;cursor:default;transform:none;box-shadow:none}
    .btn-g{background:#fff;color:#1a3a6b;border:1.5px solid #c8d5e8}
    .btn-g:hover{border-color:#1a3a6b;background:#f0f5ff;transform:translateY(-1px)}
    .btn-g:disabled{opacity:.45;cursor:default;transform:none}
    .tear{width:100%;height:1px;
      background:repeating-linear-gradient(90deg,#d4dbe8 0,#d4dbe8 7px,transparent 7px,transparent 13px);
      position:relative}
    .tear::before,.tear::after{content:'';position:absolute;top:-10px;width:20px;height:20px;
      border-radius:50%;background:#f0f2f7}
    .tear::before{left:-10px}.tear::after{right:-10px}
    .drop{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;
      border:1.5px solid #e4e7ec;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.12);z-index:400;overflow:hidden;max-height:260px;overflow-y:auto}
    .dr{padding:9px 14px;cursor:pointer;display:flex;justify-content:space-between;
      align-items:center;border-bottom:1px solid #f4f6f9;transition:background .1s}
    .dr:hover{background:#f0f5ff}
    .lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7a8399;display:block;margin-bottom:6px}
    .cl-sec{border:1px solid #e8eaf0;border-radius:12px;overflow:hidden;margin-bottom:7px}
    .cl-hdr{background:#f8faff;padding:10px 14px;font-size:10px;font-weight:700;letter-spacing:2px;
      text-transform:uppercase;color:#6b7a99;cursor:pointer;display:flex;align-items:center;
      justify-content:space-between;user-select:none}
    .cl-hdr:hover{background:#eef3ff}
    .cl-row{display:flex;align-items:center;gap:12px;padding:10px 14px;
      border-top:1px solid #f0f2f7;cursor:pointer;transition:background .1s}
    .cl-row:hover{background:#f8faff}.cl-row.done{background:#f0faf4}
    .cl-row.done .cl-lbl{color:#9aa3b2;text-decoration:line-through}
    .cl-box{width:18px;height:18px;border-radius:5px;border:2px solid #d0d5dd;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;transition:all .12s}
    .cl-box.on{background:#0f9d58;border-color:#0f9d58}
    .cl-lbl{flex:1;font-size:13px;color:#3a4259}
    .cl-val{font-size:12px;font-weight:600;font-family:'JetBrains Mono',monospace;
      text-align:right;min-width:90px;color:#6b7a99}
    .cl-val.hi{color:#1a3a6b}
    .pb{height:4px;background:#e4e7ec;border-radius:2px;overflow:hidden;margin-bottom:10px}
    .pf{height:100%;background:linear-gradient(90deg,#0f9d58,#4ade80);border-radius:2px;transition:width .3s}
    .pill{display:flex;background:#eef0f7;border-radius:8px;padding:3px;gap:2px}
    .popt{flex:1;padding:7px 12px;border:none;border-radius:6px;font-size:13px;font-weight:600;
      cursor:pointer;transition:all .14s;background:transparent;color:#6b7a99}
    .popt.on{background:#fff;color:#1a1f2e;box-shadow:0 1px 4px rgba(0,0,0,.1)}
  `;
  document.head.appendChild(s);
})();

/* ══════════════════════════════════════
   AIRLINES
══════════════════════════════════════ */
type AL = { name: string; _bg: string; _fg: string };

const AIRLINE_DOMAINS: Record<string,string> = {
  BA:"britishairways.com", EK:"emirates.com",    QR:"qatarairways.com",
  SQ:"singaporeair.com",   CX:"cathaypacific.com",TK:"turkishairlines.com",
  AF:"airfrance.com",      AA:"aa.com",           UA:"united.com",
  DL:"delta.com",          LH:"lufthansa.com",    EY:"etihad.com",
  KL:"klm.com",            VS:"virginatlantic.com",QF:"qantas.com",
  NZ:"airnewzealand.com",  AC:"aircanada.com",    JL:"jal.com",
  NH:"ana.co.jp",          KE:"koreanair.com",    LX:"swiss.com",
  IB:"iberia.com",         TP:"flytap.com",       AY:"finnair.com",
  SK:"flysas.com",         MH:"malaysiaairlines.com",TG:"thaiairways.com",
  ET:"ethiopianairlines.com",LA:"latam.com",      OS:"austrian.com",
  MS:"egyptair.com",
};

export const airlineLogo = (iata: string) => {
  const domain = AIRLINE_DOMAINS[iata];
  if (!domain) return "";
  return `https://logo.clearbit.com/${domain}`;
};

const AIRLINES: Record<string, AL> = {
  BA: { name:"British Airways",    _bg:"#075aaa", _fg:"#fff"    },
  EK: { name:"Emirates",           _bg:"#c60c30", _fg:"#fff"    },
  QR: { name:"Qatar Airways",      _bg:"#5c0632", _fg:"#f0e6d3" },
  SQ: { name:"Singapore Airlines", _bg:"#143d6b", _fg:"#fff"    },
  CX: { name:"Cathay Pacific",     _bg:"#006564", _fg:"#fff"    },
  TK: { name:"Turkish Airlines",   _bg:"#c8102e", _fg:"#fff"    },
  AF: { name:"Air France",         _bg:"#002157", _fg:"#fff"    },
  AA: { name:"American Airlines",  _bg:"#0078d2", _fg:"#fff"    },
  UA: { name:"United Airlines",    _bg:"#1a3d7a", _fg:"#fff"    },
  DL: { name:"Delta Air Lines",    _bg:"#003366", _fg:"#fff"    },
  LH: { name:"Lufthansa",          _bg:"#05164d", _fg:"#fff"    },
  EY: { name:"Etihad Airways",     _bg:"#1a2a4a", _fg:"#c8a96e" },
  KL: { name:"KLM",                _bg:"#009abf", _fg:"#fff"    },
  VS: { name:"Virgin Atlantic",    _bg:"#e2001a", _fg:"#fff"    },
  QF: { name:"Qantas",             _bg:"#e40000", _fg:"#fff"    },
  NZ: { name:"Air New Zealand",    _bg:"#00144e", _fg:"#fff"    },
  AC: { name:"Air Canada",         _bg:"#c8102e", _fg:"#fff"    },
  JL: { name:"Japan Airlines",     _bg:"#c8102e", _fg:"#fff"    },
  NH: { name:"ANA",                _bg:"#003087", _fg:"#fff"    },
  KE: { name:"Korean Air",         _bg:"#003087", _fg:"#fff"    },
  LX: { name:"Swiss",              _bg:"#cc0000", _fg:"#fff"    },
  IB: { name:"Iberia",             _bg:"#c8102e", _fg:"#fff"    },
  TP: { name:"TAP Air Portugal",   _bg:"#007749", _fg:"#fff"    },
  AY: { name:"Finnair",            _bg:"#003580", _fg:"#fff"    },
  SK: { name:"SAS",                _bg:"#003c74", _fg:"#fff"    },
  MH: { name:"Malaysia Airlines",  _bg:"#0033a0", _fg:"#fff"    },
  TG: { name:"Thai Airways",       _bg:"#5a0028", _fg:"#d4a843" },
  ET: { name:"Ethiopian Airlines", _bg:"#006940", _fg:"#fff"    },
  LA: { name:"LATAM Airlines",     _bg:"#d01a22", _fg:"#fff"    },
  OS: { name:"Austrian Airlines",  _bg:"#c8102e", _fg:"#fff"    },
  MS: { name:"EgyptAir",           _bg:"#003087", _fg:"#fff"    },
};

/* ══════════════════════════════════════
   VERIFIED FLIGHT DATABASE
══════════════════════════════════════ */
type FR = [string,string,string,string,string,string,string];
export const DB: FR[] = [
  ["BA11",  "BA","EGLL","WSSS","B77W","13h 05m","6,757"],
  ["BA15",  "BA","EGLL","WSSS","A359","13h 00m","6,757"],
  ["BA25",  "BA","EGLL","KJFK","B77W","7h 55m", "3,459"],
  ["BA93",  "BA","EGLL","CYYZ","B77W","8h 30m", "3,544"],
  ["BA117", "BA","EGLL","KJFK","B77W","7h 50m", "3,459"],
  ["BA183", "BA","EGLL","KJFK","A359","7h 55m", "3,459"],
  ["BA257", "BA","EGLL","VIDP","B77W","8h 30m", "3,933"],
  ["EK1",   "EK","OMDB","EGLL","A388","7h 30m", "2,978"],
  ["EK2",   "EK","EGLL","OMDB","A388","6h 55m", "2,978"],
  ["EK21",  "EK","OMDB","EGCC","A388","7h 10m", "3,041"],
  ["EK201", "EK","OMDB","KJFK","B77W","13h 50m","6,837"],
  ["EK203", "EK","OMDB","KJFK","A388","14h 05m","6,837"],
  ["EK215", "EK","OMDB","KLAX","A388","16h 10m","8,334"],
  ["EK221", "EK","OMDB","KDFW","B77W","15h 50m","8,037"],
  ["QR1",   "QR","OTHH","EGLL","A359","7h 00m", "3,250"],
  ["QR2",   "QR","EGLL","OTHH","A359","6h 30m", "3,250"],
  ["QR23",  "QR","OTHH","EGCC","A359","7h 05m", "3,180"],
  ["QR725", "QR","OTHH","KORD","B77W","14h 05m","6,508"],
  ["QR737", "QR","OTHH","KSFO","B77W","16h 25m","8,093"],
  ["QR767", "QR","OTHH","CYYZ","A359","13h 50m","6,781"],
  ["SQ7",   "SQ","WSSS","KJFK","A359","18h 45m","9,527"],
  ["SQ21",  "SQ","KEWR","WSSS","A359","17h 50m","9,523"],
  ["SQ25",  "SQ","EDDF","WSSS","A359","12h 25m","6,058"],
  ["SQ221", "SQ","WSSS","YSSY","A388","7h 50m", "3,906"],
  ["SQ317", "SQ","EGLL","WSSS","A359","13h 05m","6,757"],
  ["CX251", "CX","VHHH","EGLL","B77W","12h 45m","5,990"],
  ["CX893", "CX","VHHH","KJFK","B77W","15h 55m","8,054"],
  ["CX841", "CX","VHHH","KSFO","A359","11h 00m","5,581"],
  ["CX101", "CX","VHHH","WSSS","A359","3h 55m", "1,589"],
  ["CX543", "CX","VHHH","RJAA","A359","4h 00m", "1,799"],
  ["LH400", "LH","EDDF","KJFK","A359","9h 00m", "3,860"],
  ["LH401", "LH","KJFK","EDDF","A359","7h 50m", "3,860"],
  ["LH463", "LH","KMIA","EDDF","A359","9h 30m", "4,912"],
  ["AF11",  "AF","LFPG","KJFK","A388","8h 30m", "3,636"],
  ["AF66",  "AF","LFPG","RJAA","B77W","12h 05m","5,970"],
  ["AA100", "AA","EGLL","KJFK","B77W","7h 55m", "3,459"],
  ["AA101", "AA","KJFK","EGLL","B77W","6h 55m", "3,459"],
  ["AA41",  "AA","KJFK","LFPG","B789","7h 20m", "3,636"],
  ["UA14",  "UA","KEWR","EGLL","B77W","6h 55m", "3,459"],
  ["UA18",  "UA","LIMC","KEWR","B77W","8h 55m", "4,000"],
  ["UA181", "UA","EDDF","KDEN","B77W","10h 45m","5,173"],
  ["DL1",   "DL","KJFK","EGLL","A359","7h 00m", "3,459"],
  ["DL400", "DL","KATL","LFPG","A359","9h 20m", "4,389"],
  ["KL641", "KL","EHAM","KJFK","B77W","8h 30m", "3,644"],
  ["KL807", "KL","EHAM","RCTP","B77W","12h 00m","5,711"],
  ["EY12",  "EY","OMAA","KJFK","A359","14h 00m","6,830"],
  ["EY101", "EY","OMAA","EGLL","B77W","7h 45m", "3,390"],
  ["VS3",   "VS","EGLL","KJFK","A359","7h 30m", "3,459"],
  ["VS400", "VS","EGLL","KIAD","A333","8h 00m", "3,669"],
  ["QF1",   "QF","EGLL","YSSY","A388","22h 30m","10,555"],
  ["QF7",   "QF","YSSY","EGLL","A388","22h 30m","10,555"],
  ["QF11",  "QF","YSSY","KLAX","A388","14h 55m","7,488"],
  ["NZ1",   "NZ","KJFK","NZAA","B789","17h 25m","8,828"],
  ["NZ2",   "NZ","NZAA","KJFK","B789","16h 00m","8,828"],
  ["NZ7",   "NZ","NZAA","KLAX","B789","12h 00m","5,921"],
  ["AC1",   "AC","CYYZ","EGLL","B77W","7h 00m", "3,544"],
  ["AC856", "AC","CYVR","WSSS","B789","16h 10m","8,088"],
  ["AC874", "AC","CYYZ","OMDB","B77W","11h 20m","5,956"],
  ["JL7",   "JL","RJAA","KJFK","B77W","13h 05m","6,738"],
  ["JL43",  "JL","RJAA","EGLL","B77W","12h 55m","5,957"],
  ["NH1",   "NH","RJTT","KLAX","B789","10h 00m","5,449"],
  ["NH211", "NH","RJTT","KJFK","B77W","13h 20m","6,754"],
  ["KE1",   "KE","RKSI","KJFK","B77W","13h 25m","6,878"],
  ["KE17",  "KE","RKSI","KLAX","A388","11h 05m","5,570"],
  ["LX40",  "LX","LSZH","KJFK","B77W","8h 30m", "3,936"],
  ["LX138", "LX","LSZH","WSSS","A333","12h 25m","6,062"],
  ["IB6275","IB","LEMD","S_BGR","A359","11h 00m","5,017"],
  ["IB3407","IB","LEMD","KMIA","A333","9h 45m", "4,430"],
  ["TP7",   "TP","LPPT","KJFK","A333","8h 00m", "3,365"],
  ["TP21",  "TP","LPPT","KMIA","A333","9h 05m", "3,994"],
  ["AY45",  "AY","EFHK","RJAA","A359","9h 45m", "4,562"],
  ["AY101", "AY","EFHK","KJFK","A359","8h 45m", "4,123"],
  ["SK903", "SK","EKCH","KJFK","A333","8h 45m", "3,870"],
  ["MH1",   "MH","WMKK","EGLL","A359","12h 50m","6,349"],
  ["TG917", "TG","VTBS","EGLL","A388","11h 30m","5,328"],
  ["ET600", "ET","HAAB","EGLL","B789","8h 50m", "3,673"],
  ["LA705", "LA","SCEL","LEMD","B789","13h 50m","6,284"],
  ["OS51",  "OS","LOWW","OMDB","B77W","5h 40m", "2,745"],
  ["MS777", "MS","HECA","KJFK","B77W","11h 30m","5,603"],
  ["TK1",   "TK","LTFM","KJFK","B77W","11h 00m","5,180"],
  ["TK3",   "TK","LTFM","KLAX","B77W","13h 20m","6,774"],
  ["TK77",  "TK","LTFM","WSSS","A359","10h 30m","5,058"],
];

/* ══════════════════════════════════════
   AIRPORTS
══════════════════════════════════════ */
const AP: Record<string,[string,string]> = {
  EGLL:["Heathrow","London"],           EGKK:["Gatwick","London"],
  EGSS:["Stansted","London"],           EGCC:["Manchester","Manchester"],
  EGBB:["Birmingham","Birmingham"],     EGPH:["Edinburgh","Edinburgh"],
  EGPF:["Glasgow","Glasgow"],           EIDW:["Dublin","Dublin"],
  EINN:["Shannon","Shannon"],           EICK:["Cork","Cork"],
  LFPG:["Charles de Gaulle","Paris"],   LFPO:["Orly","Paris"],
  LFMN:["Nice Côte d'Azur","Nice"],     LFML:["Provence","Marseille"],
  EDDF:["Frankfurt","Frankfurt"],       EDDM:["Munich","Munich"],
  EDDB:["Brandenburg","Berlin"],        EDDH:["Hamburg","Hamburg"],
  EDDL:["Düsseldorf","Düsseldorf"],     EDDK:["Cologne Bonn","Cologne"],
  EHAM:["Schiphol","Amsterdam"],        EBBR:["Brussels","Brussels"],
  LEMD:["Barajas","Madrid"],            LEBL:["El Prat","Barcelona"],
  LEMG:["Costa del Sol","Malaga"],      LEPA:["Palma","Palma de Mallorca"],
  GCLP:["Gran Canaria","Las Palmas"],   GCTS:["Tenerife South","Tenerife"],
  LPPT:["Humberto Delgado","Lisbon"],   LPPR:["Francisco Sá Carneiro","Porto"],
  LPFR:["Faro","Faro"],
  LSZH:["Zürich","Zürich"],             LSGG:["Cointrin","Geneva"],
  LOWW:["Vienna","Vienna"],             LOWI:["Innsbruck","Innsbruck"],
  LKPR:["Václav Havel","Prague"],       EPWA:["Chopin","Warsaw"],
  EPKK:["Kraków","Kraków"],
  LHBP:["Budapest Ferenc Liszt","Budapest"],
  LROP:["Henri Coandă","Bucharest"],    LYBE:["Nikola Tesla","Belgrade"],
  LGAV:["Eleftherios Venizelos","Athens"],
  LCLK:["Larnaca","Larnaca"],
  LIRF:["Fiumicino","Rome"],            LIMC:["Malpensa","Milan"],
  LIME:["Orio al Serio","Bergamo"],     LIPZ:["Marco Polo","Venice"],
  EKCH:["Kastrup","Copenhagen"],        ENGM:["Gardermoen","Oslo"],
  ENBR:["Flesland","Bergen"],           EFHK:["Vantaa","Helsinki"],
  ESGG:["Landvetter","Gothenburg"],     ESSA:["Arlanda","Stockholm"],
  BIIS:["Keflavík","Reykjavík"],
  EVRA:["Riga","Riga"],                 EYVI:["Vilnius","Vilnius"],
  EETN:["Lennart Meri","Tallinn"],
  UUEE:["Sheremetyevo","Moscow"],       ULLI:["Pulkovo","St. Petersburg"],
  UKBB:["Boryspil","Kyiv"],
  LTFM:["Istanbul Airport","Istanbul"], LTAI:["Antalya","Antalya"],
  LTBJ:["Adnan Menderes","İzmir"],
  UDYZ:["Zvartnots","Yerevan"],         UBBB:["Heydar Aliyev","Baku"],
  UGTB:["Tbilisi","Tbilisi"],
  OMDB:["Dubai Int'l","Dubai"],         OMDW:["Al Maktoum","Dubai"],
  OMAA:["Zayed Int'l","Abu Dhabi"],     OTHH:["Hamad Int'l","Doha"],
  OBBI:["Bahrain Int'l","Manama"],      OKBK:["Kuwait Int'l","Kuwait City"],
  OOMS:["Muscat Int'l","Muscat"],
  OEJN:["King Abdulaziz","Jeddah"],     OERK:["King Khalid","Riyadh"],
  OEDF:["King Fahd","Dammam"],
  OLBA:["Rafic Hariri","Beirut"],       OJAI:["Queen Alia","Amman"],
  LL_BGR:["Ben Gurion","Tel Aviv"],
  VIDP:["Indira Gandhi","Delhi"],       VABB:["Chhatrapati Shivaji","Mumbai"],
  VOBL:["Kempegowda","Bengaluru"],      VOMM:["Chennai","Chennai"],
  VOCC:["Cochin","Kochi"],              VOGO:["Goa","Goa"],
  VECC:["Netaji S.C. Bose","Kolkata"],  VIAH:["Rajiv Gandhi","Hyderabad"],
  OPKC:["Jinnah","Karachi"],            OPLA:["Allama Iqbal","Lahore"],
  OPIS:["Islamabad","Islamabad"],       OPPW:["Peshawar","Peshawar"],
  OPQT:["Quetta","Quetta"],             OPMT:["Multan","Multan"],
  VRMM:["Velana","Malé"],               VCBI:["Bandaranaike","Colombo"],
  VGZR:["Shahjalal","Dhaka"],           VNKT:["Tribhuvan","Kathmandu"],
  WSSS:["Changi","Singapore"],          WMKK:["KLIA","Kuala Lumpur"],
  WMKP:["Penang","Penang"],             WBKK:["Kota Kinabalu","Kota Kinabalu"],
  VTBS:["Suvarnabhumi","Bangkok"],      VTBD:["Don Mueang","Bangkok"],
  VTSP:["Phuket","Phuket"],             VTCC:["Chiang Mai","Chiang Mai"],
  VVTS:["Tan Son Nhat","Ho Chi Minh City"], VVNB:["Noi Bai","Hanoi"],
  VVDN:["Da Nang","Da Nang"],
  WIII:["Soekarno-Hatta","Jakarta"],    WADD:["Ngurah Rai","Bali"],
  RPLL:["Ninoy Aquino","Manila"],       RPVM:["Mactan-Cebu","Cebu"],
  VDPP:["Phnom Penh","Phnom Penh"],     VYYY:["Yangon","Yangon"],
  RJAA:["Narita","Tokyo"],              RJTT:["Haneda","Tokyo"],
  RJBB:["Kansai","Osaka"],              RJCC:["New Chitose","Sapporo"],
  RJFF:["Fukuoka","Fukuoka"],           RJNN:["Chubu Centrair","Nagoya"],
  RKSI:["Incheon","Seoul"],             RKSS:["Gimpo","Seoul"],
  RKPK:["Gimhae","Busan"],
  RCTP:["Taoyuan","Taipei"],            RCSS:["Songshan","Taipei"],
  VHHH:["Hong Kong Int'l","Hong Kong"], VMMC:["Macau","Macau"],
  ZBAA:["Capital","Beijing"],           ZBAD:["Daxing","Beijing"],
  ZSPD:["Pudong","Shanghai"],           ZSSS:["Hongqiao","Shanghai"],
  ZGGG:["Baiyun","Guangzhou"],          ZGSZ:["Bao'an","Shenzhen"],
  ZUUU:["Tianfu","Chengdu"],            ZPPP:["Changshui","Kunming"],
  ZLXY:["Xianyang","Xi'an"],
  UAAA:["Almaty","Almaty"],             UACC:["Nursultan","Astana"],
  UTTТ:["Tashkent","Tashkent"],         UAFM:["Manas","Bishkek"],
  HECA:["Cairo","Cairo"],               HAAB:["Bole","Addis Ababa"],
  HKJK:["Jomo Kenyatta","Nairobi"],     HTDA:["Julius Nyerere","Dar es Salaam"],
  HRYR:["Kigali","Kigali"],             HUQI:["Entebbe","Entebbe"],
  DTTA:["Tunis-Carthage","Tunis"],      DAAG:["Houari Boumediene","Algiers"],
  GMME:["Mohammed V","Casablanca"],     GMMX:["Marrakech","Marrakech"],
  FAOR:["OR Tambo","Johannesburg"],     FACT:["Cape Town","Cape Town"],
  FALE:["King Shaka","Durban"],
  DNMM:["Murtala Muhammed","Lagos"],    DNAM:["Nnamdi Azikiwe","Abuja"],
  DIAP:["Félix-Houphouët-Boigny","Abidjan"],
  GOBD:["Blaise Diagne","Dakar"],       FOOL:["Léon-Mba","Libreville"],
  FMMI:["Ivato","Antananarivo"],        FIMP:["Sir S. Ramgoolam","Mauritius"],
  FSSS:["Seychelles","Mahé"],
  KJFK:["JFK","New York"],              KLGA:["LaGuardia","New York"],
  KEWR:["Newark Liberty","New York"],   KBOS:["Logan","Boston"],
  KPHL:["Philadelphia","Philadelphia"], KIAD:["Dulles","Washington DC"],
  KDCA:["Reagan National","Washington DC"],
  KATL:["Hartsfield-Jackson","Atlanta"],KMCO:["Orlando","Orlando"],
  KMIA:["Miami Int'l","Miami"],         KFLL:["Fort Lauderdale","Fort Lauderdale"],
  KTPA:["Tampa","Tampa"],
  KORD:["O'Hare","Chicago"],            KMDW:["Midway","Chicago"],
  KDTW:["Metropolitan Wayne County","Detroit"],
  KMSP:["Minneapolis-St. Paul","Minneapolis"],
  KSTL:["Lambert-St. Louis","St. Louis"],
  KMCI:["Kansas City","Kansas City"],
  KDEN:["Denver","Denver"],             KSLC:["Salt Lake City","Salt Lake City"],
  KDFW:["Dallas Fort Worth","Dallas"],  KAUS:["Austin-Bergstrom","Austin"],
  KIAH:["George Bush","Houston"],
  KMSY:["Louis Armstrong","New Orleans"],
  KSAN:["San Diego","San Diego"],       KLAX:["LAX","Los Angeles"],
  KSFO:["SFO","San Francisco"],         KOAK:["Oakland","Oakland"],
  KSJC:["San Jose","San Jose"],
  KPDX:["Portland","Portland"],         KSEA:["Seattle-Tacoma","Seattle"],
  KPHX:["Phoenix Sky Harbor","Phoenix"],
  KLAS:["Harry Reid","Las Vegas"],
  PANC:["Ted Stevens","Anchorage"],     PHNL:["Daniel K. Inouye","Honolulu"],
  KCLT:["Charlotte Douglas","Charlotte"],KRDU:["Raleigh-Durham","Raleigh"],
  KIND:["Indianapolis","Indianapolis"], KCMH:["John Glenn","Columbus"],
  KBNA:["Nashville","Nashville"],       KMEM:["Memphis","Memphis"],
  CYYZ:["Pearson","Toronto"],           CYVR:["Vancouver","Vancouver"],
  CYYC:["Calgary","Calgary"],           CYEG:["Edmonton","Edmonton"],
  CYUL:["Trudeau","Montréal"],          CYOW:["MacDonald-Cartier","Ottawa"],
  CYHZ:["Stanfield","Halifax"],
  MMMX:["Benito Juárez","Mexico City"], MMUN:["Cancún","Cancún"],
  MMGL:["Don Miguel Hidalgo","Guadalajara"],
  MROC:["Juan Santamaría","San José"],  MPTO:["Tocumen","Panama City"],
  MUHA:["José Martí","Havana"],         MDSD:["Las Américas","Santo Domingo"],
  TJSJ:["Luis Muñoz Marín","San Juan"],
  S_BGR:["Guarulhos","São Paulo"],       SBBR:["Juscelino Kubitschek","Brasília"],
  S_BGL:["Galeão","Rio de Janeiro"],     SBPA:["Salgado Filho","Porto Alegre"],
  SCEL:["Arturo Merino Benítez","Santiago"],
  SEQM:["Mariscal Sucre","Quito"],      SEGU:["José Joaquín de Olmedo","Guayaquil"],
  SKBO:["El Dorado","Bogotá"],          SPJC:["Jorge Chávez","Lima"],
  SVMI:["Simón Bolívar","Caracas"],      SAEZ:["Ministro Pistarini","Buenos Aires"],
  YSSY:["Kingsford Smith","Sydney"],    YMLB:["Melbourne","Melbourne"],
  YBBN:["Brisbane","Brisbane"],         YPPH:["Perth","Perth"],
  YPAD:["Adelaide","Adelaide"],
  NZAA:["Auckland","Auckland"],         NZCH:["Christchurch","Christchurch"],
  NZWN:["Wellington","Wellington"],     NZQN:["Queenstown","Queenstown"],
  NFFN:["Nadi","Nadi"],
  PGUM:["Antonio B. Won Pat","Guam"],
};

export const apLabel = (icao: string) => AP[icao] ? `${AP[icao][0]}, ${AP[icao][1]}` : icao;
export const apCity  = (icao: string) => AP[icao]?.[1] || icao;

/* ══════════════════════════════════════
   AIRCRAFT DATA
══════════════════════════════════════ */
export const ACD: Record<string, any> = {
  B77W: { n:"Boeing 777-300ER", cruise:"M0.84", mid:"310 KTS", trim:"+4", eng:2,
    climb:[{s:"0→5,000ft",v:"3,000"},{s:"5,000ft→FL150",v:"2,500"},{s:"FL150→FL240",v:"2,000"},{s:"FL240→Cruise",v:"1,500"}],
    sc:{W:[[100,51,"FL300"],[50,41,"FL320"],[40,21,"FL360"],[20,0,"FL380"]],E:[[100,91,"FL290"],[90,61,"FL310"],[60,41,"FL330"],[40,0,"FL370"]]},
    tod:[{a:0,b:27,f:"5",n:"74–86%",vr:132,va:150},{a:28,b:44,f:"5/15",n:"76–88%",vr:142,va:161},{a:45,b:64,f:"5/15",n:"78–89%",vr:154,va:168},{a:65,b:84,f:"5/15",n:"81–92%",vr:163,va:175},{a:85,b:100,f:"15",n:"84–95%",vr:165,va:175}],
    lnd:[{a:0,b:27,f:"30",vp:137,vl:131},{a:28,b:34,f:"30",vp:140,vl:135},{a:35,b:44,f:"30",vp:145,vl:141},{a:45,b:54,f:"30",vp:151,vl:148},{a:55,b:64,f:"30",vp:157,vl:153},{a:65,b:72,f:"30",vp:164,vl:159},{a:73,b:84,f:"30",vp:166,vl:160},{a:85,b:100,f:"30",vp:172,vl:166}],
    fr:[{s:230,f:"5"},{s:245,f:"1"},{s:265,f:"0"}] },
  A388: { n:"Airbus A380-800", cruise:"M0.85", mid:"320 KTS", trim:"+2", eng:4,
    climb:[{s:"0→5,000ft",v:"1,500"},{s:"5,000ft→FL150",v:"2,500"},{s:"FL150→FL240",v:"1,300"},{s:"FL240→Cruise",v:"1,000"}],
    sc:{W:[[100,88,"FL360"],[87,41,"FL380"],[40,28,"FL400"],[27,0,"FL420"]],E:[[100,88,"FL350"],[87,41,"FL370"],[40,28,"FL390"],[27,0,"FL410"]]},
    tod:[{a:0,b:28,f:"1+F",n:"68–87%",vr:156,va:160},{a:29,b:68,f:"1+F",n:"81–109%",vr:157,va:172},{a:69,b:100,f:"2",n:"98–109%",vr:162,va:180}],
    lnd:[{a:0,b:28,f:"F",vp:137,vl:135},{a:29,b:68,f:"F",vp:152,vl:149},{a:69,b:100,f:"F",vp:158,vl:154}],
    fr:[{s:182,f:"F"},{s:196,f:"3"},{s:220,f:"2"},{s:222,f:"1+F"},{s:263,f:"1"}] },
  A359: { n:"Airbus A350-900", cruise:"M0.85", mid:"320 KTS", trim:"+2", eng:2,
    climb:[{s:"0→5,000ft",v:"3,000"},{s:"5,000ft→FL150",v:"2,300"},{s:"FL150→FL240",v:"1,600"},{s:"FL240→Cruise",v:"1,400"}],
    sc:{W:[[100,71,"FL340"],[70,51,"FL360"],[50,31,"FL380"],[30,0,"FL400"]],E:[[100,71,"FL330"],[70,51,"FL350"],[50,31,"FL370"],[30,0,"FL390"]]},
    tod:[{a:0,b:34,f:"2",n:"85–88%",vr:132,va:137},{a:35,b:54,f:"2",n:"86–89%",vr:140,va:145},{a:55,b:72,f:"2",n:"87–90%",vr:148,va:153},{a:73,b:100,f:"2",n:"89–92%",vr:155,va:160}],
    lnd:[{a:0,b:34,f:"Full",vp:137,vl:132},{a:35,b:54,f:"Full",vp:145,vl:140},{a:55,b:72,f:"Full",vp:153,vl:148},{a:73,b:100,f:"Full",vp:160,vl:155}],
    fr:[{s:186,f:"F"},{s:196,f:"3"},{s:212,f:"2"},{s:220,f:"1+F"},{s:255,f:"1"}] },
  A333: { n:"Airbus A330-300", cruise:"M0.82", mid:"300 KTS", trim:"+2", eng:2,
    climb:[{s:"0→5,000ft",v:"2,000"},{s:"5,000ft→FL150",v:"2,000"},{s:"FL150→FL240",v:"1,300"},{s:"FL240→Cruise",v:"1,000"}],
    sc:{W:[[100,81,"FL300"],[80,61,"FL320"],[60,41,"FL360"],[40,0,"FL380"]],E:[[100,81,"FL310"],[80,61,"FL330"],[60,41,"FL350"],[40,0,"FL370"]]},
    tod:[{a:0,b:34,f:"1+F",n:"85–89%",vr:131,va:136},{a:35,b:54,f:"2",n:"88–91%",vr:145,va:150},{a:55,b:100,f:"2",n:"92–97%",vr:151,va:156}],
    lnd:[{a:0,b:34,f:"Full",vp:142,vl:137},{a:35,b:100,f:"Full",vp:147,vl:142}],
    fr:[{s:180,f:"F"},{s:186,f:"3"},{s:196,f:"2"},{s:215,f:"1+F"},{s:240,f:"1"}] },
  B789: { n:"Boeing 787-9", cruise:"M0.85", mid:"310 KTS", trim:"+3", eng:2,
    climb:[{s:"0→5,000ft",v:"2,700"},{s:"5,000ft→FL150",v:"2,000"},{s:"FL150→FL280",v:"1,500"},{s:"FL280→Cruise",v:"1,000"}],
    sc:{W:[[100,61,"FL320"],[60,31,"FL340"],[30,11,"FL360"],[10,0,"FL380"]],E:[[100,71,"FL310"],[70,51,"FL330"],[50,11,"FL350"],[10,0,"FL370"]]},
    tod:[{a:0,b:34,f:"5",n:"75–94%",vr:142,va:147},{a:35,b:54,f:"5",n:"75–94%",vr:150,va:155},{a:55,b:72,f:"5",n:"76–94%",vr:158,va:163},{a:73,b:100,f:"5",n:"80–98%",vr:165,va:170}],
    lnd:[{a:0,b:34,f:"F",vp:132,vl:127},{a:35,b:54,f:"F",vp:140,vl:135},{a:55,b:72,f:"F",vp:148,vl:143},{a:73,b:100,f:"F",vp:155,vl:150}],
    fr:[{s:170,f:"30"},{s:180,f:"25"},{s:210,f:"20"},{s:215,f:"15"},{s:230,f:"5"},{s:250,f:"1"}] },
};

/* ── helpers ── */
export const rand  = <T,>(a:T[]) => a[Math.floor(Math.random()*a.length)];
export const rGate = () => `${rand(["A","B","C","D","E"])}${Math.floor(Math.random()*30+1)}`;
export const rGrp  = () => rand(["1","2","3","4"]);
export const rTime = () => { const h=Math.floor(Math.random()*24),m=[0,5,10,15,20,25,30,35,40,45,50,55][~~(Math.random()*12)]; return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`; };
export const getP  = (d:any[],l:number) => d.find((r:any)=>l>=r.a&&l<=r.b)||d[d.length-1];
export const getCA = (ac:any,l:number,dir:"W"|"E") => { const t=ac.sc?.[dir]||ac.sc?.W; if(!t)return"FL350"; for(const[hi,lo,fl]of t)if(l>=lo&&l<=hi)return fl; return t[t.length-1][2]; };

/* ══════════════════════════════════════
   ICAO AUTOCOMPLETE INPUT
══════════════════════════════════════ */
export function ICAOInput({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}) {
  const [text,setText] = useState(value);
  const [open,setOpen] = useState(false);

  const q   = text.trim();
  const qUp = q.toUpperCase();
  const qLo = q.toLowerCase();
  const isCode = /^[A-Z]{1,4}$/.test(qUp);

  const matches = q.length >= 2
    ? Object.entries(AP).filter(([code,[name,city]]) =>
        (isCode && code.startsWith(qUp)) ||
        city.toLowerCase().startsWith(qLo) ||
        name.toLowerCase().startsWith(qLo) ||
        city.toLowerCase().includes(" "+qLo) ||
        name.toLowerCase().includes(" "+qLo)
      ).slice(0,9)
    : [];

  const commit = (code:string) => { onChange(code); setText(code); setOpen(false); };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.toUpperCase();
    setText(v);
    setOpen(true);
    if (/^[A-Z]{4}$/.test(v)) onChange(v);
    else onChange("");
  };

  const confirmed = value.length===4 ? AP[value] : null;

  return (
    <div style={{position:"relative"}}>
      <label className="lbl">{label}</label>
      <input className="if" value={text} onChange={handleChange}
        onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),150)}
        placeholder="ICAO or city name"
        style={{fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"}}/>
      {value.length===4&&(
        <div style={{fontSize:11,marginTop:3,fontWeight:500,color:confirmed?"#0f9d58":"#e53e3e"}}>
          {confirmed?`✓ ${confirmed[0]}, ${confirmed[1]}`:"✗ Unknown ICAO"}
        </div>
      )}
      {open&&matches.length>0&&(
        <div className="drop">
          {matches.map(([code,[name,city]])=>(
            <div key={code} className="dr" onMouseDown={()=>commit(code)}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:13}}>{code}</span>
              <span style={{fontSize:12,color:"#6b7a99"}}>{name}, {city}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   QR CODE + BARCODE
══════════════════════════════════════ */
export function QR({url,size=78}:{url:string;size?:number}) {
  const seed = url.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  const N=21,cell=size/N;
  const m=Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=>{
    const tl=r<7&&c<7,tr=r<7&&c>N-8,bl=r>N-8&&c<7;
    if(tl)return!((r===1||r===5)&&c>0&&c<6)&&!((c===1||c===5)&&r>0&&r<6);
    if(tr)return!((r===1||r===5)&&c>N-7&&c<N-1)&&!((c===N-6||c===N-2)&&r>0&&r<6);
    if(bl)return!((r===N-6||r===N-2)&&c>0&&c<6)&&!((c===1||c===5)&&r>N-7&&r<N-1);
    return((seed*(r*N+c)*2654435761)>>>0)%3!==0;
  }));
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none"}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block",borderRadius:6,border:"1px solid #e4e7ec"}}>
        <rect width={size} height={size} fill="#fff"/>
        {m.map((row,r)=>row.map((on,c)=>on?<rect key={`${r}-${c}`} x={c*cell} y={r*cell} width={cell} height={cell} fill="#1a1f2e"/>:null))}
      </svg>
      <div style={{fontSize:9,color:"#9aa3b2",textAlign:"center",marginTop:3,fontWeight:500}}>Scan → FR24</div>
    </a>
  );
}

export function Barcode({val}:{val:string}) {
  const bars=val.split("").flatMap(c=>{const n=c.charCodeAt(0);return[1+(n%3),(n%2)?1:2,1+(n%2),(n%5)?1:2];}).slice(0,68);
  return <div style={{display:"flex",alignItems:"flex-end",gap:1.5,height:44}}>{bars.map((h,i)=><div key={i} style={{width:2,height:h*10+6,background:"#1a1f2e",borderRadius:1,flexShrink:0}}/>)}</div>;
}

/* ══════════════════════════════════════
   CHECKLIST BUILDER
══════════════════════════════════════ */
type CI = {id:string;lbl:string;val:string;hi?:boolean};

export function buildCL(ac:any,load:number,dir:"W"|"E") {
  const td=getP(ac.tod,load), ld=getP(ac.lnd,load), ca=getCA(ac,load,dir);
  const it=(id:string,lbl:string,val:string,hi=false):CI=>({id,lbl,val,hi});
  const frAsc = [...ac.fr].sort((a:any,b:any)=>a.s-b.s);
  const frDesc = [...ac.fr].sort((a:any,b:any)=>b.s-a.s);

  return [
    {title:"Spawn In",items:[
      it("s1","Ground Services","CONNECTED"),
      it("s2","Master Switch","ON"),
      it("s3","APU","START (ON)"),
      it("s4","Nav Lights","ON"),
      it("s5","No Smoking Signs","ON"),
    ]},
    {title:"Flight Briefing",items:[
      it("fb1","Departure Info (METAR/ATIS)","CHECKED"),
      it("fb2","Airplane Load",`${load}% SET`,true),
      it("fb3","Flight Plan","ENTERED"),
      it("fb4","Recommended Cruise Alt",ca,true),
      it("fb5","Departure Runway / SID","CHECKED"),
      it("fb6","Taxi Routing","CONFIRMED"),
    ]},
    {title:"Before Pushback",items:[
      it("bp1","Takeoff Runway","VERIFIED"),
      it("bp2","Spoilers","ARMED"),
      it("bp3","Fuel Quantity","CHECKED"),
      it("bp4","Ground Services","DISCONNECTED"),
      it("bp5","Pushback Tug","ON"),
      it("bp6","Beacon Light","ON"),
      it("bp7","Seatbelt Signs","ON"),
      it("bp8","Pushback","COMPLETED"),
    ]},
    {title:"Engine Startup",items:[
      ...(ac.eng===4?[
        it("e0a","Engine 4","START"),it("e0b","Engine 4","STABLE (20%)"),
        it("e0c","Engine 3","START"),it("e0d","Engine 3","STABLE (20%)"),
      ]:[]),
      it("e1","Engine 2","START"),
      it("e2","Engine 2","STABLE (20%)"),
      it("e3","Engine 1","START"),
      it("e4","Engine 1","STABLE (20%)"),
      it("e5","APU","OFF"),
    ]},
    {title:"Taxi Out",items:[
      it("t1","Taxi Lights","ON"),
      it("t2","Flaps",`FLAPS ${td.f}`,true),
      it("t3","Trim",`${ac.trim}°`,true),
      it("t4","Parking Brake","RELEASED"),
      it("t5","Taxi Speed","MAX 20-35 KTS"),
    ]},
    {title:"Takeoff & Climb",items:[
      it("to1","Strobe Lights","ON"),
      it("to2","Landing Lights","ON"),
      it("to3","Thrust (N1)",td.n,true),
      it("to4","Rotate Speed (Vr)",`${td.vr} KTS`,true),
      it("to5","Positive Rate","GEAR UP"),
      ...climbSpeeds(ac.climb, it),
      ...flapRetractions(frAsc, it)
    ]},
    {title:"Cruise",items:[
      it("cr1","Cruise Altitude",ca,true),
      it("cr2","Cruise Speed",ac.cruise,true),
      it("cr3","Seatbelt Signs","AS REQUIRED"),
    ]},
    {title:"Descent & Approach",items:[
      it("da1","Descent Checklist","COMPLETED"),
      ...flapExtensions(frDesc, it),
      it("da2","Approach Speed (Vapp)",`${ld.vp} KTS`,true),
      it("da3","Landing Gear","DOWN"),
      it("da4","Flaps",`FLAPS ${ld.f}`,true),
    ]},
    {title:"Landing & Rollout",items:[
      it("l1","Landing Speed (Vlnd)",`${ld.vl} KTS`,true),
      it("l2","Spoilers","DEPLOYED"),
      it("l3","Reversers","ENGAGED"),
      it("l4","Brakes","AS REQUIRED"),
    ]}
  ];
}

/* ── Checklist Formatting Iterators ── */
function climbSpeeds(climbData: any[], it: any) {
  return climbData.map((step: any, idx: number) => 
    it(`climb-${idx}`, `Climb Rate (${step.s})`, `${step.v} FPM`)
  );
}

function flapRetractions(frData: any[], it: any) {
  return frData.map((step: any, idx: number) => 
    it(`fr-ret-${idx}`, `Retract to Flaps ${step.f}`, `${step.s} KTS`)
  );
}

function flapExtensions(frData: any[], it: any) {
  return frData.map((step: any, idx: number) => 
    it(`fr-ext-${idx}`, `Extend to Flaps ${step.f}`, `${step.s} KTS`)
  );
}

/* Default empty React entry layout shell to complete file structure safely */
export default function App() {
  return (
    <div style={{padding: 24, maxWidth: 600, margin: "0 auto"}} className="fade-up">
      <h1 style={{fontSize: 20, marginBottom: 16, color: "#1a3a6b"}}>Infinite Flight Deck Briefing</h1>
      <ICAOInput label="Departure Airport" value="EGLL" onChange={() => {}} />
      <div style={{marginTop: 20}}>
        <Barcode val="IF-FLIGHT-BRIEF-2026" />
      </div>
    </div>
  );
}