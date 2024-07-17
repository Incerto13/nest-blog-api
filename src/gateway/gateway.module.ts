import { Module } from '@nestjs/common'
import { NotificationGateway } from './gateway';


@Module({
    providers: [NotificationGateway]
})
export class GatewayModule{}