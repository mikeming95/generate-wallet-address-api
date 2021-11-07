export class DemoPageDto {
    /**
     * @param {string} publicKey
     */
    readonly publicKey: string;
    constructor(publicKey: string) {
      this.publicKey = publicKey;
    }
  }