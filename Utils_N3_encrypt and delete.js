var fs = require('fs');
var stream = require('stream')
var crypto = require('crypto')
const util = require('util')

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
const iv = Buffer.alloc(16, 0);

const {F_OK} = fs.constants

//Function that creates the archivo.txt file; 
//if the function is commented out, the scipt should just log 'file not found'
fs.appendFile('archivo.txt', 'This is the text to encode', function (err) {
    if (err) throw err;
});



//Function creating the Buffer to be encoded HEX or base64
const readingFunction = async (file) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, 'utf8', (err,data)=>{
            if (err) {
                reject("file not found") 
                return
            }
            resolve(Buffer.from(data, 'utf8'))
            //console.log(data)
        })
    })
}

async function encode(file){
    try {
        const data = await readingFunction(file)
        let bufferHex = data.toString('hex')
        fs.appendFile('archivoHEX.txt', bufferHex, (err)=>{if(err) throw err})

        let buff64 = data.toString('base64')
        fs.appendFile('archivo64.txt', buff64, (err)=>{if(err) throw err})

    } catch (err) {console.log(err)}
}


async function encrypt(){
    try{
        await encode('archivo.txt')
        const textHEX = await readingFunction('archivoHEX.txt')
        const text64 = await readingFunction('archivo64.txt')
        
        crypto.scrypt(password, 'salt', 24, (err, key) => {
            if (err) throw err;
                      
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            
            let encryptedHEX = '';
            cipher.setEncoding('hex');
            
            cipher.on('data', (chunk) => encryptedHEX += chunk);
            cipher.on('end', () => {
                fs.appendFile('archivoHEXenc.txt', encryptedHEX, function (err) {
                    if (err) throw err;
                });
                
            });
            
            cipher.write(textHEX);
            cipher.end();
        });
        
        crypto.scrypt(password, 'salt', 24, (err, key) => {
            if (err) throw err;
            
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            
            let encrypted64 = '';
            cipher.setEncoding('base64');
            
            cipher.on('data', (chunk) => encrypted64 += chunk);
            cipher.on('end', () => {
                fs.appendFile('archivo64enc.txt', encrypted64, function (err) {
                    if (err) throw err;
                });
                
            });
            
            cipher.write(text64);
            cipher.end();
        });
    } catch (err){console.log(err)}
}


async function deleteAll(){
    try{
        await encrypt()
        fs.unlink('archivo.txt', (err)=>{if (err) throw err})
        fs.unlink('archivoHEX.txt', (err)=>{if (err) throw err})
        fs.unlink('archivo64.txt', (err)=>{if (err) throw err})
    } catch(err){console.log(err)}
}
deleteAll()
//encrypt()
