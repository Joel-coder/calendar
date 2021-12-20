import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";

export default function Calendar() {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);
  const [style, setStyle] = useState("");
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");

  useEffect(() => {
    const temp = [];
    const day = startDay.clone().subtract(1, "day");
    while (day.isBefore(endDay, "day")) {
      temp.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
    setCalendar(temp);
  }, [value]);

  const isSelected = (day, value) => {
    return value.isSame(day, "day");
  };

  const beforetoday = (day) => {
    return day.isBefore(new Date(), "day");
  };

  const isToday = (day) => {
    return day.isSame(new Date(), "day");
  };

  const dayStyle = (day, value) => {
    if (isSelected(day, value)) {
      return "selected";
    }
    if (isToday(day)) {
      return "today";
    }
  };

  const currentMonthName = () => {
    return value.format("MMMM");
  };

  const currentYear = () => {
    return value.format("YYYY");
  };

  const prevMonth = () => {
    return value.clone().subtract(1, "month");
  };
  const nextMonth = () => {
    return value.clone().add(1, "month");
  };

  return (
    <div>
      <div
        onClick={() => {
          setValue(prevMonth());
        }}
      >
        {String.fromCharCode(171)}
      </div>
      <div>
        {currentMonthName()}
        {currentYear()}
      </div>
      <div
        onClick={() => {
          setValue(nextMonth());
        }}
      >
        {String.fromCharCode(187)}
      </div>
      <div>
        {["s", "m", "t", "w", "t", "f", "s"].map((d) => (
          <div className="week">{d}</div>
        ))}
      </div>
      <div className="calendar">
        {calendar.map((week) => (
          <div>
            {week.map((day) => (
              <div
                className="day"
                onClick={() => {
                  setValue(day);
                  console.log(day);
                }}
              >
                <div className={dayStyle(day, value)}>{day.format("D")}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
