import { ValidatorService } from './validator.service'

describe('ValidatorService', () => {

    describe('isInvaildMnemonic', () => {
        it('should return true when received an invaild mnemonic', async () => {
          const invaildMnemonic = "a b c d e f";
          expect(ValidatorService.isInvaildMnemonic(invaildMnemonic)).toBe(true);
        });

        it('should return false when received a vaild mnemonic', async () => {
            const vaildMnemonic = "junior keep day sentence defense crawl rabbit front evoke hobby awake fade";
            expect(ValidatorService.isInvaildMnemonic(vaildMnemonic)).toBe(false);
        });
    });


    describe('isInvaildPath', () => {
        it('should return true when received an invaild path', async () => {
            const invaildPath = "abcd";
            expect(ValidatorService.isInvaildPath(invaildPath)).toBe(true);
        });

        it('should return false when received a vaild path', async () => {
            const vaildMnemonic = "m/49'/0'/0'/1";
            expect(ValidatorService.isInvaildPath(vaildMnemonic)).toBe(false);
        });
    });

});