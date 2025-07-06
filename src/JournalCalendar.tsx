import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Fonction pour recuperer le nombre de jour d'un mois
function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export default function JournalCalendar() {
  const today = new Date();
  const [daysInMonth, setDaysInMonth] = useState<number>(
    getDaysInMonth(today.getMonth(), today.getFullYear())
  );
  const [selected, setSelected] = useState<number>(today.getDate());

  return (
    <div className="w-80 h-64 bg-slate-200 rounded-2xl p-2 flex">
      <section className="relative w-8 h-full px-1 bg-slate-100 overflow-y-hidden rounded-full flex flex-col items-center">
        <motion.div
          className="absolute flex flex-col"
          animate={{ y: `${2.2 - selected * 1.5}rem` }}
          initial={false}
          transition={{ ease: "linear" }}
        >
          {Array.from({ length: daysInMonth }).map((_, i) => (
            <motion.p
              key={i}
              onClick={() => setSelected(i + 1)}
              className={clsx(
                "text-xl h-6 px-[2px] flex items-center justify-center font-bold cursor-pointer rounded-full",
                selected === i + 1
                  ? "text-neutral-800 bg-slate-200"
                  : "text-neutral-500 "
              )}
            >
              {i + 1}
            </motion.p>
          ))}
        </motion.div>
      </section>
      <section className="flex flex-col flex-1 p-2">
        <header className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-xl font-bold text-neutral-500">
              {today.toDateString().split(" ")[1]}
            </p>
            <p className="text-xl font-bold text-neutral-500">{selected}</p>
          </div>
          <div className="flex gap-1">
            <button className="p-[2px] cursor-pointer bg-slate-100 rounded-lg">
              <ChevronLeft size={25} color="#737373" />
            </button>
            <button className="p-[2px] cursor-pointer bg-slate-100 rounded-lg">
              <ChevronRight size={25} color="#737373" />
            </button>
          </div>
        </header>
      </section>
    </div>
  );
}
