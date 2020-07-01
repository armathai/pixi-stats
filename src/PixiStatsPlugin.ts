import { PIXIStats } from './PIXIStats';
import { PixiStatsAdapter } from './PixiStatsAdapter';

export class PixiStatsPlugin {
    public static init(this: PIXI.Application, ...params: unknown[]): void {
        const pixiStats = new PIXIStats(this);
        this.stats = new PixiStatsAdapter(pixiStats);
    }

    public static destroy(...params: unknown[]): void {
        void 0;
    }
}
