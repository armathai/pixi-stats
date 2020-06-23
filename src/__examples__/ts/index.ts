import { PixiStatsPlugin } from '../../';
import { BunnyMark } from './BunnyMark';

PIXI.Application.registerPlugin(PixiStatsPlugin);

class Game extends PIXI.Application {
    public constructor() {
        super({ resizeTo: window, backgroundColor: 0xcdcdcd });
        document.getElementById('gameContainer')?.appendChild(this.view);
        document.body.appendChild(this.stats.dom);
        const { width, height } = this.renderer;
        const bunnyMark = new BunnyMark(new PIXI.Rectangle(0, 0, width, height));
        this.stage.addChild(bunnyMark);
        this.ticker.add(() => {
            bunnyMark.update();
            this.stats.update();
        });
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        new Game();
    }
};
