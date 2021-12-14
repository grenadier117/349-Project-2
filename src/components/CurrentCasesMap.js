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

  const { data } = useTracker({ api: 'historical', refresh: refresh, additionalParams: country && country !== 'All Countries' ? `/${country}?lastdays=30` : '/all' });
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
          label: `Current Cases: ${country || 'All Countries'}`,
          data: Object.entries(country ? data.timeline?.cases : data.cases)?.map(item => {
            return item[1] - ((country ? data.timeline?.recovered : data.recovered) || {})[item[0]]
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }, {
          label: `Total Cases: ${country || 'All Countries'}`,
          data: Object.values(country ? data.timeline?.cases : data.cases),
          backgroundColor: [
            'rgba(55, 99, 232, 0.2)',
          ],
          borderColor: [
            'rgba(55, 99, 232, 1)',
          ],
          borderWidth: 1
        }, {
          label: `Fatal Cases: ${country || 'All Countries'}`,
          data: Object.values(country ? data.timeline?.deaths : data.deaths),
          backgroundColor: [
            'rgba(0, 99, 32, 0.2)',
          ],
          borderColor: [
            'rgba(0, 99, 32, 1)',
          ],
          borderWidth: 1,
          hidden: true,
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
          label: `Total Cases by Country`,
          data: countries.map(item => item.cases),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
          barPercentage: 1.0,
          // indexAxis: 'y',
        }, {
          label: `Active Cases by Country`,
          data: countries.map(item => item.active),
          backgroundColor: [
            'rgba(0, 0, 255, 0.2)',
          ],
          borderColor: [
            'rgba(0, 0, 255, 1)',
          ],
          borderWidth: 1,
          barPercentage: 1.0,
          // indexAxis: 'y',
        }, {
          label: `Fatal Cases by Country`,
          data: countries.map(item => item.deaths),
          backgroundColor: [
            'rgba(55, 99, 32, 0.2)',
          ],
          borderColor: [
            'rgba(55, 99, 32, 1)',
          ],
          borderWidth: 1,
          barPercentage: 1.0,
          // indexAxis: 'y',
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