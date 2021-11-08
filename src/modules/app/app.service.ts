import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
    /**
     *  Init module
     */
    public async onModuleInit(): Promise<void> {
        //init
    }
}