type GLTexture = {
    texture: WebGLTexture;
};

type ManagedTexture = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _glTextures: GLTexture[];
};

export class TextureStats {
    private _gl: WebGLRenderingContext;
    private _originGLCreateTexture: () => WebGLTexture | null;
    private _originGLDeleteTexture: (texture: WebGLTexture | null) => void;
    private _maxTexturesCount = 0;
    private _createdTextures: WebGLTexture[] = [];

    public constructor(gl: WebGLRenderingContext, managedTextures: unknown[]) {
        this._gl = gl;
        this._originGLCreateTexture = gl.createTexture;
        this._originGLDeleteTexture = gl.deleteTexture;
        gl.createTexture = this._patchGLCreateTexture.bind(this);
        gl.deleteTexture = this._patchGLDeleteTexture.bind(this);
        console.log('[pixi-stats] Texture was patched!');
        this._collectUsedTextures(managedTextures as ManagedTexture[]);
    }

    public get currentTextureCount(): number {
        return this._createdTextures.length;
    }

    public get maxTexturesCount(): number {
        return this._maxTexturesCount;
    }

    public reset(): void {
        this._createdTextures.length = 0;
        this._maxTexturesCount = 0;
    }

    private _registerTexture(texture: WebGLTexture): void {
        this._createdTextures.push(texture);
        this._maxTexturesCount = Math.max(this._createdTextures.length, this._maxTexturesCount);
    }

    private _collectUsedTextures(managedTextures: ManagedTexture[]): void {
        managedTextures.forEach((txr) => {
            const glTextures: GLTexture[] = txr._glTextures;
            glTextures.forEach((glTexture) => {
                this._registerTexture(glTexture.texture);
            });
        });
        console.log('[pixi-stats] Collect used textures:', this._createdTextures.length);
    }

    private _patchGLCreateTexture(): WebGLTexture {
        const texture = this._originGLCreateTexture.call(this._gl);
        this._registerTexture(texture);
        return texture;
    }

    private _patchGLDeleteTexture(texture: WebGLTexture): void {
        const index: number = this._createdTextures.indexOf(texture);
        if (index > -1) {
            this._createdTextures.splice(index, 1);
        }

        this._originGLDeleteTexture.call(this._gl, texture);
    }
}
