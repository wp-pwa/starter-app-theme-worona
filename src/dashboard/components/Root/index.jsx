import React from 'react';
import BaseSwitch from 'react-ios-switch';
import '!style!css!postcss!react-ios-switch/build/bundle.css';
import Switch from './Switch';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as deps from '../../deps';

let StarterThemeForm = ({ pristine, waiting, displayCategoriesChecked, displayFeaturedImageChecked }) => {
  const Button = deps.elements.Button;
  const Checkbox = deps.elements.Checkbox;
  const Input = deps.elements.Input;
  return (
    <form>
      <p className="control">
        <label className="label">Color</label>
      </p>
      <p className="control">
        <a className="button is-medium">
        <span className="icon is-small">
          <i className="fa fa-paint-brush"></i>
        </span>
        <span>Change color</span>
        </a>
      </p>
      <Field
        name="displayFeaturedImage"
        component={Switch}
        label="Display featured image?"
        checked={displayFeaturedImageChecked}
      />
      <br /><br />
      <Field
        name="displayCategories"
        component={Switch}
        label="Display categories menu?"
        checked={displayCategoriesChecked}
      />
      <br /><br />
      <Button
        color="primary"
        size="large"
        type="submit"
        disabled={pristine}
        loading={waiting}
      >
        Save
      </Button>
    </form>
  );
};

StarterThemeForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
};

const mapStateToFormProps = state => ({
  displayCategoriesChecked: state.theme.reduxForm.StarterThemeForm && state.theme.reduxForm.StarterThemeForm.values && state.theme.reduxForm.StarterThemeForm.values.displayCategories,
  displayFeaturedImageChecked: state.theme.reduxForm.StarterThemeForm && state.theme.reduxForm.StarterThemeForm.values && state.theme.reduxForm.StarterThemeForm.values.displayFeaturedImage,
  waiting: state.settings.savingSettings === 'starter-app-theme-worona',
});

StarterThemeForm = reduxForm({
  form: 'StarterThemeForm',
  fields: ['displayCategories', 'displayFeaturedImage'],
  getFormState: state => state.theme.reduxForm,
})(StarterThemeForm);
StarterThemeForm = connect(mapStateToFormProps)(StarterThemeForm);

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <h1>Starter Theme settings</h1>
      <hr />
      <StarterThemeForm />
    </RootContainer>
  );
};
