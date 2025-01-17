import { Controller, Get, Post } from '@nestjs/common';
import { SailsService } from 'src/sails/sails.service';

@Controller()
export class ContractCallsController {

    constructor(private sailsService: SailsService) {}

    @Post('/green')
    async trafficLightGreen() {
        const response = await this.sailsService
            .trafficLightCommand('Green');
        return JSON.stringify(response);
    }

    @Post('/red')
    async trafficLightRed() {
        const response = await this.sailsService
            .trafficLightCommand('Red');
        return JSON.stringify(response);
    }

    @Post('/yellow')
    async trafficLightYellow() {
        const response = await this.sailsService
            .trafficLightCommand('Yellow');
        return JSON.stringify(response);
    }   

    @Get('/currentlight')
    async trafficLightCurrentLight() {
        const state = await this.sailsService
            .trafficLightState()
        return JSON.stringify(state);
    }
}