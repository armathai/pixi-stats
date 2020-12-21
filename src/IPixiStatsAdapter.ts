export interface IPixiStatsAdapter {
    dom: HTMLDivElement;
    showPanel(value: number): void;
    begin(): void;
    end(): number;
    update(): void;
    addPanel(panel: Stats.Panel): Stats.Panel;
}
