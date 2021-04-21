import React, {useState, useEffect} from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map'
import './App.css';

function App() {

  // State - is how to write a variable in react
  // Initializing the variable to empty array
  const [countries, setCountries] = useState([]);

  // Track what we have selected
  // To map to the dropdown go to the dropdown
  // add it and add the country variable to the value={country}
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  

  // https://disease.sh/v3/covid-19/countries
  // useEffect (() => {}) runs a piece of code on any given condition
  
  // USE EFFECT - If we call a variable [countries] at the end it will
  // once when the component loads and then everytime 
  // the countries variable changees
  
  useEffect(() => {
    // the code in here will only run once when the
    // component loads and not again after.

    // async -> send a request, wait for it, do something with it
    const getCountriesData = async () =>  {

      // fetch and await the data
      await fetch("https://disease.sh/v3/covid-19/countries")
      // set the response of the data to json
      .then((response) => response.json())
      // response into a data variable
      .then((data) => {

        // map out each country 
        // assign it to a countries variable

        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));

        // set the countries to countries
        setCountries(countries);
      });

    }
    

    //  call the data
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
      <h1>Covid tracker</h1>
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
       <InfoBox title='Covid cases' cases={123} total={2000}>

      </InfoBox>
      <InfoBox title='Recovered' cases={456} total={4000}>

      </InfoBox>
      <InfoBox title='Deaths' cases={789} total={5000}>

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
       <h3>Worldwide New Cases</h3>
      </CardContent>

    </Card>
</div>
    // +++++++++++++++ FINISHED @ 2.08 hrs/min ++++++++++++++++++++++ //
  );
}

export default App;
