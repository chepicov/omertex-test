import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import sections from 'fields';
import { FIELD_TYPES } from 'app.constants';

import FormSection from './components/formSection';
import './form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {},
      errors: [],
    };
  }

  onChange = (key, e) => {
    if (!e) {
      this.setState((prevState) => {
        const prevValue = prevState.formValues[key];
        return {
          formValues: {
            ...prevState.formValues,
            [key]: prevValue !== undefined ? !prevValue : true,
          },
        };
      });
      return;
    }
    const { value } = e.target;
    this.setState((prevState) => ({
      formValues: {
        ...prevState.formValues,
        [key]: value,
      },
    }));
  };

  onFocus = (field, value) => {
    if (this.validate(field, value)) {
      this.setState((prevState) => ({
        errors: prevState.errors.filter((item) => item !== field.name),
      }));
    }
  };

  onBlur = (field, value) => {
    const {
      errors,
    } = this.state;
    if (!this.validate(field, value)
      && errors.indexOf(field.name) === -1) {
      this.setState((prevState) => ({
        errors: [
          ...prevState.errors,
          field.name,
        ],
      }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { formValues } = this.state;

    const errors = [];

    // validate all data, fill unselected radio
    const reduce = (acc, field) => {
      let childrenFields;
      let res = acc;

      if (!this.validate(field, res[field.name])) {
        errors.push(field.name);
      }

      if (field.type === FIELD_TYPES.CHECKBOX) {
        if (!res[field.name]) {
          return res;
        }
      }
      if (field.type === FIELD_TYPES.RADIO) {
        if (!res[field.name]) {
          res = { ...res, [field.name]: field.options[0].key };
        }
        const activeOption = field.options
          .find(({ key }) => key === { ...res }[field.name]);
        if (activeOption.children) {
          activeOption.children
            .map((child) => ({ ...child, name: `${field.name}.${child.name}` }))
            .forEach((child) => {
              if (!this.validate(child, res[child.name])) {
                errors.push(child.name);
              }
            });
        }
      }

      if (field.children) {
        childrenFields = field.children
          .map((child) => ({ ...child, name: `${field.name}.${child.name}` }))
          .reduce(reduce, res);
        res = { ...res, ...childrenFields };
      }
      return res;
    };

    const validated = sections.reduce((acc, section) => ({
      ...acc,
      ...section.fields
        .map((field) => ({ ...field, name: `${section.key}.${field.name}` }))
        .reduce(reduce, acc),
    }), formValues);

    if (errors.length) {
      this.setState({ errors });
      console.error(errors);
      console.log('FAIL');
      return null;
    }

    console.log(validated);
    console.log('SUCCESS');
    return validated;
  };

  validate = (field, value) => !((field.isRequired && !value)
    || (field.regex && !field.regex.test(value)));

  render() {
    const {
      formValues,
      errors,
    } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="form__body">
          {
            sections.map((section) => (
              <FormSection
                key={section.key}
                name={section.key}
                header={section.title}
                fields={section.fields}
                values={formValues}
                errors={errors}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            ))
          }
        </div>
        <div className="form__footer">
          <Button classes={{ root: 'form__button' }} type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button classes={{ root: 'form__button' }} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

export default Form;
