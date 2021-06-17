const fs = require('fs');

const readingFunction = (file) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, 'utf8', (err,data)=>{
            if (err) {
                reject("file not found") 
                return
            }
            resolve(data)
        })
    })
}

readingFunction('archivo.txt')
    .then(data => console.log(data))
    .catch(err => console.log(err))