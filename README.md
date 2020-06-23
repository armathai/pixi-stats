[![npm version](https://badge.fury.io/js/%40armathai%2Fpixi-stats.svg)](https://badge.fury.io/js/%40armathai%2Fpixi-stats)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# pixi-stats

Pixi Performance Monitor (Textures, Draw Calls) for WebGL applications. Uses [stats.js](https://github.com/mrdoob/stats.js) under the hood.

# Install

```sh
$ npm install @armathai/pixi-stats # for npm users
$ yarn add @armathai/pixi-stats # for yarn users
```

# Using

```javascript
import { PixiStatsPlugin } from '@armathai/pixi-stats';

PIXI.Application.registerPlugin(PixiStatsPlugin);

class Game extends PIXI.Application {
    public constructor() {
        super({ resizeTo: window, backgroundColor: 0xcdcdcd });
        document.body.appendChild(this.view);
        document.body.appendChild(this.stats.dom);
        this.ticker.add(() => {
            this.stats.update();
        });
    }
}
```
