# Onboarding

```javascript
const steps = ['Welcome', 'Setup'];

ReactDOM.render(
	<Onboarding
		brandImage='/dist/images/logo.svg'
		steps={steps}>
			<div key={0} className="step"><p>Hello</p></div>
			<div key={1} className="step"><p>How are you?</p></div>
	</Onboarding>, document.getElementById('onboarding-container'));

```
