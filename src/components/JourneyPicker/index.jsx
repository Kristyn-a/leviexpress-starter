import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({ cities }) => {
  console.log(cities);
  return cities.map((city) => (
    <option key={city.code} value={city.code}>
      {city.name}
    </option>
  ));
};

const DatesOptions = ({ dates }) => {
  console.log('Data: ');
  console.log(dates);
  return dates.map((date) => (
    <option key={date.dateBasic} value={date.dateCs}>
      {date.dateBasic}
    </option>
  ));
};

// <>
//   <option value="mesto01">Město 01</option>
//   <option value="mesto02">Město 02</option>
//   <option value="mesto03">Město 03</option>
//   <option value="mesto04">Město 04</option>
//   <option value="mesto05">Město 05</option>
// </>

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      const resp2 = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const data2 = await resp2.json();
      setDates(data2.results);
    };
    fetchDates();

    const fetchCities = async () => {
      const resp = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await resp.json();
      setCities(data.results);
    };
    fetchCities();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Cesta z města: ${fromCity} do města: ${toCity} v čase ${date}`,
    );
    console.log(fromCity);
    console.log(toCity);
    console.log(date);
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(event) => {
                setFromCity(event.target.value);
              }}
            >
              {' '}
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(event) => {
                setToCity(event.target.value);
              }}
            >
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            >
              <option value="">Vyberte</option>
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button onClick={handleSubmit} className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
