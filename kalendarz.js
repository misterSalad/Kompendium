const monthNames = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

let currentMonth = 0;
const currentYear = 2025;

const monthAndYear = document.getElementById("monthAndYear");
const calendar = document.getElementById("calendar");
const tooltip = document.getElementById("tooltip");

document.getElementById("prevMonth").addEventListener("click", () => {
  if (currentMonth > 0) {
    currentMonth--;
    showCalendar(currentMonth, currentYear);
  }
});

document.getElementById("nextMonth").addEventListener("click", () => {
  if (currentMonth < 11) {
    currentMonth++;
    showCalendar(currentMonth, currentYear);
  }
});

const holidays = {
  "0-0": { name: "Noc Stworzenia", deity: "Swaróg", id: "noc-stworzenia" },
  "0-5": { name: "Koniec Szczodrych Godów", deity: "—", id: "koniec-szczodrych-godow" },
  "1-2": { name: "Tydzień Velesa", deity: "Veles", id: "tydzien-velesa" },
  "1-3": { name: "Tydzień Velesa", deity: "Veles", id: "tydzien-velesa" },
  "1-4": { name: "Tydzień Velesa", deity: "Veles", id: "tydzien-velesa" },
  "1-5": { name: "Tydzień Velesa", deity: "Veles", id: "tydzien-velesa" },
  "1-6": { name: "Tydzień Velesa", deity: "Veles", id: "tydzien-velesa" },
  "1-7": { name: "Tydzień Velesa", deity: "Veles", id: "tydzien-velesa" },
  "1-8": { name: "Tydzień Velesa", deity: "Veles", id: "tydzien-velesa" },
  "2-19": { name: "Jare Gody", deity: "Jaruna", id: "jare-gody" },
  "3-26": { name: "Noc Nyji", deity: "Nyja & Krodo", id: "noc-nyji" },
  "4-1": { name: "Dziady Wiosenne", deity: "Żywa", id: "dziady-wiosenne" },
  "4-14": { name: "Stado", deity: "Perun & Zorza", id: "stado" },
  "4-23": { name: "Święto Rodziny", deity: "Dadźbóg, Chors, Jutrzenka", id: "swieto-rodziny" },
  "5-20": { name: "Noc Kupały", deity: "Dadźbóg & Chors", id: "noc-kupaly" },
  "6-17": { name: "Święto Bogów", deity: "Wszyscy bogowie", id: "swieto-bogow" },
  "7-15": { name: "Dzień Chleba i Wina", deity: "Jaruna", id: "dzien-chleba" },
  "8-21": { name: "Dzień Plonów", deity: "Jaruna", id: "dzien-plonow" },
  "9-30": { name: "Dziady Jesienne", deity: "Veles", id: "dziady-jesienne" },
  "10-23": { name: "Katarzynki", deity: "Rod", id: "andrzejki-katarzynki" },
  "10-28": { name: "Andrzejki", deity: "Rod", id: "andrzejki-katarzynki" },
  "11-20": { name: "Szczodre Gody", deity: "Swaróg & Veles", id: "szczodre-gody" }
};

function showCalendar(month, year) {
  calendar.innerHTML = "";
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthAndYear.textContent = `${monthNames[month]} - 31 rok 6 ery`;

  const start = (firstDay + 6) % 7;

  for (let i = 0; i < start; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("empty");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("day");
    const key = `${month}-${day - 1}`;
    if (holidays[key]) {
      const holiday = holidays[key];
      cell.classList.add("holiday");
      cell.setAttribute("data-name", holiday.name);
      cell.setAttribute("data-deity", holiday.deity);
      cell.setAttribute("data-id", holiday.id);

      // Klik przenosi do święta
      cell.addEventListener("click", () => {
        window.location.href = `swieta.html#${holiday.id}`;
      });
    }
    cell.textContent = day;

    cell.addEventListener("mousemove", (e) => {
      if (cell.classList.contains("holiday")) {
        tooltip.innerHTML = `<strong>${cell.getAttribute("data-name")}</strong><br><em>${cell.getAttribute("data-deity")}</em>`;
        tooltip.style.display = "block";
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.left = `${e.pageX + 10}px`;
      }
    });

    cell.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    calendar.appendChild(cell);
  }
}

showCalendar(currentMonth, currentYear);
