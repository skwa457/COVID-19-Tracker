import React, { useState, useEffect } from 'react';
import '../Values/Values.css'
import CountUp from 'react-countup';

interface IGlobalState {
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export default function Values() {
  const [summary, setSummary] = useState<IGlobalState>({  
    TotalConfirmed: 0,
    TotalDeaths: 0,
    TotalRecovered: 0,});
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(data => {
        setSummary(data.Global)
        setDate(data.Date.replace('Z', ' ').replace('T', ' '))
      })
      .catch(() => console.log("error")
      );
  }, [])
  console.log(summary)
  return (
    <div>
      <div className="container">
        <h1 className="title">COVID-19 Tracker</h1>
        <h2 className="total">
          Total: <CountUp start={0} end={summary.TotalConfirmed} duration={1} separator=","/>
        </h2>
        <h2 className="death">
          Deaths: <CountUp start={0} end={summary.TotalDeaths} duration={1} separator=","/></h2>
        <h2 className="recovered">
          Recovered: <CountUp start={0} end={summary.TotalRecovered} duration={1} separator=","/></h2>
        <h6 className="date">Last Updated: {date}</h6>
      </div>
      
    </div>
  )
}
