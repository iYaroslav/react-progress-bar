# react-progress-bar
> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@iyaroslav/react-progress-bar.svg)](https://www.npmjs.com/package/@iyaroslav/react-progress-bar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
```bash
yarn add @iyaroslav/react-progress-bar
# or
npm install --save @iyaroslav/react-progress-bar
```

## Intro

<p align="center">
  <img width="600" src="https://raw.githubusercontent.com/iYaroslav/react-progress-bar/master/media/example.png">
</p>

## Usage

[Demo](https://iyaroslav.github.io/react-progress-bar/)

```tsx
import React, { Component } from 'react'

import Progress from 'react-progress-bar'
import 'react-progress-bar/dist/index.css'

class Example extends Component {
  render() {
    return <Progress value={0.6} />
  }
}
```

## TODO
- [ ] Min/Max values
- [ ] Step
- [ ] Readonly mode
- [ ] Range mode

## License
MIT © [iYaroslav](https://github.com/iYaroslav)
