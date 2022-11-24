import React, { useEffect, useState, FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { countrySelector } from '../../../store/reducers/country';
import { datasetSelector } from '../../../store/reducers/dataset';
import Button from '../../Button/Button';
import { IBuyOrderPartial } from '../../../types/BuyOrder';

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
  const [isValidated, setIsValidated] = useState(false);
  const { all: allCountries } = useSelector(countrySelector);
  const { all: allDatasets } = useSelector(datasetSelector);

  useEffect(() => {
    setFormData({ ...details });
  }, [details]);

  const handleChangeValue = (propertyName: string, value: string | number) => {
    setFormData({
      ...formData,
      [propertyName]: value,
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      onSubmit(formData);
    }

    setIsValidated(true);
  };

  const isEdit = !!details.id;
  const actionButtonName = isEdit ? 'Save' : 'Create Order';

  return (
    <Form
      noValidate
      validated={isValidated}
      onSubmit={handleSubmit}
      className="bg-gray-black p-4"
    >
      <Row>
        <Form.Group as={Col} xs={12} md={6} className="mb-3">
          <Form.Label className="text-secondary text-decoration-underline">
            Order name
          </Form.Label>
          <Form.Control
            type="text"
            required
            value={formData.name ? formData.name : ''}
            placeholder="Order name"
            onChange={(event) => handleChangeValue('name', event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please input a order name.
          </Form.Control.Feedback>
        </Form.Group>
        {isEdit && (
          <Form.Group as={Col} xs={12} md={6} className="mb-3">
            <Form.Label className="text-secondary text-decoration-underline">
              Date Created
            </Form.Label>
            <Form.Control
              type="text"
              readOnly
              disabled
              value={
                formData.createdAt
                  ? dayjs(formData?.createdAt).format('MM/DD/YYYY')
                  : ''
              }
            />
          </Form.Group>
        )}
      </Row>
      <Row>
        <Form.Group as={Col} xs={12} md={6} className="mb-3">
          <Form.Label className="text-secondary text-decoration-underline">
            Order Budget
          </Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              required
              value={formData.budget ? formData.budget : 0}
              isInvalid={
                isValidated && (!formData.budget || formData.budget <= 0)
              }
              placeholder="Order Budget"
              onChange={(event) =>
                handleChangeValue('budget', Number(event.target.value))
              }
            />
            <Form.Control.Feedback type="invalid">
              Please input a order budget.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} xs={12} className="mb-3">
          <Form.Label className="text-secondary text-decoration-underline">
            Included datasets
          </Form.Label>
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
          <Form.Control
            type="text"
            value={
              formData.datasetIds && formData.datasetIds.length > 0
                ? 'valid'
                : ''
            }
            required
            hidden
            isInvalid={
              isValidated &&
              (!formData.datasetIds || formData.datasetIds.length === 0)
            }
            onChange={() => {}}
          />
          <Form.Control.Feedback type="invalid">
            Please choose one dataset at least.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} xs={12} className="mb-3">
          <Form.Label className="text-secondary text-decoration-underline">
            Included countries
          </Form.Label>
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
          <Form.Control
            type="text"
            hidden
            value={
              formData.countries && formData.countries.length > 0 ? 'valid' : ''
            }
            isInvalid={
              isValidated &&
              (!formData.countries || formData.countries.length === 0)
            }
            onChange={() => {}}
          />
          <Form.Control.Feedback type="invalid">
            Please choose one country at least.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              name={actionButtonName}
              loading={isSubmiting}
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default BuyOrderForm;
