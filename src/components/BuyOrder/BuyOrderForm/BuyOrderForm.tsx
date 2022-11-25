import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';

import { countrySelector } from '../../../store/reducers/country';
import { datasetSelector } from '../../../store/reducers/dataset';
import Button from '../../Button/Button';
import { IBuyOrderPartial } from '../../../types/BuyOrder';

import './BuyOrderForm.scss';

interface IForm {
  name: string | null;
  budget: number | null;
  datasetIds: number[] | null;
  countries: string[] | null;
}

interface IBuyOrderFormProps {
  details: IBuyOrderPartial;
  isSubmiting: boolean;
  onSubmit: (data: IBuyOrderPartial) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required.').nullable(),
  budget: Yup.number().required('Budget is required.').nullable(),
  datasetIds: Yup.array()
    .of(Yup.number())
    .min(1, 'Please choose one dataset at least.'),
  countries: Yup.array()
    .of(Yup.string())
    .min(1, 'Please choose one country at least.')
    .of(Yup.string()),
});

const BuyOrderForm: FC<IBuyOrderFormProps> = ({
  details,
  isSubmiting,
  onSubmit,
}) => {
  const { all: allCountries } = useSelector(countrySelector);
  const { all: allDatasets } = useSelector(datasetSelector);

  const handleSubmit = (values: IForm) => {
    onSubmit({
      ...details,
      ...values,
    });
  };

  const isEdit = !!details.id;
  const actionButtonName = isEdit ? 'Save' : 'Create Order';

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={{
        name: details.name,
        budget: details.budget,
        datasetIds: details.datasetIds,
        countries: details.countries,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="bg-gray-black p-4">
          <Row>
            <Form.Group as={Col} xs={12} md={6} className="mb-3">
              <Form.Label className="text-secondary text-decoration-underline">
                Order name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={values.name ?? ''}
                placeholder="Order name"
                onChange={handleChange}
              />
              {!!errors.name && touched.name && (
                <div className="mt-1 text-danger small">{errors.name}</div>
              )}
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
                    details.createdAt
                      ? dayjs(details?.createdAt).format('MM/DD/YYYY')
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
                  name="budget"
                  required
                  value={values.budget ?? 0}
                  placeholder="Order Budget"
                  onChange={handleChange}
                />
              </InputGroup>
              {!!errors.budget && touched.budget && (
                <div className="mt-1 text-danger small">{errors.budget}</div>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} xs={12} className="mb-3">
              <Form.Label className="text-secondary text-decoration-underline">
                Included datasets
              </Form.Label>

              <FieldArray
                name="datasetIds"
                render={({ remove, push }) => (
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
                              values.datasetIds?.indexOf(dataset.id) === -1
                                ? ''
                                : 'border border-dark'
                            }`}
                            onClick={() => {
                              const datasetIds = values.datasetIds
                                ? [...values.datasetIds]
                                : [];
                              const index = datasetIds.indexOf(dataset.id);

                              if (index === -1) {
                                push(dataset.id);
                              } else {
                                remove(index);
                              }
                            }}
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
                )}
              />
              {!!errors.datasetIds && touched.datasetIds && (
                <div className="mt-1 text-danger small">
                  {errors.datasetIds}
                </div>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} xs={12} className="mb-3">
              <Form.Label className="text-secondary text-decoration-underline">
                Included countries
              </Form.Label>
              <FieldArray
                name="countries"
                render={({ remove, push }) => (
                  <div>
                    {allCountries &&
                      allCountries.map((country) => (
                        <Badge
                          pill
                          bg="light"
                          className={`mx-1 text-dark bg-gray-white cursor-pointer ${
                            values.countries?.indexOf(country.countryCode) ===
                            -1
                              ? ''
                              : 'border border-dark'
                          }`}
                          key={`country_${country.countryCode}`}
                          onClick={() => {
                            const countries = values.countries
                              ? [...values.countries]
                              : [];
                            const index = countries.indexOf(
                              country.countryCode
                            );

                            if (index === -1) {
                              push(country.countryCode);
                            } else {
                              remove(index);
                            }
                          }}
                        >
                          {country.name}
                        </Badge>
                      ))}
                  </div>
                )}
              />
              {!!errors.countries && touched.countries && (
                <div className="mt-1 text-danger small">{errors.countries}</div>
              )}
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
      )}
    </Formik>
  );
};

export default BuyOrderForm;
