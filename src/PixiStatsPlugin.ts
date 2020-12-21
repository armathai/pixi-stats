/// <reference types="pixi.js" />
import { PixiStats } from './PixiStats';
import { PixiStatsAdapter } from './PixiStatsAdapter';

export class PixiStatsPlugin {
    public static init(this: PIXI.Application & { stats: PixiStatsAdapter }): void {
        const pixiStats = new PixiStats(this);
        this.stats = new PixiStatsAdapter(pixiStats);
    }

    public static destroy(): void {
        void 0;
    }
}
