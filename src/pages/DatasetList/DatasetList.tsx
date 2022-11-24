import React, { useEffect, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import DatasetCard from '../../components/Dataset/DatasetCard/DatasetCard';
import { getAllDatasets } from '../../store/reducers/dataset/actions';
import { datasetSelector } from '../../store/reducers/dataset';
import Loader from '../../components/Loader/Loader';
import CountryFilter from '../../components/CountryFilter/CountryFilter';
import { countrySelector } from '../../store/reducers/country';
import { checkCountryAvailability } from '../../utils/common';
import { thunkDispatch } from '../../store/store';
import ListResult from '../../components/ListResult/ListResult';

const DatasetList = () => {
  const { all: datasets, status: datasetsAPIStatus } =
    useSelector(datasetSelector);
  const {
    all: countries,
    status: countriesAPIStatus,
    countriesMap,
    filteredCountriesMap,
  } = useSelector(countrySelector);

  useEffect(() => {
    const fetchData = () => {
      thunkDispatch(getAllDatasets());
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Create a map to add extra available records and included countries efficiently
   * into the datasets list
   */
  const extraDatasetsMap = useMemo(() => {
    let map: Record<number, { countryCodes: string[]; recordCount: number }> =
      {};

    if (datasets && datasets.length > 0 && countries && countries.length > 0) {
      for (let c = 0; c < countries.length; c++) {
        const country = countries[c];

        if (country.storedData) {
          for (let d = 0; d < country.storedData.length; d++) {
            const dataset = country.storedData[d];

            if (!map[dataset.datasetId]) {
              map[dataset.datasetId] = {
                countryCodes: [],
                recordCount: 0,
              };
            }

            map[dataset.datasetId].countryCodes.push(country.countryCode);
            map[dataset.datasetId].recordCount += dataset.recordCount;
          }
        }
      }
    }

    return map;
  }, [datasets, countries]);

  const filteredDataSets = useMemo(() => {
    if (!datasets || datasets.length === 0) {
      return [];
    }

    return datasets.filter((dataset) =>
      checkCountryAvailability(
        extraDatasetsMap[dataset.id]
          ? extraDatasetsMap[dataset.id].countryCodes
          : [],
        filteredCountriesMap
      )
    );
  }, [datasets, extraDatasetsMap, filteredCountriesMap]);

  if (datasetsAPIStatus === 'pending' || countriesAPIStatus === 'pending') {
    return <Loader />;
  }

  if (!datasets || datasets.length === 0) {
    return (
      <Alert variant="warning" className="m-2">
        No data
      </Alert>
    );
  }

  return (
    <>
      <h1 className="text-center my-5">Datasets</h1>

      <ListResult count={filteredDataSets.length} />

      <Row>
        {filteredDataSets.map((dataset, index) => (
          <Col xs={12} md={6} className="mb-3" key={`dataset_${index}`}>
            <DatasetCard
              data={{
                ...dataset,
                ...extraDatasetsMap[dataset.id],
              }}
              countriesMap={countriesMap}
            />
          </Col>
        ))}
      </Row>

      <CountryFilter />
    </>
  );
};

export default DatasetList;
