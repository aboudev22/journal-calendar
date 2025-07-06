import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const MONTH_NAMES = [
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

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getCurrentDate() {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };
}

export default function JournalCalendar() {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [daysInMonth, setDaysInMonth] = useState(
    getDaysInMonth(currentDate.month, currentDate.year)
  );

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(currentDate.month, currentDate.year));
  }, [currentDate.month, currentDate.year]);

  const navigateDay = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      let newDay = prev.day;
      let newMonth = prev.month;
      let newYear = prev.year;

      if (direction === "next") {
        if (newDay < getDaysInMonth(newMonth, newYear)) {
          newDay++;
        } else {
          newDay = 1;
          if (newMonth === 11) {
            newMonth = 0;
            newYear++;
          } else {
            newMonth++;
          }
        }
      } else {
        if (newDay > 1) {
          newDay--;
        } else {
          if (newMonth === 0) {
            newMonth = 11;
            newYear--;
          } else {
            newMonth--;
          }
          newDay = getDaysInMonth(newMonth, newYear);
        }
      }

      return { day: newDay, month: newMonth, year: newYear };
    });
  };

  const selectDay = (day: number) => {
    setCurrentDate((prev) => ({ ...prev, day }));
  };

  const scrollPosition = 2.2 - currentDate.day * 1.5;

  return (
    <div className="w-80 h-64 bg-slate-200 rounded-2xl p-2 flex">
      <section className="relative w-8 h-full px-1 bg-slate-100 overflow-y-hidden rounded-full flex flex-col items-center">
        <motion.div
          className="absolute flex flex-col"
          animate={{ y: `${scrollPosition}rem` }}
          initial={false}
          transition={{ ease: "linear" }}
        >
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNumber = i + 1;
            return (
              <motion.p
                key={dayNumber}
                onClick={() => selectDay(dayNumber)}
                className={clsx(
                  "text-xl h-6 px-[2px] flex items-center justify-center font-bold cursor-pointer rounded-full",
                  currentDate.day === dayNumber
                    ? "text-neutral-800 bg-slate-200"
                    : "text-neutral-500"
                )}
              >
                {dayNumber}
              </motion.p>
            );
          })}
        </motion.div>
      </section>

      <section className="flex flex-col flex-1 p-2">
        <header className="flex justify-between items-center">
          <div className="flex gap-2">
            <p className="text-xl font-bold text-neutral-500">
              {MONTH_NAMES[currentDate.month]}
            </p>
            <p className="text-xl font-bold text-neutral-500">
              {currentDate.day}
            </p>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => navigateDay("prev")}
              className="p-[2px] cursor-pointer bg-slate-100 rounded-lg hover:bg-slate-300 transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft size={25} color="#737373" />
            </button>
            <button
              onClick={() => navigateDay("next")}
              className="p-[2px] cursor-pointer bg-slate-100 rounded-lg hover:bg-slate-300 transition-colors"
              aria-label="Next day"
            >
              <ChevronRight size={25} color="#737373" />
            </button>
          </div>
        </header>
      </section>
    </div>
  );
}