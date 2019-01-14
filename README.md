# reference-tooltip

## Features

- Tooltip UI that can inject contents in JSON format
  - **So you can fetch asynchronously and inject tooltip contents.** (benchmark: Wikipedia)
- Web Components (use [lit-html](https://github.com/Polymer/lit-html))

## Installation

```bash
yarn add git+https://github.com/moriyuu/reference-tooltip
# or
npm i git+https://github.com/moriyuu/reference-tooltip
```

## Usage

### in HTML

```html
<body>
    <p>
        I love <referenced-word rwid="sushi" content="Very very delicious.">sushi</referenced-word>.
    </p>
</body>
```

### in React

[moriyuu/reference-tooltip-react-sample](https://github.com/moriyuu/reference-tooltip-react-sample)

```jsx
import React from "react";
import "reference-tooltip";

function Component() {
    return (
        <p>
            I love <referenced-word rwid="sushi" content="Very very delicious.">sushi</referenced-word>.
        </p>
    );
}
```

## TODO

- [ ] rich animation
- [ ] arbitrary style and animation params
- [ ] publish to npm
