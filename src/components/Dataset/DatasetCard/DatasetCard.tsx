import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { IDataset } from '../../../types/Dataset';

import './DatasetCard.scss';

interface IDatasetCard extends IDataset {
  countryCodes: string[];
  recordCount: number;
}

interface IDatasetCardProps {
  data: IDatasetCard;
  countriesMap: Record<string, string>;
}

const DatasetCard = ({ data, countriesMap }: IDatasetCardProps) => {
  return (
    <Card className='border-0 rounded-0 bg-gray-black'>
      <Card.Body>
        <div className='d-flex align-items-center mb-2'>
          <img src={data.thumbnailUrl} className='thumbnail' alt='Thumbnail' />
          <Card.Title className='ms-3'>{data.label}</Card.Title>
        </div>
        <div className='mb-2'>
          <label className='text-secondary mb-2'>
            <u>Dataset Description</u>
          </label>
          <div>{data.description}</div>
        </div>
        <div className='mb-2 d-flex justify-content-between'>
          <u className='text-secondary'>Cost Per Record</u>
          <div>${data.costPerRecord.toFixed(2)}</div>
        </div>
        <div className='mb-2 d-flex justify-content-between'>
          <u className='text-secondary'>Available Records</u>
          <div>{data.recordCount} records</div>
        </div>
        <div>
          <label className='text-secondary mb-2'>
            <u>Included countries</u>
          </label>
          <div>
            {data.countryCodes &&
              data.countryCodes.map((countryCode) => (
                <Badge
                  pill
                  bg='light'
                  className='mx-1 text-dark bg-gray-white'
                  key={`country_${countryCode}`}
                >
                  {countriesMap[countryCode]}
                </Badge>
              ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DatasetCard;
