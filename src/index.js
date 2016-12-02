import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Onboarding extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentStep: 0,
			completedStep: -1
		};

		this.totalSteps = this.props.steps.length;
		this.renderStepNames = this.renderStepNames.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.skipAll = this.skipAll.bind(this);
	}

	nextStep() {
		this.setState({
			currentStep: this.state.currentStep + 1,
			completedStep: this.state.completedStep + 1
		});
	}

	setStep(step) {
		if (this.state.completedStep + 1 >= step) {
			this.setState({
				currentStep: step
			});
		}
	}

	skipAll() {
		this.setState({
			currentStep: this.totalSteps
		});
	}

	renderStep(props) {
		return React.Children.map(props.children, child => {
			if (child.key == this.state.currentStep) {
				return React.cloneElement(child, {
					currentStep: this.state.currentStep,
					nextStep: this.nextStep,
					setStep: this.setStep.bind(this),
					completedStep: this.state.completedStep
				})
			}
		})
	}

	renderStepNames() {
		return this.props.steps.map((s, i) => (
			<li key={i} onClick={this.setStep.bind(this, i)} className={(this.state.currentStep == i ? 'active' : this.state.completedStep >= i ? 'finished' : null)}>
				<span className="icon">
					<i className="fa fa-check-circle"></i>
					<span className="circle">{i+1}</span>
				</span>
				{this.props.steps[i]}
			</li>
		));
	}

	render() {
		return (
			<section>
				<div className="left">
					<div className="img-container">
						<img src={this.props.brandImage} width="120" />
					</div>
					<ul className="step-widget">
						<h3>
							Getting Started
							<span className="pull-right">{this.state.currentStep + 1} of {this.totalSteps}</span>
						</h3>
						{this.renderStepNames()}
					</ul>

					<a onClick={() => this.skipAll()} className="skip-link">Skip Tutorial<i className="fa fa-arrow-right"></i></a>
				</div>

				<div className="onboarding-navbar">
					<h1>{this.props.title}</h1>
					<a onClick={this.skipAll} className="pull-right">Skip</a>
				</div>

				<div className="onboarding-progress">
					<div className="status" style={{width: ((this.state.currentStep+1) * (100 / this.totalSteps)) + '%'}}></div>
				</div>

				<div className="right">
					<ReactCSSTransitionGroup
						transitionName="fadeSlideIn"
						transitionAppear={true}
						transitionAppearTimeout={500}
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{this.renderStep(this.props)}
					</ReactCSSTransitionGroup>
				</div>
			</section>
		);
	}
}

Onboarding.defaultProps = {
	steps: ['Welcome'],
	title: 'Onboarding'
};
