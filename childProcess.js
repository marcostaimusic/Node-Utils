const os = require('os');
const fs = require('fs');

process.on('message', function(home) {
    // Pass results back to parent process
    home = fs.readdirSync(os.homedir()) 
    process.send(home);//
    process.exit()
  });

