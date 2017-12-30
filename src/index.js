import { spawn } from 'child_process';

console.log(`Read to go`)
let ffmepg = spawn('ffmpeg', [
    '-f', 'mpegts',
    '-i', 'udp://127.0.0.1:12345',
    '-codec', 'copy',
    '-f', 'mpegts',
    'udp://127.0.0.1:12346'
])

ffmepg.on('error', error => {
    console.log(`ffmpeg error -->`, error)
})

ffmepg.on('exit', code => {
    console.log(`Got exit code:`, code)
    ffmepg = spawn('ffmpeg', [
        '-f', 'mpegts',
        '-i', 'udp://127.0.0.1:12345',
        '-codec', 'copy',
        '-f', 'mpegts',
        'udp://127.0.0.1:12346'
    ])
})

ffmepg.stdout.on('data', data => {
    console.log(`Data: `, data)
})