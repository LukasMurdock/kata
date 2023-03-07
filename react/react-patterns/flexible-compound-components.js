// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react';
import { Switch } from '../switch';

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
const ToggleContext = React.createContext(defaultValue);

function Toggle({ children }) {
    const [on, setOn] = React.useState(false);
    const toggle = () => setOn(!on);

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    );
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
function useToggle() {
    return React.useContext(ToggleContext);
}

// 💰 `const context = React.useContext(ToggleContext)`
// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
function ToggleOn({ children }) {
    const { on } = useToggle();
    return on ? children : null;
}

function ToggleOff({ children }) {
    const { on } = useToggle();
    return on ? null : children;
}

function Switch(props) {
    const {
        on,
        className = '',
        'aria-label': ariaLabel,
        onClick,
        ...props
    } = props;
    return (
        <label aria-label={ariaLabel || 'Toggle'} style={{ display: 'block' }}>
            <input
                className="toggle-input"
                type="checkbox"
                checked={on}
                onClick={onClick}
                data-testid="toggle-input"
            />
            <span className={btnClassName} {...props} />
        </label>
    );
}

function ToggleButton({ ...props }) {
    const { on, toggle } = useToggle();
    return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
    return (
        <div>
            <Toggle>
                <ToggleOn>The button is on</ToggleOn>
                <ToggleOff>The button is off</ToggleOff>
                <div>
                    <ToggleButton />
                </div>
            </Toggle>
        </div>
    );
}

export default App;

/*
eslint
  no-unused-vars: "off",
*/
