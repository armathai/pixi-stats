interface PixiStats {
    dom: HTMLDivElement;
    showPanel(value: number): void;
    begin(): void;
    end(): number;
    update(): void;
    addPanel(panel: Stats.Panel): Stats.Panel;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace PIXI {
    interface Application {
        stats: PixiStats;
    }
}
