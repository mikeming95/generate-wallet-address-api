import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService implements OnModuleInit {
    private readonly _configService = new ConfigService();

    public async onModuleInit(): Promise<void> {
        //init
        
    }
}