import React from 'react';
// import { Chart, LineElement } from 'chart.js';
import { LineChart, BarChart } from './Chart';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useTracker } from '../hooks';
import axios from 'contentful-management/node_modules/axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const CurrentCasesMap = ({ country }) => {

  const { data } = useTracker({ api: 'historical', additionalParams: `/${country}?lastdays=30` });
  const { data: countries = [] } = useTracker({ api: 'countries' });
  const [countryList, setCountryList] = React.useState([]);
  const [totalCaseData, setTotalCaseData] = React.useState({
    labels: [],
    datasets: []
  });
  const [currentCasesByCountry, setCurrentCasesByCountry] = React.useState({
    labels: [],
    datasets: []
  })

  React.useEffect(() => {
    if (data) {
      const newData = {
        labels: Object.keys(data.timeline.cases),
        datasets: [{
          label: `Current Cases: ${country}`,
          data: Object.entries(data.timeline.cases).map(item => {
            return item[1] - data.timeline.recovered[item[0]]
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }, {
          label: `Total Cases: ${country}`,
          data: Object.values(data.timeline.cases),
          backgroundColor: [
            'rgba(55, 99, 232, 0.2)',
          ],
          borderColor: [
            'rgba(55, 99, 232, 1)',
          ],
          borderWidth: 1
        }]
      }
      setTotalCaseData(newData);
    }
  }, [data])

  React.useEffect(() => {
    if (countries) {
      setCountryList(countries.map(item => item.country));
      const newCountryData = {
        labels: countries.map(item => item.country),
        datasets: [{
          label: `Current Cases: all countries`,
          data: countries.map(item => item.cases - item.recovered),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      }
      setCurrentCasesByCountry(newCountryData);
    }
  }, [data, countries])

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0px 30px' }}>
      <div style={{ height: '200px', width: '47%' }}>
        {totalCaseData && <LineChart chartData={totalCaseData} title={`Cases over past 30 days: ${country}`} />}
      </div>
      <div style={{ height: '200px', width: '47%' }}>
        {totalCaseData && <BarChart chartData={currentCasesByCountry} title={`Cases past 30 days by country`} />}
      </div>
    </div>
  )
}

const Select = ({ data, onChange, value }) => {
  return <select value={value} onChange={onChange}>
    {data.map(item => (
      <option>{item}</option>
    ))}
  </select>
}

export const CasesWrapper = ({}) => {
  const [selectedCountry30Days, setSelectedCountry30Days] = React.useState('USA');
  const [countryList, setCountryList] = React.useState()
  React.useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/apple/countries').then(response => {
      setCountryList(response.data);
    })
  }, [])
  const Charts = React.useMemo(() => <CurrentCasesMap country={selectedCountry30Days} />, [selectedCountry30Days]);

  const onChange = event => {
    setSelectedCountry30Days(event.target.value);
  }
  
  return <React.Fragment>
    {countryList && <Select onChange={onChange} value={selectedCountry30Days} data={countryList} />}
    {Charts}
  </React.Fragment>
}