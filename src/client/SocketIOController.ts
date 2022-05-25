import { userJoined, userLeave } from '../models/game'
import { getClientScope, isServer, logClient } from '../scope'
import { Nullable } from '../types'
import { SocketEvent } from '../utils/sockets'
import { User } from '@prisma/client'
import { scopeBind } from 'effector'
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
        logClient(`command: start connection to socket`, gameId)

        const scope = getClientScope()!
        const userJoinedBound = scopeBind(userJoined, { scope })
        const userLeaveBound = scopeBind(userLeave, { scope })

        this.socket = io(process.env.NEXTAUTH_URL!, {
            path: '/api/socketio',
            query: {
                gameId,
                userId,
                userName,
            },
        })

        this.socket.on('connect', () => {
            logClient(`connected to socket`, gameId)
            // this.socket!.emit(SocketEvent.MESSAGE)
        })

        this.socket.on(SocketEvent.MESSAGE, (data) => {
            // logClient('   client: MESSAGE', data)
        })

        this.socket.on(SocketEvent.USER_CONNECTED, (user: User) => {
            logClient('a user connected', user)
            userJoinedBound(user)
        })

        this.socket.on(SocketEvent.USER_DISCONNECTED, (userId: string) => {
            logClient('a user disconnected', userId)
            userLeaveBound(userId)
        })

        this.socket.on('disconnect', (event) => {
            logClient('disconnect', gameId, 'reason:', event)
        })
    }

    public disconnect = () => {
        if (isServer) {
            throw Error(`'It shouldn't be execute at server side!`)
        }

        logClient(`command: disconnect from socket`)
        if (!this.socket) {
            return
        }

        this.socket.disconnect()
        this.socket = null
    }
}
