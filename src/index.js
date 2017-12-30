import { spawn } from 'child_process';

let ffmepg = null
const initFFmpeg = () => {
    ffmepg = spawn('ffmpeg', [
        '-f', 'mpegts',
        '-i', 'udp://127.0.0.1:12345',
        '-codec', 'copy',
        '-f', 'mpegts',
        'udp://127.0.0.1:12346',
        '-vcodec','copy',
        '-an',
        '-f', 'rtp',
        'rtp://127.0.0.1:12347'
    ])

    ffmepg.on('error', error => {
        console.log(`ffmpeg error -->`, error)
    })
    
    ffmepg.on('exit', code => {
        initFFmpeg()
    })
    
    ffmepg.stdout.on('data', data => {
        console.log(`Data: `, data)
    })
}


initFFmpeg()