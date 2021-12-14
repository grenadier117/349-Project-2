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
import { Select } from './Select';

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

export const CurrentCasesMap = ({ country, refresh }) => {

  const { data } = useTracker({ api: 'historical', refresh: refresh, additionalParams: country ? `/${country}?lastdays=30` : '/all' });
  const { data: countries = [] } = useTracker({ api: 'countries', refresh: refresh });
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
        labels: Object.keys(country ? data.timeline.cases : data.cases),
        datasets: [{
          label: `Current Cases: ${country}`,
          data: Object.entries(country ? data.timeline.cases : data.cases).map(item => {
            return item[1] - (country ? data.timeline.recovered : data.recovered)[item[0]]
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
          data: Object.values(country ? data.timeline.cases : data.cases),
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
      const newCountryData = {
        labels: countries.map(item => item.country),
        datasets: [{
          label: `Current Cases by Country`,
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
    <div>
      <div>
        {totalCaseData && <LineChart chartData={totalCaseData} title={`Cases over past 30 days: ${country || 'All Countries'}`} />}
      </div>
      <div>
        {totalCaseData && <BarChart chartData={currentCasesByCountry} title={`Current cases by country`} />}
      </div>
    </div>
  )
}

export const CasesWrapper = ({ country, refresh }) => {
  const Charts = React.useMemo(() => <CurrentCasesMap country={country} refresh={refresh} />, [country, refresh]);
  
  return <React.Fragment>
    {Charts}
  </React.Fragment>
}