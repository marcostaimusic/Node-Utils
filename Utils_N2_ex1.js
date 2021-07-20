const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip()
const cp = require('child_process')
var child = cp.fork(__dirname + '/childProcess');

const file = 'archivo.txt';
const {F_OK} = fs.constants



fs.access(file, F_OK, (err) => {
    if (err) {
        console.log(`${file} does not exist`)
    } else {
        const input = fs.createReadStream('archivo.txt')
        //const output = fs.createWriteStream('archivo.gz')
        input.pipe(gzip).pipe(fs.createWriteStream('archivo.gz'))

    }
  });


// cp.exec('dir c:\\users', (err, stdout)=>{
//      console.log(stdout);
// })


child.on('message', function(home) {
    // Receive results from child process
    console.log(home);
  });


child.send('');

