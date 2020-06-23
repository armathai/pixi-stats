import { ASSETS } from './Assets';
import { Bunny } from './Bunny';

export class BunnyMark extends PIXI.Container {
    /**
     * Collection of currently running bunnies
     * @type {Array<PIXI.Sprite>}
     */
    private _bunnies: Bunny[] = [];

    /**
     * `true` to increment the number of bunnies
     * @type {boolean}
     */
    private _isAdding = false;

    /**
     * Number of bunnies on the stage
     * @type {int}
     */
    private _count = 0;

    /**
     * The maximum number of bunnies to render.
     * @type {Number}
     * @default 200000
     */
    private _maxCount = 200000;

    /**
     * Number of bunnies to add each frame if isAdding is `true`
     * @type {int}
     */
    private _amount = 100;

    private _screenBounds: PIXI.Rectangle;

    public constructor(bounds: PIXI.Rectangle, startBunnyCount = 1000) {
        super();
        this._screenBounds = bounds.clone();
        this.interactive = true;
        this.hitArea = bounds.clone();
        this.on('pointerdown', this._startAdding, this);
        this.on('pointerup', this._stopAdding, this);
        this._addBunnies(startBunnyCount);
    }

    /**
     * Frame update function
     * @method update
     */
    public update(): void {
        if (this._isAdding) {
            if (this._count < this._maxCount) {
                this._addBunnies(this._amount);
            }
        }

        for (let i = 0; i < this._bunnies.length; i++) {
            this._bunnies[i].update();
        }
    }

    /**
     * Add an arbitrary amount of bunnies
     * @method addBunnies
     */
    private _addBunnies(num: number): void {
        // We don't include this until later because pixi is required

        for (let i = 0; i < num; i++) {
            const texture = ASSETS[this._count % ASSETS.length];
            const bunny = new Bunny(PIXI.Texture.from(texture), this._screenBounds);
            bunny.position.x = (this._count % 2) * 800;
            this._bunnies.push(bunny);
            this.addChild(bunny);
            this._count++;
        }
    }

    /**
     * Turn on flag to start adding more bunnies.
     * @method startAdding
     */
    private _startAdding(): void {
        this._isAdding = true;
    }

    /**
     * Turn off flag to stop adding bunnies.
     * @method stopAdding
     */
    private _stopAdding(): void {
        this._isAdding = false;
    }
}
