

import React, {useState, useEffect} from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map'
import './App.css';
import Table from './Table';
import {sortData} from './utils';
import Linegraph from './Linegraph';


function App() {


  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }, []);
  // https://disease.sh/v3/covid-19/countries
  // useEffect (() => {}) runs a piece of code on any given condition
  
  // USE EFFECT - If we call a variable [countries] at the end it will
  // once when the component loads and then everytime 
  // the countries variable changees
  
  useEffect(() => {
    const getCountriesData = async () =>  {

     
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });

    }
    getCountriesData();
  }, []);

  // This will be called everytime the country changes.
 const onCountryChange = async (event) => {
   const countryCode = event.target.value;
   

   const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/countries/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

   await fetch(url)
   .then((response) => response.json())
   .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
   });
}

console.log(countryInfo);

  return (
    <div className="app">
      <div className='app__left'>
        {/* Header */}
    <div className='app__header'>
      {/* Title */}
      <h1>Observing Covid Statistics</h1>
      {/* Dropdown */}
      <FormControl className='app__dropdown'>
        <Select variant="outlined" onChange={onCountryChange} value={country}>

          {/* Loop through all the countries and show them as a list of options 
          <MenuItem value="worldwide">Worldwide</MenuItem> */}
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}

         
        </Select>
      </FormControl>
    </div>
    <div className='app__stats'>
       <InfoBox title='Covid cases' cases={countryInfo.todayCases} total={countryInfo.cases}>

      </InfoBox>
      <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered}>

      </InfoBox>
      <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths}>

      </InfoBox>
    </div>
      {/* Map */}
      <Map /> 
    </div>
    <Card className='app__right'>
      {/* Table */}
      {/* Graph */}
      <CardContent>
       <h3>Live Cases By Country</h3> 
       <Table countries={tableData}/>
       <h3>Worldwide New Cases</h3>
       <Linegraph />
      </CardContent>

    </Card>
</div>
    // +++++++++++++++ FINISHED @ 2.08 hrs/min ++++++++++++++++++++++ //
  );
}

export default App;
