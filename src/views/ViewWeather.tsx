import { Col, Row } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { KitSelect } from "../components/KitSelect/KitSelect";
import { KitTiles } from "../components/KitTiles/KitTiles";
import { tCommon, tCountry, tWeather } from "./types";
import "./ViewWeather.style.scss";

export const ViewWeather = () => {
  //Api Key
  const apikey = process.env.REACT_APP_API_KEY;

  //Local states
  const [weatherData, setWeatherData] = useState<tWeather>();
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("England");
  const [countriesNameData, setCountriesNameData] = useState<tCountry[]>([]);

  // Constant variables
  const Title = "Weather App";
  const weatherIcon = weatherData?.weather[0].icon;

  //Get today date
  const current = new Date();

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  //Get weather api data with axios
  const getWeatherData = useCallback(() => {
    const options = {
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apikey}`,
    };

    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [apikey, country]);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  //Get countries api data with axios
  const getCountries = useCallback(() => {
    const options = {
      method: "GET",
      url: `https://restcountries.com/v3.1/all`,
    };

    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setCountriesNameData(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const onChange = (value: string) => {
    setCountry(value);
  };

  //Convert Kalvin to celcius
  const KalvinToCelcius = (K?: number) => {
    if (K) {
      return Math.floor(K - 273.15);
    }
    return 0;
  };

  //Get cardinal and ordinal directions from angle degree
  const getDirection = (angle?: number): string => {
    var directions = [
      "North",
      "North-East",
      "East",
      "South-East",
      "South",
      "South-West",
      "West",
      "North-West",
    ];

    if (angle) {
      var index =
        Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
      return directions[index];
    }

    return "No Data";
  };

  //Sort countries in alphabetical order
  const sortedCountries = countriesNameData?.sort(
    (a: { name: tCommon }, b: { name: tCommon }) =>
      a.name.common > b.name.common ? 1 : -1
  );

  return (
    <div className="view-weather">
      <h1>{Title}</h1>
      <Row gutter={16}>
        <Col span={12}>
          <div className="view-weather__main">
            <KitSelect
              defaultValue="Select Country"
              onChange={onChange}
              arr={sortedCountries}
            />

            <h1>{country}</h1>
            <h3>{date}</h3>
            <img
              id="wicon"
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="Weather icon"
            />
            <h2>
              {weatherData?.weather[0].main} (
              {weatherData?.weather[0].description})
            </h2>
          </div>
        </Col>
        <Col span={6}>
          <KitTiles
            title={"Temperature"}
            bordered={true}
            loading={loading}
            children={<div>{KalvinToCelcius(weatherData?.main.temp)}°C</div>}
          />
          <KitTiles
            title={"Wind"}
            bordered={true}
            loading={loading}
            children={
              <div className="kit-tile__wind">
                <p>
                  Speed: <span>{weatherData?.wind.speed}km/h</span>
                </p>
                <p>
                  Direction: <span>{getDirection(weatherData?.wind.deg)}</span>
                </p>
              </div>
            }
          />
        </Col>
        <Col span={6}>
          <KitTiles
            title={"Humidity"}
            loading={loading}
            bordered={true}
            children={<div> {weatherData?.main.humidity}%</div>}
          />
          <KitTiles
            title={"Pressure"}
            loading={loading}
            bordered={true}
            children={<div> {weatherData?.main.pressure}hPa</div>}
          />
        </Col>
      </Row>
    </div>
  );
};
