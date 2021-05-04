import { Application } from 'pixi.js';
import { PixiStats } from './PixiStats';
import { PixiStatsAdapter } from './PixiStatsAdapter';

export class PixiStatsPlugin {
    private _stats: PixiStatsAdapter;

    public constructor(app: Application) {
        const pixiStats = new PixiStats(app);
        this._stats = new PixiStatsAdapter(pixiStats);
    }

    public get stats(): PixiStatsAdapter {
        return this._stats;
    }
}
