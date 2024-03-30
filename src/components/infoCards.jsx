import React from "react";

const InfoCards = ({ cityName, timeZone, temp, weatherDes, clouds }) => {
  return (
    <div className="cardlist-cont">
      <ul className="d-flex">
        <li className="card">
          <h4>{cityName}</h4>
          <p>{timeZone}</p>
        </li>
        <li className="card">
          <h4>{temp}</h4>
          <p>
            Celsius <i class="fa-solid fa-temperature-low"></i>
          </p>
        </li>
        <li className="card">
          <h4>{weatherDes}</h4>
          <p>Weather description</p>
        </li>
        <li className="card">
          <h4>{clouds} %</h4>
          <p>Cloud coverage</p>
        </li>
      </ul>
    </div>
  );
};

export default InfoCards;