import { Application, Renderer } from 'pixi.js';
import { GLStats } from './stats/GLStats';
import { TextureStats } from './stats/TextureStats';

export class PixiStats {
    private _lastDrawCalls = -1;
    private _maxDeltaDrawCalls = -1;
    private _glStats: GLStats;
    private _textureStats: TextureStats;
    private _application: Application;

    public constructor(application: Application) {
        this._application = application;
        const { gl, texture } = this._application.renderer as Renderer;
        if (gl && texture) {
            this._glStats = new GLStats(gl);
            this._textureStats = new TextureStats(gl, texture.managedTextures);
            this._lastDrawCalls = this.drawCalls;
        }
    }

    public get drawCalls(): number {
        return this._glStats ? this._glStats.drawPasses : 0;
    }

    public get maxDeltaDrawCalls(): number {
        return this._maxDeltaDrawCalls;
    }

    public get deltaDrawCalls(): number {
        const delta: number = this.drawCalls - this._lastDrawCalls;
        this._lastDrawCalls = this.drawCalls;

        this._maxDeltaDrawCalls = Math.max(this._maxDeltaDrawCalls, delta);
        return delta;
    }

    public get maxTextureCount(): number {
        return this._textureStats ? this._textureStats.maxTexturesCount : 0;
    }

    public get texturesCount(): number {
        return this._textureStats ? this._textureStats.currentTextureCount : 0;
    }

    public reset(): void {
        this._maxDeltaDrawCalls = -1;
        this._lastDrawCalls = -1;
        this._glStats.reset();
        this._textureStats.reset();
    }
}
