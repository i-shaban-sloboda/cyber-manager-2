import { Nullable } from '../utils/types'
import { Socket, io } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export class SocketIOController {
    private socket: Nullable<Socket<DefaultEventsMap, any>> = null

    public connect = (gameId: string) => {
        if (this.socket) {
            return
        }
        console.log(`>> start connection to socket`, gameId)

        this.socket = io(process.env.NEXTAUTH_URL!, {
            path: '/api/socketio',
        })

        this.socket.on('connect', () => {
            console.log(`   connected to socket`, gameId)
            this.socket!.emit('hello')
        })

        this.socket.on('hello', (data) => {
            console.log('   hello', data)
        })

        this.socket.on('a user connected', (event) => {
            console.log('   a user connected', event)
        })

        this.socket.on('disconnect', (event) => {
            console.log('   disconnect', gameId, 'reason:', event)
        })
    }

    public disconnect = () => {
        console.log(`>> disconnect from socket`)
        if (!this.socket) {
            return
        }

        this.socket.disconnect()
        this.socket = null
    }
}
