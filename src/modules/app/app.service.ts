import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService implements OnModuleInit {
    public async onModuleInit(): Promise<void> {
        //init
    }
}