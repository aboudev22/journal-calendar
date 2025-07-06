import React, { useState } from "react";

// Fonction utilitaire pour connaître le nombre de jours dans un mois
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Noms des mois (pour affichage)
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarStepper: React.FC = () => {
  const today = new Date();

  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(today.getMonth()); // 0-11
  const [year, setYear] = useState<number>(today.getFullYear());

  const handleNextDay = () => {
    const daysInMonth = getDaysInMonth(month, year);

    if (day < daysInMonth) {
      setDay((prev) => prev + 1);
    } else {
      // Passe au mois suivant
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
      setDay(1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">
        {day} {monthNames[month]} {year}
      </h2>

      <button
        onClick={handleNextDay}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
      >
        Next Day
      </button>
    </div>
  );
};

export default CalendarStepper;
