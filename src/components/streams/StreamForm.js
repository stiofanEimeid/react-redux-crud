import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched}){
        if (touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    // called for each field component that is created
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input}  autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    // formValues are whatever values were submitted
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            // handle submit prevents defaul
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

// Redux form checks errors object. If field name matches error property,
// Redux will pass object to renderInput function

// every time user interacts with form, validate is called
const validate = formValues => {
    const errors = {}
    if (!formValues.title){
        errors.title = 'You must enter a title';
    }
    if (!formValues.description){
        errors.description = 'You must enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);