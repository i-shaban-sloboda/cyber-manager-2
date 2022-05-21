import { isServer } from '../scope'
import { Nullable } from '../types'
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
        console.log(`>> client: start connection to socket`, gameId)

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
            this.socket!.emit('hello')
        })

        this.socket.on('hello', (data) => {
            console.log('   client: hello', data)
        })

        this.socket.on('a user connected', (event) => {
            console.log('   client: a user connected', event)
        })

        this.socket.on('a user disconnected', (event) => {
            console.log('   client: a user disconnected', event)
        })

        this.socket.on('disconnect', (event) => {
            console.log('   client: disconnect', gameId, 'reason:', event)
        })
    }

    public disconnect = () => {
        if (isServer) {
            throw Error(`'It shouldn't be execute at server side!`)
        }

        console.log(`>> client: disconnect from socket`)
        if (!this.socket) {
            return
        }

        this.socket.disconnect()
        this.socket = null
    }
}
