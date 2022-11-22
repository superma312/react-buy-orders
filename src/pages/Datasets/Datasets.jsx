import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import DatasetCard from '../../components/Dataset/DatasetCard/DatasetCard';
import Layout from '../../components/Layout/Layout';
import { getAllDatasets } from '../../store/reducers/dataset/actions';
import { datasetSelector } from '../../store/reducers/dataset';
import Loader from '../../components/Loader/Loader';
import CountryFilter from '../../components/CountryFilter/CountryFilter';
import { countrySelector } from '../../store/reducers/country';
import { checkCountryAvailability } from '../../utils/filter';
import CountryListLabel from '../../components/CountryListLabel/CountryListLabel';
import { thunkDispatch } from '../../store/store';

const Datasets = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataMap, setDataMap] = useState({});
  const { all: datasets, status: datasetStatus } = useSelector(datasetSelector);
  const { all: countries, status: countryStatus, countryMap, countryFilters } = useSelector(countrySelector);

  useEffect(() => {
    const fetchData = () => {
      thunkDispatch(getAllDatasets());
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (datasets && datasets.length > 0 && countries && countries.length > 0) {
      let datasetCountryMap = {};

      for (let c = 0; c < countries.length; c++) {
        const country = countries[c];
        
        if (country.storedData) {
          for (let d = 0; d < country.storedData.length; d++) {
            const dataset = country.storedData[d];

            if (!datasetCountryMap[dataset.datasetId]) {
              datasetCountryMap[dataset.datasetId] = {
                countryCodes: [],
                recordCount: 0
              };
            }

            datasetCountryMap[dataset.datasetId].countryCodes.push(country.countryCode);
            datasetCountryMap[dataset.datasetId].recordCount += dataset.recordCount;
          }
        }
      }

      setDataMap(datasetCountryMap);
    } else {
      setDataMap({});
    }
  }, [datasets, countries]);

  useEffect(() => {
    setIsLoaded(datasetStatus === 'success' && countryStatus === 'success')
  }, [datasetStatus, countryStatus]);

  if (!isLoaded) {
    return <Loader />;
  }

  if (!datasets || datasets.length === 0) {
    return <Alert variant='warning' className='m-2'>No data</Alert>;
  }

  const filteredDataSets = datasets.filter(
    dataset => checkCountryAvailability(
      dataMap[dataset.id] ? dataMap[dataset.id].countryCodes : [],
      countryFilters
    )
  );

  const datasetsLen = filteredDataSets ? filteredDataSets.length : 0;

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1 className='text-center my-4'>Datasets</h1>
            <p>Showing {datasetsLen} results <CountryListLabel /></p>
          </Col>
        </Row>
        <Row>
          {filteredDataSets.map((dataset, index) => (
            <Col xs={12} md={6} className="mb-3" key={`dataset_${index}`}>
              <DatasetCard
                data={{
                  ...dataset,
                  ...dataMap[dataset.id]
                }}
                countryMap={countryMap}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div>
        <CountryFilter />
      </div>
    </Layout>
  );
};

export default Datasets;
