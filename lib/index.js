'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Onboarding = function (_Component) {
	_inherits(Onboarding, _Component);

	function Onboarding(props) {
		_classCallCheck(this, Onboarding);

		var _this = _possibleConstructorReturn(this, (Onboarding.__proto__ || Object.getPrototypeOf(Onboarding)).call(this, props));

		_this.state = {
			currentStep: 0,
			completedStep: -1
		};

		_this.totalSteps = _this.props.steps.length;
		_this.renderStepNames = _this.renderStepNames.bind(_this);
		_this.nextStep = _this.nextStep.bind(_this);
		_this.skipAll = _this.skipAll.bind(_this);
		return _this;
	}

	_createClass(Onboarding, [{
		key: 'nextStep',
		value: function nextStep() {
			this.setState({
				currentStep: this.state.currentStep + 1,
				completedStep: this.state.completedStep + 1
			});
		}
	}, {
		key: 'setStep',
		value: function setStep(step) {
			if (this.state.completedStep + 1 >= step) {
				this.setState({
					currentStep: step
				});
			}
		}
	}, {
		key: 'skipAll',
		value: function skipAll() {
			this.setState({
				currentStep: this.totalSteps
			});
		}
	}, {
		key: 'renderStep',
		value: function renderStep(props) {
			var _this2 = this;

			return _react2.default.Children.map(props.children, function (child) {
				if (child.key == _this2.state.currentStep) {
					return _react2.default.cloneElement(child, {
						currentStep: _this2.state.currentStep,
						nextStep: _this2.nextStep,
						setStep: _this2.setStep.bind(_this2),
						completedStep: _this2.state.completedStep
					});
				}
			});
		}
	}, {
		key: 'renderStepNames',
		value: function renderStepNames() {
			var _this3 = this;

			return this.props.steps.map(function (s, i) {
				return _react2.default.createElement(
					'li',
					{ key: i, onClick: _this3.setStep.bind(_this3, i), className: _this3.state.currentStep == i ? 'active' : _this3.state.completedStep >= i ? 'finished' : null },
					_react2.default.createElement(
						'span',
						{ className: 'icon' },
						_react2.default.createElement('i', { className: 'fa fa-check-circle' }),
						_react2.default.createElement(
							'span',
							{ className: 'circle' },
							i + 1
						)
					),
					_this3.props.steps[i]
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			return _react2.default.createElement(
				'section',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'left' },
					_react2.default.createElement(
						'div',
						{ className: 'img-container' },
						_react2.default.createElement('img', { src: this.props.brandImage, width: '120' }),
						_react2.default.createElement(
							'ul',
							{ className: 'step-widget' },
							_react2.default.createElement(
								'h3',
								null,
								'Getting Started',
								_react2.default.createElement(
									'span',
									{ className: 'pull-right' },
									this.state.currentStep + 1,
									' of ',
									this.totalSteps
								)
							),
							this.renderStepNames()
						),
						_react2.default.createElement(
							'a',
							{ onClick: function onClick() {
									return _this4.skipAll();
								}, className: 'skip-link' },
							'Skip Tutorial',
							_react2.default.createElement('i', { className: 'fa fa-arrow-right' })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'onboarding-navbar' },
					_react2.default.createElement(
						'h1',
						null,
						this.props.title
					),
					_react2.default.createElement(
						'a',
						{ onClick: this.skipAll, className: 'pull-right' },
						'Skip'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'onboarding-progress' },
					_react2.default.createElement('div', { className: 'status', style: { width: (this.state.currentStep + 1) * (100 / this.totalSteps) + '%' } })
				),
				_react2.default.createElement(
					'div',
					{ className: 'right' },
					_react2.default.createElement(
						_reactAddonsCssTransitionGroup2.default,
						{
							transitionName: 'fadeSlideIn',
							transitionAppear: true,
							transitionAppearTimeout: 500,
							transitionEnterTimeout: 500,
							transitionLeaveTimeout: 300 },
						this.renderStep(this.props)
					)
				)
			);
		}
	}]);

	return Onboarding;
}(_react.Component);

exports.default = Onboarding;


Onboarding.defaultProps = {
	steps: ['Welcome'],
	title: 'Onboarding'
};