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

async function addToCalendar() {
  const file = new File(
    [ICS_CONTENT],
    "Musikfest-TMK-Tarsdorf-2028.ics",
    { type: "text/calendar;charset=utf-8" }
  );

  try {
    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      await navigator.share({
        title: "Musikfest TMK Tarsdorf",
        text: "09.–11. Juni 2028 · 5121 Tarsdorf",
        files: [file]
      });
      return;
    }
  } catch (e) {
    if (e && e.name === "AbortError") return;
  }

  const blob = new Blob([ICS_CONTENT], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Musikfest-TMK-Tarsdorf-2028.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);

  showHint("Kalenderdatei wurde erstellt");
}
