import Stats from 'stats.js';
import { PIXIStats } from './PIXIStats';

export class PixiStatsAdapter implements PixiStats {
    private _stats: Stats = new Stats();
    private _pixiStats: PIXIStats;
    private _drawCallsPanel: Stats.Panel;
    private _texturesCountPanel: Stats.Panel;

    public constructor(pixiStats: PIXIStats) {
        this._pixiStats = pixiStats;
        this._drawCallsPanel = this.addPanel(new Stats.Panel('DC:', '#FFFA9A', '#38372A'));
        this._texturesCountPanel = this.addPanel(new Stats.Panel('T:', '#FFF2DF', '#B27D35'));
        this.showPanel(3);
    }

    public get dom(): HTMLDivElement {
        return this._stats.dom;
    }

    public showPanel(value: number): void {
        this._stats.showPanel(value);
    }

    public begin(): void {
        this._stats.begin();
    }

    public end(): number {
        return this._stats.end();
    }

    public update(): void {
        this._drawCallsPanel.update(this._pixiStats.deltaDrawCalls, Math.max(50, this._pixiStats.maxDeltaDrawCalls));
        this._texturesCountPanel.update(this._pixiStats.texturesCount, Math.max(20, this._pixiStats.maxTextureCount));
        this._stats.update();
    }

    public addPanel(panel: Stats.Panel): Stats.Panel {
        return this._stats.addPanel(panel);
    }

    public reset(): void {
        this._pixiStats.reset();
    }
}
