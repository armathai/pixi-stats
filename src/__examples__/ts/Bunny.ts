/**
 * Bunny
 * @class Bunny
 * @param {PIXI.Texture} texture
 * @param {Object} bounds
 */
export class Bunny extends PIXI.Sprite {
    /**
     * The amount of gravity
     * @type {Number}
     */
    private _gravity = 0.75;

    /**
     * Horizontal speed
     * @type {Number}
     */
    private _speedX = Math.random() * 10;

    /**
     * Vertical speed
     * @type {Number}
     */
    private _speedY = Math.random() * 10 - 5;

    /**
     * Reference to the bounds object
     * @type {Object}
     */
    private _screenBounds: PIXI.Rectangle;

    public constructor(texture: PIXI.Texture, bounds: PIXI.Rectangle) {
        super(texture);
        this._screenBounds = bounds;
        // Set the anchor position
        this.anchor.x = 0.5;
        this.anchor.y = 1;
    }

    /**
     * Update the position of the bunny
     * @method update
     */
    public update(): void {
        this.position.x += this._speedX;
        this.position.y += this._speedY;
        this._speedY += this._gravity;

        if (this.position.x > this._screenBounds.right) {
            this._speedX *= -1;
            this.position.x = this._screenBounds.right;
        } else if (this.position.x < this._screenBounds.left) {
            this._speedX *= -1;
            this.position.x = this._screenBounds.left;
        }

        if (this.position.y > this._screenBounds.bottom) {
            this._speedY *= -0.85;
            this.position.y = this._screenBounds.bottom;
            if (Math.random() > 0.5) {
                this._speedY -= Math.random() * 6;
            }
        } else if (this.position.y < this._screenBounds.top) {
            this._speedY = 0;
            this.position.y = this._screenBounds.top;
        }
    }

    /**
     * Don't use after this.
     * @method destroy
     */
    public destroy(): void {
        this._screenBounds = null;
        super.destroy();
    }
}
