export class GLStats {
    private _gl: WebGLRenderingContext;
    private _drawPasses = 0;
    private _originGLDrawElements: (mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr) => void;

    public constructor(gl: WebGLRenderingContext) {
        this._gl = gl;
        this._originGLDrawElements = gl.drawElements;
        gl.drawElements = this._patchGLDrawElements.bind(this);
        console.log('[pixi-stats] GL was patched!');
    }

    public get drawPasses(): number {
        return this._drawPasses;
    }

    public reset(): void {
        this._drawPasses = 0;
    }

    private _patchGLDrawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void {
        this._drawPasses++;
        this._originGLDrawElements.call(this._gl, mode, count, type, offset);
    }
}
