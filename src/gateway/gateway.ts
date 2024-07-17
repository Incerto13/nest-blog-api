import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, 
    SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'


@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer()
    server: Server

    handleConnection(client: Socket, ...args: any[]) {
        console.log('Client connected:', client.id);
      }
    
      handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
      }

    @SubscribeMessage('newMessage') // subscribe to incoming messages from users
    onNewMessage(@MessageBody() body: any) {
        console.log(body)
        this.server.emit('onMessage', {
            msg: 'New Message',
            content: body,
        })
    }

    onNewBlogPost(@MessageBody() body: any) {
        this.emitMessage('onBlogPost', {
            msg: 'New Blog Post',
            content: body,
        })
    }

    onNewComment(@MessageBody() body: any) {
        this.emitMessage('onComment', {
            msg: 'New Comment',
            content: body,
        })
    }

    emitMessage(event: string, message: any) {
        console.log({
            event,
            message,
        })
        this.server.emit(event, message);
    }

}