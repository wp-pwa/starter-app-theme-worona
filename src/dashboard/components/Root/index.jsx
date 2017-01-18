/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import * as deps from '../../deps';
import * as selectors from '../../selectors';
import styles from './style.css';

class StarterThemeFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showColorPicker: false };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.hideColorPicker = this.hideColorPicker.bind(this);
  }

  toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  hideColorPicker() {
    this.setState({ showColorPicker: false });
  }

  render() {
    const {
      pristine,
      waiting,
      updateColorSelected,
      initialValues,
      handleSubmit,
      siteId,
    } = this.props;
    const chosenColor = this.props.chosenColor || initialValues.chosenColor;
    const Button = deps.elements.Button;
    const Icon = deps.elements.Icon;
    const Switch = deps.elements.Switch;
    const cover = { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' };
    const popover = { position: 'absolute', zIndex: '2' };
    const submitThemeSettings = handleSubmit(
      (values, dispatch) =>
        dispatch(
          deps.actions.saveSettingsRequested(values, { siteId, name: 'starter-app-theme-worona' }),
        ),
    );
    return (
      <form onSubmit={submitThemeSettings}>
        <label className="label" htmlFor="color">Color</label>
        <p className="control">
          <span
            id="colorSample"
            className={`button is-medium is-disabled ${styles.colorSample}`}
            style={{ backgroundColor: chosenColor }}
          >
            <span />
          </span>
          <Button size="medium" onClick={this.toggleColorPicker}>
            <Icon small code="paint-brush" />
            <span>Change color</span>
          </Button>
        </p>
        {this.state.showColorPicker ? (
              <div style={popover}>
                <div style={cover} onClick={this.hideColorPicker} />
                <ChromePicker
                  onChangeComplete={updateColorSelected}
                  color={chosenColor}
                  disableAlpha
                />
              </div>
            ) : null}
        <Field name="chosenColor" component="input" type="hidden" />
        <Field
          name="displayFeaturedImage"
          component={Switch}
          label="Display featured image?"
          type="checkbox"
        />
        <Field
          name="displayCategories"
          component={Switch}
          label="Display categories menu?"
          type="checkbox"
        />
        <Button color="primary" size="large" type="submit" disabled={pristine} loading={waiting}>
          Save
        </Button>
      </form>
    );
  }
}

StarterThemeFormClass.propTypes = {
  chosenColor: React.PropTypes.string,
  updateColorSelected: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  initialValues: React.PropTypes.shape({
    chosenColor: React.PropTypes.string,
    displayCategories: React.PropTypes.bool,
    displayFeaturedImage: React.PropTypes.bool,
  }),
};

const mapStateToFormProps = state => {
  const themeSettings = selectors.getThemeSettings(state);
  return {
    initialValues: {
      chosenColor: themeSettings.chosenColor,
      displayCategories: themeSettings.displayCategories,
      displayFeaturedImage: themeSettings.displayFeaturedImage,
    },
    waiting: state.settings.savingSettings === 'starter-app-theme-worona',
    siteId: deps.selectors.getSelectedSiteId(state),
    chosenColor: state.theme.reduxForm.StarterThemeForm &&
      state.theme.reduxForm.StarterThemeForm.values &&
      state.theme.reduxForm.StarterThemeForm.values.chosenColor,
  };
};

const mapDispatchToFormProps = dispatch =>
  ({
    updateColorSelected: color => dispatch(change('StarterThemeForm', 'chosenColor', color.hex)),
  });

let StarterThemeForm = reduxForm({
  form: 'StarterThemeForm',
  fields: [ 'chosenColor', 'displayCategories', 'displayFeaturedImage' ],
  getFormState: state => state.theme.reduxForm,
  enableReinitialize: true,
})(StarterThemeFormClass);
StarterThemeForm = connect(mapStateToFormProps, mapDispatchToFormProps)(StarterThemeForm);

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <h1>Starter Theme settings</h1>
      <hr />
      <StarterThemeForm />
    </RootContainer>
  );
}
