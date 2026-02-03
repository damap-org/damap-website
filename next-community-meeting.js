// Meeting configuration
const MEETING_START = { hour: 14, minute: 30 };
const MEETING_END = { hour: 15, minute: 0 };

// Locale and timezone settings
const LOCALE = "en-GB";
const TIMEZONE = "Europe/Vienna";

// ==============================
//          Date helpers
// ==============================

// Helper function to pad numbers to two digits.
const pad = (num) => String(num).padStart(2, "0");

// Get last Tuesday of a given month (month = 0-11)
function getLastTuesdayofMonth(year, month) {
  const lastDay = new Date(year, month + 1, 0); // Last day of the month
  const dow = lastDay.getDay(); // Determine day of week: 0 (Sun) to 6 (Sat).

  // If last day is Wed(3), Thu(4), Fri(5), Sat(6), Sun(0), Mon(1):
  // The distance to Tuesday is dow - 2 (if dow>=2) otherwise dow + 5.
  const offset = (dow + 5) % 7;
  lastDay.setDate(lastDay.getDate() - offset);
  return lastDay;
}

// Builds meeting date object for the last Tuesday of the specified year and month.
function buildMeetingDate(year, month) {
  const date = getLastTuesdayofMonth(year, month);
  date.setHours(MEETING_START.hour, MEETING_START.minute, 0, 0);
  return date;
}

// Get timezone info: offset (machine-readable e.g. GMT+2) and abbreviation (human-readable e.g. GMT+1/CET)
function getTimeZoneInfo(date) {
  const tzOffset = new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIMEZONE,
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName").value;

  const tzAbbr = new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIMEZONE,
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName").value;

  return { tzOffset, tzAbbr };
}

// Build ISO 8601 datetime string with offset
function toISO(date, offset) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:00${offset}`
  );
}

// ==============================
//           Main logic
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); // 0-indexed: Jan=0, Feb=1, ..., Dec=11

  // Format: YYYY-MM-DDTHH:MM:SS±HH:MM (timezone name)
  let meetingDate = buildMeetingDate(year, month);

  const meetingEnd = new Date(meetingDate);
  meetingEnd.setHours(MEETING_END.hour, MEETING_END.minute, 0, 0);

  // If the meeting has already ended, move to next month.
  if (now > meetingEnd) {
    month++;

    if (month > 11) {
      // If December, roll over to January next year.
      month = 0;
      year++;
    }
    meetingDate = buildMeetingDate(year, month);
  }

  const { tzOffset, tzAbbr } = getTimeZoneInfo(meetingDate);

  // ISO 8601 date format: YYYY-MM-DDTHH:MM:SS±HH:MM used in datetime attribute.
  const isoDate = toISO(meetingDate, tzOffset);

  // Human-readable date: Month Day
  const displayDate = meetingDate.toLocaleDateString(LOCALE, {
    month: "long",
    day: "numeric",
    timeZone: TIMEZONE,
  });

  // Human-readable meeting time: HH:MM
  const displayTime = meetingDate.toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIMEZONE,
  });

  // Construct human-readable full datetime string: Month Day, HH:MM (GMT±X)
  const fullDatetimeString = `${displayDate}, ${displayTime} (${tzAbbr})`;

  // Full datetime (homepage infobox).
  document
    .querySelectorAll('time[data-next-community-meeting="full"]')
    .forEach((element) => {
      element.setAttribute("datetime", isoDate);
      element.textContent = fullDatetimeString;
    });

  // Calendar block.
  document
    .querySelectorAll('time[data-next-community-meeting="block"]')
    .forEach((element) => {
      element.setAttribute("datetime", isoDate);

      const dow = element.querySelector(".calendar__dow");
      const day = element.querySelector(".calendar__day");
      const time = element.querySelector(".calendar__time");

      if (dow)
        dow.textContent = meetingDate.toLocaleDateString(LOCALE, {
          weekday: "short",
          timeZone: TIMEZONE,
        });

      if (day)
        day.textContent = meetingDate.toLocaleDateString(LOCALE, {
          month: "short",
          day: "numeric",
          timeZone: TIMEZONE,
        });

      if (time) time.textContent = `${displayTime} (${tzAbbr})`;
    });
});
