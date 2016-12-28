import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import '!style!css!postcss!react-ios-switch/build/bundle.css';
import Switch from './Switch';
import * as deps from '../../deps';

let StarterThemeForm = ({ pristine, waiting }) => {
  const Button = deps.elements.Button;
  const Icon = deps.elements.Icon;
  return (
    <form>
      <p className="control">
        <label className="label" htmlFor="color">Color</label>
      </p>
      <p className="control">
        <Button size="medium">
          <Icon small code="paint-brush" />
          <span>Change color</span>
        </Button>
      </p>
      <Field
        name="displayFeaturedImage"
        component={Switch}
        label="Display featured image?"
        type="checkbox"
      />
      <br />
      <Field
        name="displayCategories"
        component={Switch}
        label="Display categories menu?"
        type="checkbox"
      />
      <br />
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
