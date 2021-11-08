import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class ClientController {
    /**
     * API test website
     */
    @Get('/api_test')
    @Render('index')
    async demoPage(
    ):Promise< any | undefined > {        
        return 
    }

}