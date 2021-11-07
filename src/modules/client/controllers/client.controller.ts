import { Get, Controller, Render } from '@nestjs/common';
import { ClientService } from 'modules/client/services'
import { DemoPageDto } from 'modules/client/dtos'

@Controller()
export class ClientController {

    /**
     * Constructor to address controller
     * @param {ClientService} _clientService 
     */
    constructor(
        private readonly _clientService: ClientService,
    ) {}

    @Get('/api_test')
    @Render('index')
    async demoPage(
    ):Promise<DemoPageDto> {        
        return this._clientService.getDemoPage();
    }

}