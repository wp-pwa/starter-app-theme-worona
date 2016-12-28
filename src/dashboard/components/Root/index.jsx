import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import '!style!css!postcss!react-ios-switch/build/bundle.css';
import Switch from './Switch';
import * as deps from '../../deps';

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
    const { pristine, waiting, updateColorSelected, chosenColor } = this.props;
    const Button = deps.elements.Button;
    const Icon = deps.elements.Icon;
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };
    const popover = {
      position: 'absolute',
      zIndex: '2',
    };
    return (
      <form>
        <p className="control">
          <label className="label" htmlFor="color">Color</label>
        </p>
        <p className="control">
          <Button size="medium" onClick={this.toggleColorPicker}>
            <Icon small code="paint-brush" />
            <span>Change color</span>
          </Button>
        </p>
        { this.state.showColorPicker ?
          <div style={popover}>
            <div style={cover} onClick={this.hideColorPicker} />
            <ChromePicker onChangeComplete={updateColorSelected} color={chosenColor} />
          </div>
        : null }
        <Field
          name="chosenColor"
          component="input"
          type="hidden"
        />
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
  }
}

StarterThemeFormClass.propTypes = {
  chosenColor: React.PropTypes.string,
  updateColorSelected: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  waiting: React.PropTypes.bool,
  siteId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
};

const mapStateToFormProps = state => ({
  waiting: state.settings.savingSettings === 'starter-app-theme-worona',
  chosenColor: state.theme.reduxForm.StarterThemeForm
    && state.theme.reduxForm.StarterThemeForm.values
    && state.theme.reduxForm.StarterThemeForm.values.chosenColor
    && state.theme.reduxForm.StarterThemeForm.values.chosenColor.hex,
});

const mapDispatchToFormProps = dispatch => ({
  updateColorSelected: (color) => dispatch(change('StarterThemeForm', 'chosenColor', color)),
});

let StarterThemeForm = reduxForm({
  form: 'StarterThemeForm',
  fields: ['chosenColor', 'displayCategories', 'displayFeaturedImage'],
  getFormState: state => state.theme.reduxForm,
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
};
