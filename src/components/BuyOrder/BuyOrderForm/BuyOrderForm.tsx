import React, { ChangeEvent, useEffect, useState, FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Form from 'react-bootstrap/Form';

import { IBuyOrderPartial } from '../../../store/reducers/buy-order';
import { countrySelector } from '../../../store/reducers/country';
import { datasetSelector } from '../../../store/reducers/dataset';
import { validateBuyOrderForm } from '../../../utils/common';
import ButtonWithLoading from '../../Buttons/ButtonWithLoading/ButtonWithLoading';

import './BuyOrderForm.scss';

export const initialBuyOrderData: IBuyOrderPartial = {
  id: null,
  name: null,
  createdAt: null,
  datasetIds: [],
  countries: [],
  budget: null,
};

interface IBuyOrderFormProps {
  details: IBuyOrderPartial;
  isSubmiting: boolean;
  onSubmit: (data: IBuyOrderPartial) => void;
}

const BuyOrderForm: FC<IBuyOrderFormProps> = ({
  details,
  isSubmiting,
  onSubmit,
}) => {
  const [formData, setFormData] =
    useState<IBuyOrderPartial>(initialBuyOrderData);
  const { all: allCountries } = useSelector(countrySelector);
  const { all: allDatasets } = useSelector(datasetSelector);

  useEffect(() => {
    setFormData({ ...details });
  }, [details]);

  const handleChangeValue = (
    propertyName: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type?: string
  ) => {
    const updatedValue =
      type === 'number' ? Number(event.target.value) : event.target.value;
    setFormData({
      ...formData,
      [propertyName]: updatedValue,
    });
  };

  const handleChangeDataset = (datasetId: number) => {
    const existingDatasetIds = formData.datasetIds
      ? [...formData.datasetIds]
      : [];
    const index = existingDatasetIds.indexOf(datasetId);

    if (index === -1) {
      existingDatasetIds.push(datasetId);
    } else {
      existingDatasetIds.splice(index, 1);
    }

    setFormData({
      ...formData,
      datasetIds: existingDatasetIds,
    });
  };

  const handleChangeCountries = (countryCode: string) => {
    const existingCountryCodes = formData.countries
      ? [...formData.countries]
      : [];
    const index = existingCountryCodes.indexOf(countryCode);

    if (index === -1) {
      existingCountryCodes.push(countryCode);
    } else {
      existingCountryCodes.splice(index, 1);
    }

    setFormData({
      ...formData,
      countries: existingCountryCodes,
    });
  };

  const handleSubmit = () => {
    if (validateBuyOrderForm(formData)) {
      onSubmit(formData);
    }
  };

  const isEdit = !!details.id;
  const actionBtnLabel = isEdit ? 'Save' : 'Create Order';

  return (
    <div className="bg-gray-black p-4">
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <u className="text-secondary mb-2">Order name</u>
          <div>
            <Form.Control
              type="text"
              value={formData.name ? formData.name : ''}
              placeholder="Order name"
              onChange={(event) => handleChangeValue('name', event)}
            />
          </div>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          {isEdit && (
            <>
              <u className="text-secondary mb-2">Date Created</u>
              <div>
                {formData.createdAt
                  ? dayjs(formData?.createdAt).format('MM/DD/YYYY')
                  : ''}
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <u className="text-secondary mb-2">Order Budget</u>
          <div className="d-flex align-items-center">
            <span className="me-2">$</span>
            <Form.Control
              type="number"
              value={formData.budget ? formData.budget : 0}
              placeholder="Order Budget"
              onChange={(event) => handleChangeValue('budget', event, 'number')}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-3">
          <u className="text-secondary mb-2">Included datasets</u>
          <Row>
            {allDatasets &&
              allDatasets.map((dataset) => (
                <Col
                  xs={12}
                  md={6}
                  key={`dataset_${dataset.id}`}
                  className="mb-3"
                >
                  <div
                    className={`d-flex align-items-center bg-gray-white p-2 cursor-pointer ${
                      formData.datasetIds?.indexOf(dataset.id) === -1
                        ? ''
                        : 'border border-dark'
                    }`}
                    onClick={() => handleChangeDataset(dataset.id)}
                  >
                    <img
                      src={dataset.thumbnailUrl}
                      alt="thumbnail"
                      className="me-2 thumbnail"
                    />
                    <div>
                      <div>{dataset.label}</div>
                      <div className="fw-lighter cost">
                        ${dataset.costPerRecord.toFixed(2)} per record
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <u className="text-secondary">Included countries</u>
          <div>
            {allCountries &&
              allCountries.map((country) => (
                <Badge
                  pill
                  bg="light"
                  className={`mx-1 text-dark bg-gray-white cursor-pointer ${
                    formData.countries?.indexOf(country.countryCode) === -1
                      ? ''
                      : 'border border-dark'
                  }`}
                  key={`country_${country.countryCode}`}
                  onClick={() => handleChangeCountries(country.countryCode)}
                >
                  {country.name}
                </Badge>
              ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-center">
            <ButtonWithLoading
              label={actionBtnLabel}
              isSubmiting={isSubmiting}
              onClick={handleSubmit}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BuyOrderForm;
