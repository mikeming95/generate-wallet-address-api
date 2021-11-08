import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AddressModule } from '../src/modules/address';
import { INestApplication } from '@nestjs/common';
import { CryptoService } from '../src/utils'

describe('API', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [AddressModule],
        })
          .compile();
        app = moduleRef.createNestApplication();
        await app.init();
    });

    describe('/address/seg-wit', () => {
      it(`post invalid data`, async () => {
        const response = await request(app.getHttpServer()).post('/api/v1/address/seg-wit').send({"data":""});
        expect(response.status).toBe(403);
      });

      it(`post valid data`, async () => {
        const validData = JSON.stringify({"mnemonic":"junior keep day sentence defense crawl rabbit front evoke hobby awake fade","path":"m/49'/0'/0'/1"})
        const response = await request(app.getHttpServer()).post('/api/v1/address/seg-wit').send({"data":CryptoService.RsaEncrypt(validData)});
        expect(response.status).toBe(200)
        expect(response.body.address).toBe('bc1qtcz5xl6q70vgge6axxz32q3l0gs38ws2r32cmj')
      });

      it(`post invalid path`, async () => {
        const invalidData = JSON.stringify({"mnemonic":"junior keep day sentence defense crawl rabbit front evoke hobby awake fade","path":"error"})
        const response = await request(app.getHttpServer()).post('/api/v1/address/seg-wit').send({"data": CryptoService.RsaEncrypt(invalidData)});
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Invalid Path')
      });

      it(`post invalid mnemonic`, async () => {
        const invalidData = JSON.stringify({"mnemonic":"abcd efgh","path":"m/49'/0'/0'/1"})
        const response = await request(app.getHttpServer()).post('/api/v1/address/seg-wit').send({"data": CryptoService.RsaEncrypt(invalidData)});
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Invalid Mnemonic')
      });
    });
   
    describe('/address/multi-sig', () => {
      it(`post valid data`, async () => {
        const validData = JSON.stringify({"addresses":['02799dc04a8acf04e793ff0f2c35c21c0388529eb964c565a455f13c07123c9ea2'],"m":1,"n":1})
        const response = await request(app.getHttpServer()).post('/api/v1/address/multi-sig').send({"data":CryptoService.RsaEncrypt(validData)});
        expect(response.status).toBe(200)
        expect(response.body.address).toBe('3JaRVih9yRUe1MP3t8NyBKH4JyLUnMVukC')
      });

      it(`post invalid data`, async () => {
        const response = await request(app.getHttpServer()).post('/api/v1/address/multi-sig').send({"data":""});
        expect(response.status).toBe(403);
      });

      it(`post invalid m`, async () => {
        const invalidData = JSON.stringify({"addresses":['02799dc04a8acf04e793ff0f2c35c21c0388529eb964c565a455f13c07123c9ea2'],"m":"1","n":1})
        const response = await request(app.getHttpServer()).post('/api/v1/address/multi-sig').send({"data": CryptoService.RsaEncrypt(invalidData)});
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Invalid m/n')
      });

      it(`post invalid n`, async () => {
        const invalidData = JSON.stringify({"addresses":['02799dc04a8acf04e793ff0f2c35c21c0388529eb964c565a455f13c07123c9ea2'],"m":1,"n":"1"})
        const response = await request(app.getHttpServer()).post('/api/v1/address/multi-sig').send({"data": CryptoService.RsaEncrypt(invalidData)});
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Invalid m/n')
      });

      it(`post m > n`, async () => {
        const invalidData = JSON.stringify({"addresses":['02799dc04a8acf04e793ff0f2c35c21c0388529eb964c565a455f13c07123c9ea2'],"m":3,"n":1})
        const response = await request(app.getHttpServer()).post('/api/v1/address/multi-sig').send({"data": CryptoService.RsaEncrypt(invalidData)});
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Invalid m/n')
      });

      it(`post n is not equal to the length of keys`, async () => {
        const invalidData = JSON.stringify({"addresses":['02799dc04a8acf04e793ff0f2c35c21c0388529eb964c565a455f13c07123c9ea2'],"m":1,"n":3})
        const response = await request(app.getHttpServer()).post('/api/v1/address/multi-sig').send({"data": CryptoService.RsaEncrypt(invalidData)});
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('n is not equal to the length of keys')
      });


    });

    afterAll(async () => {
      await app.close();
    });

});