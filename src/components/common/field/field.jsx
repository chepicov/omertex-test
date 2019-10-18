import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FIELD_TYPES } from 'app.constants';
import './field.css';

/* eslint-disable react/prop-types */
const getChildren = ({
  parent,
  disabled,
  field,
  values,
  errors,
  onChange,
  onFocus,
  onBlur,
}) => (
  <div key="children">
    {
      parent.children.map((child) => (
        <Field
          key={`${field.name}.${child.name}`}
          field={{
            ...child,
            name: `${field.name}.${child.name}`,
            disabled,
          }}
          errors={errors}
          values={values}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ))
    }
  </div>
);
/* eslint-disable react/prop-types */

const Field = ({
  field, onChange, onBlur, onFocus, values, errors,
}) => {
  let value = values[field.name] || '';
  const hasDots = field.children
    || field.type === FIELD_TYPES.INPUT;
  const label = (
    <span>
      {field.label}
      {hasDots ? ':' : ''}
      {field.isRequired && <span className="required">*</span>}
    </span>
  );
  switch (field.type) {
    case FIELD_TYPES.RADIO: {
      value = value || field.options[0].key;
      return (
        <RadioGroup
          onChange={(e) => onChange(field.name, e)}
          name={field.name}
          value={value}
          key="main"
        >
          {
            field.options.map((option) => {
              const optionComponent = (
                <FormControlLabel
                  key={option.key}
                  required={field.isRequired}
                  disabled={field.disabled}
                  label={`${option.title}${option.children ? ':' : ''}`}
                  control={(
                    <Radio value={option.key} name={option.key} />
                  )}
                />
              );
              if (!option.children) {
                return optionComponent;
              }
              const children = getChildren({
                parent: option,
                disabled: field.disabled || value !== option.key,
                field,
                values,
                errors,
                onFocus,
                onBlur,
                onChange,
              });
              return [
                optionComponent,
                children,
              ];
            })
          }
        </RadioGroup>
      );
    }
    case FIELD_TYPES.INPUT: {
      const error = !field.disabled
        && errors.indexOf(field.name) !== -1;
      return (
        <FormControlLabel
          label={label}
          labelPlacement="start"
          disabled={field.disabled}
          control={(
            <Input
              error={error}
              value={value}
              name={field.name}
              onFocus={(e) => onFocus(field, value, e)}
              onBlur={(e) => onBlur(field, value, e)}
              onChange={(e) => onChange(field.name, e)}
            />
          )}
        />
      );
    }
    case FIELD_TYPES.CHECKBOX: {
      const checkboxComponent = (
        <FormControlLabel
          key="main"
          classes={{ root: 'checkbox' }}
          label={label}
          required={field.isRequired}
          disabled={field.disabled}
          control={(
            <Checkbox
              onChange={() => onChange(field.name)}
            />
          )}
        />
      );
      if (!field.children) {
        return checkboxComponent;
      }
      const children = getChildren({
        parent: field,
        disabled: field.disabled || !value,
        field,
        values,
        onChange,
        errors,
        onFocus,
        onBlur,
      });
      return [
        checkboxComponent,
        children,
      ];
    }
    default:
      return null;
  }
};

Field.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  field: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    isRequired: PropTypes.bool,
    options: PropTypes.array,
    regex: PropTypes.regex,
    children: PropTypes.array,
  }).isRequired,
};

Field.defaultProps = {
  errors: [],
  onFocus: () => {},
  onBlur: () => {},
};

export default Field;
