// Calculates the last Tuesday of a given month and year.
// Formula explanation:
// 1. Get the last day of the month.
// 2. Determine its day of the week (0=Sun, 1=Mon, ..., 6=Sat).
// 3. Calculate how many days to subtract to reach the last Tuesday.
function getLastTuesdayofMonth(year, month) {
  const lastDay = new Date(year, month + 1, 0);
  const dow = lastDay.getDay(); // Day of week: 0 (Sun) to 6 (Sat).

  // If last day is Wed(3), Thu(4), Fri(5), Sat(6), Sun(0), Mon(1):
  // The distance to Tuesday is dow - 2 (if dow>=2) otherwise dow + 5.
  const offset = (dow + 5) % 7; // number of days to go back to Tuesday
  lastDay.setDate(lastDay.getDate() - offset);
  return lastDay;
}

// Helper function to pad months/days to two digits.
function pad(n) {
  return n.toString().padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); // 0-indexed: Jan=0, Feb=1, ..., Dec=11

  let meetingDate = getLastTuesdayofMonth(year, month);
  meetingDate.setHours(14, 30, 0, 0); // Set fixed time to 14:30:00.000

  const meetingEnd = new Date(meetingDate);
  meetingEnd.setHours(15, 0, 0, 0); // Meeting ends at 15:00
  // If the meeting has already ended (after 15:00), move to next month
  if (now > meetingEnd) {
    month += 1;
    if (month > 11) {
      // If December, roll over to January next year.
      month = 0;
      year += 1;
    }
    meetingDate = getLastTuesdayofMonth(year, month);
    meetingDate.setHours(14, 30, 0, 0); // Set fixed time to 14:30:00.000
    console.debug(meetingDate);
  }
  // Construct ISO 8601 string with timezone offset +01:00.
  // Explicitly assembled to gurantee the correct time + timezone literal.
  const isoDate = `${meetingDate.getFullYear()}-${pad(
    meetingDate.getMonth() + 1
  )}-${pad(meetingDate.getDate())}T14:30:00+01:00`;

  // Homepage infobox.
  document
    .querySelectorAll('time[data-next-community-meeting="full"]')
    .forEach((element) => {
      element.setAttribute("datetime", isoDate);
      element.textContent = meetingDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
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
        dow.textContent = meetingDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
      if (day)
        day.textContent = meetingDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      if (time) time.textContent = "14:30";
    });
});
