export interface tCommon {
  common: string;
}

export interface tCountry {
  name: tCommon;
  area: number;
}

export interface tMainWeather {
  humidity: number;
  pressure: number;
  temp: number;
}

export interface tWindWeather {
  speed: number;
  deg: number;
}

export interface tMainWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface tWeather {
  main: tMainWeather;
  wind: tWindWeather;
  weather: tMainWeather[];
}
