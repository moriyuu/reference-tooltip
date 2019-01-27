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

## Usage in HTML

```html
<body>
    <p>
        I love <referenced-word rwid="los_angeles" content="Los Angeles, officially the City of Los Angeles and known colloquially by its initials LA, is the most populous city in California and the second most populous city in the United States, after New York City. With an estimated population of four million, Los Angeles is the cultural, financial, and commercial center of Southern California. Nicknamed the \"City of Angels\" partly because of its name's Spanish meaning, Los Angeles is known for its Mediterranean climate, ethnic diversity, Hollywood and the entertainment industry, and sprawling metropolis.">sushi</referenced-word>.
    </p>
</body>
```

## Usage in React

See [moriyuu/reference-tooltip-react-sample](https://github.com/moriyuu/reference-tooltip-react-sample).

## How to Register Words to Dictionary at Once

```javascript
import ReferenceTooltip from "reference-tooltip";

ReferenceTooltip.dictionary.define([
  {
    id: "emma_stone",
    content:
      'Emily Jean "Emma" Stone is an American actress. The recipient of numerous accolades, including an Academy Award, a BAFTA Award, and a Golden Globe Award, she was the highest-paid actress in the world in 2017. Stone has appeared in Forbes Celebrity 100 in 2013 and 2017, and was featured by Time as one of the 100 most influential people in the world.'
  },
  {
    id: "ryan_gosling",
    content:
      "Ryan Thomas Gosling is a Canadian actor and musician. He began his career as a child star on the Disney Channel's The Mickey Mouse Club (1993–1995), and went on to appear in other family entertainment programs, including Are You Afraid of the Dark? (1995) and Goosebumps (1996). His first starring film role was as a Jewish neo-Nazi in The Believer (2001), and he went on to star in several independent films, including Murder by Numbers (2002), The Slaughter Rule (2002), and The United States of Leland (2003)."
  }
]);
```

## TODO

- [x] inject dictionary
- [ ] available HTML element in content
- [ ] rich animation
- [ ] arbitrary style and animation params
- [ ] publish to npm
