import { userJoined, userLeave } from '../models/game'
import { isServer } from '../scope'
import { Nullable } from '../types'
import { SocketEvent } from '../utils/sockets'
import { User } from '@prisma/client'
import { Socket, io } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export class SocketIOController {
    private socket: Nullable<Socket<DefaultEventsMap, any>> = null

    public connect = (userId: string, userName: string, gameId: string) => {
        if (isServer) {
            throw Error(`'It shouldn't be execute at server side!`)
        }

        if (this.socket) {
            return
        }
        console.log(`>> client command: start connection to socket`, gameId)

        this.socket = io(process.env.NEXTAUTH_URL!, {
            path: '/api/socketio',
            query: {
                gameId,
                userId,
                userName,
            },
        })

        this.socket.on('connect', () => {
            console.log(`   client: connected to socket`, gameId)
            this.socket!.emit(SocketEvent.MESSAGE)
        })

        this.socket.on(SocketEvent.MESSAGE, (data) => {
            console.log('   client: MESSAGE', data)
        })

        this.socket.on(SocketEvent.USER_CONNECTED, (user: User) => {
            userJoined(user)
            console.log('   client: a user connected', user)
        })

        this.socket.on(SocketEvent.USER_DISCONNECTED, (userId: string) => {
            userLeave(userId)
            console.log('   client: a user disconnected', userId)
        })

        this.socket.on('disconnect', (event) => {
            console.log('   client: disconnect', gameId, 'reason:', event)
        })
    }

    public disconnect = () => {
        if (isServer) {
            throw Error(`'It shouldn't be execute at server side!`)
        }

        console.log(`>> client command: disconnect from socket`)
        if (!this.socket) {
            return
        }

        this.socket.disconnect()
        this.socket = null
    }
}
