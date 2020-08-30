import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      position: 'relative',
      marginLeft: 10,
      marginRight: theme.spacing(1),
      width: '67%',
      paddingBottom: 30,
    },
  }),
);

interface ICountryState {
  Country: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export default function CountryTable() {
  const classes = useStyles();
  const [countrySummary, setCountrySummary] = useState<ICountryState[] | undefined>(undefined);
  const [SearchQuery, setSearchQuery] = useState<string>("");
  const [HasFocus, setHasFocus] = useState<boolean>(false);
  const handleSearchQueryChange = (s: string) => {
    setSearchQuery(s);
  }
  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
      setCountrySummary(data.Countries)
    })
    .catch(() => console.log("error")
    );
  }, [])

  let filterSearch = countrySummary?.filter((country) => {
    return country.Country.toLowerCase().includes(SearchQuery.toLowerCase())
  })

  return (
    <div>
    <TextField
            label="Country"
            id="outlined-margin-none"
            className={classes.textField}
            variant="outlined"
            size='small'
            error={HasFocus && SearchQuery === ""}
            onClick={() => setHasFocus(true)}
            value={SearchQuery}
            onChange={e => handleSearchQueryChange(e.target.value)}
    />
    <Table striped bordered hover responsive="sm" variant="dark">
      <thead>
        <tr>
          <th>Country</th>
          <th>Total Confirmed</th>
          <th>Total Deaths</th>
          <th>Total Recovered</th>
          <th>New Confirmed</th>
          <th>New Deaths</th>
          <th>New Recovered</th>
        </tr>
      </thead>
      <tbody>
        {filterSearch?.map((item, index) => (
          <tr key={index}>
            <td>{item.Country}</td>
            <td>{item.TotalConfirmed}</td>
            <td>{item.TotalDeaths}</td>
            <td>{item.TotalRecovered}</td>
            <td>{item.NewConfirmed}</td>
            <td>{item.NewDeaths}</td>
            <td>{item.NewRecovered}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}
