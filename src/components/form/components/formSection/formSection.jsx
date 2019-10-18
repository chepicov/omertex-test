import React from 'react';
import PropTypes from 'prop-types';
import Field from 'components/common/field';
import './formSection.css';

const FormSection = ({
  name,
  header,
  fields,
  onChange,
  onFocus,
  onBlur,
  values,
  errors,
}) => (
  <section className="section">
    <h2 className="section__header">{header}</h2>
    <div className="section__body">
      {
        fields.map((field) => (
          <Field
            key={`${name}.${field.name}`}
            field={{ ...field, name: `${name}.${field.name}` }}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            values={values}
            errors={errors}
          />
        ))
      }
    </div>
  </section>
);

FormSection.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FormSection;
