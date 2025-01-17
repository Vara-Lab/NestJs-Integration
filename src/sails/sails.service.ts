import { Injectable, OnApplicationBootstrap  } from '@nestjs/common';
import { Sails, ZERO_ADDRESS } from 'sails-js';
import { GearApi, GearKeyring, HexString } from '@gear-js/api';
import { SailsIdlParser } from "sails-js-parser";
import { KeyringPair } from '@polkadot/keyring/types';

export const NETWORK: string = 'wss://testnet.vara.network'
export const WALLET_NAME: string = 'admindavid';
export const WALLET_MNEMONIC: string = 'strong orchard plastic arena pyramid lobster lonely rich stomach label clog rubber';
export const CONTRACT_ID: HexString = '0x8393c73acc8590f067937d33b1e6f548d183c1a3a4ed62bf424f779163c5d6b8';
export const IDL: string = `
    type TrafficLightEvent = enum {
        Green,
        Yellow,
        Red,
    };

    type IoTrafficLightState = struct {
        current_light: str,
        all_users: vec struct { actor_id, str },
    };

    constructor {
        New : ();
    };

    service TrafficLight {
        Green : () -> TrafficLightEvent;
        Red : () -> TrafficLightEvent;
        Yellow : () -> TrafficLightEvent;
        query TrafficLight : () -> IoTrafficLightState;
    };
`;

@Injectable()
export class SailsService implements OnApplicationBootstrap  {
    private gearApi: GearApi;
    private sails: Sails;
    private signer: KeyringPair

    async onApplicationBootstrap() {
        const parser = await SailsIdlParser.new();
        this.gearApi = await GearApi.create({
            providerAddress: NETWORK
        });
        this.sails = new Sails(parser);

        this.sails.setApi(this.gearApi);
        this.sails.setProgramId(CONTRACT_ID);
        this.sails.parseIdl(IDL);

        this.signer = await GearKeyring.fromMnemonic(
            WALLET_MNEMONIC, 
            WALLET_NAME
        );
    }

    async trafficLightCommand(command: string) {
        const transaction = await this.sails
            .services
            .TrafficLight
            .functions[command]();

        transaction.withAccount(this.signer);
        await transaction.calculateGas();

        const {response, blockHash, txHash, msgId} = await transaction.signAndSend();

        const contractResponse = await response();

        return contractResponse;
    }

    async trafficLightState() {
        const response = await this.sails
            .services
            .TrafficLight
            .queries
            .TrafficLight(ZERO_ADDRESS);

        console.log(response);

        return response;
    }
}
