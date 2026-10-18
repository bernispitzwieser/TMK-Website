const EVENT_EMAIL = "info@tmk-tarsdorf.at";

const ICS_CONTENT = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TMK Tarsdorf//Musikfest 2028//DE
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:musikfest-2028@tmk-tarsdorf.at
DTSTAMP:20260901T123800Z
DTSTART;VALUE=DATE:20280609
DTEND;VALUE=DATE:20280612
SUMMARY:Musikfest TMK Tarsdorf
LOCATION:5121 Tarsdorf
END:VEVENT
END:VCALENDAR`;

function showHint(text) {
  let el = document.querySelector(".hint");
  if (!el) {
    el = document.createElement("div");
    el.className = "hint";
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(window.__hintTimer);
  window.__hintTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EVENT_EMAIL);
    showHint("E-Mail-Adresse kopiert");
  } catch (e) {
    showHint(EVENT_EMAIL);
  }
}

async function openMail() {
  await copyEmail();
  window.location.href = "mailto:" + EVENT_EMAIL;
}

function addToCalendar() {
  // iPhone/iPad/Mac: originale ICS-Datei zum Import in Apple Kalender.
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua) ||
    (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  const isMac = /Macintosh|Mac OS X/i.test(ua);

  if (isIOS || isMac) {
    const icsUrl = new URL("Musikfest-TMK-Tarsdorf-2028.ics", document.baseURI);
    window.location.assign(icsUrl.href);
    return;
  }

  // Android und andere Geraete: direkt zum ausgefuellten Google-Kalender-Termin.
  // Fuer ganztagige Termine ist das Enddatum exklusiv (12. Juni).
  const googleUrl = new URL("https://calendar.google.com/calendar/render");
  googleUrl.searchParams.set("action", "TEMPLATE");
  googleUrl.searchParams.set("text", "Musikfest - 120 Jahre TMK Tarsdorf");
  googleUrl.searchParams.set("dates", "20280609/20280612");
  googleUrl.searchParams.set("details",
    "09.-11. Juni 2028 | 120 Jahre TMK Tarsdorf. " +
    "Weitere Informationen auf https://tmk-tarsdorf.at");
  googleUrl.searchParams.set("location", "5121 Tarsdorf, Österreich");

  window.location.assign(googleUrl.href);
}
