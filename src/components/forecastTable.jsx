import React from "react";
import TableRow from "./tableRow";

const ForecastTable = ({ list }) => {
    console.log(list);
    let headings = ["Date", "Min Temp", "Max Temp", "Avg Clouds", "Weather Des"];
    let body = [];
  
    if (list && list.data && list.data.length > 0) {
      for (let i = 0; i < list.data.length; i++) {
        body.push([
          list.data[i]["valid_date"],
          list.data[i]["min_temp"],
          list.data[i]["max_temp"],
          list.data[i]["clouds_mid"],
          [list.data[i].weather.description],
        ]);
      }
      console.log(body);
    }

    return (
      <div className="forecast-cont">
        <h2>7-day Weather Forecast</h2>
        <div className="scrollable-container">
          <table>
            <thead>
              <tr>
                {headings.map((head, headID) => (
                  <th key={headID}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((rowContent, rowID) => (
                <TableRow key={rowID} rowContent={rowContent} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default ForecastTable;