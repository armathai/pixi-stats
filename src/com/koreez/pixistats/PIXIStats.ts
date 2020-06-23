import { GLStats } from './stats/GLStats';
import { TextureStats } from './stats/TextureStats';

export class PIXIStats {
    private _lastDrawCalls = -1;
    private _maxDeltaDrawCalls = -1;
    private _glStats: GLStats;
    private _textureStats: TextureStats;
    private _application: PIXI.Application;

    public constructor(application: PIXI.Application) {
        this._application = application;
        const { gl, texture } = this._application.renderer;
        this._glStats = new GLStats(gl);
        this._textureStats = new TextureStats(gl, texture.managedTextures);
        this._lastDrawCalls = this.drawCalls;
    }

    public get drawCalls(): number {
        return this._glStats.drawPasses;
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
        return this._textureStats.maxTexturesCount;
    }

    public get texturesCount(): number {
        return this._textureStats.currentTextureCount;
    }

    public reset(): void {
        this._maxDeltaDrawCalls = -1;
        this._lastDrawCalls = -1;
        this._glStats.reset();
        this._textureStats.reset();
    }
}
