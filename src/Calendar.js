import logo from "./logo.svg";
import moment from "moment";
import "./App.css";

export default function App() {
  const value = moment();
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  return <div>{endDay.format("MM/DD")}</div>;
}
