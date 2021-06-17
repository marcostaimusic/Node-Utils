var fs = require('fs');
var stream = require('stream')
var crypto = require('crypto')
const util = require('util')

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
const iv = Buffer.alloc(16, 0);

const {F_OK} = fs.constants


async function decrypt(file) {

    fs.readFile('archivo64enc.txt', 'utf8', function(err, data) {
        if (err) {
            // got error reading the file, call check() again
            check();
        } else {
           

            const text = data
            
         
            console.log(text)
            
            crypto.scrypt(password, 'salt', 24, (err, key) => {
                if (err) throw err;
                
                
                
                const decipher = crypto.createDecipheriv(algorithm, key, iv);
                
                let decrypted = '';
                decipher.on('readable', () => {
                    while (null !== (chunk = decipher.read())) {
                        decrypted += chunk.toString('utf8');
                    }
                });
                decipher.on('end', () => {
                    const buffer = Buffer.from(decrypted, 'base64')
                    
                    fs.appendFile('archivoReturnedFrom64.txt', buffer.toString('utf8'), function (err) {
                        if (err) throw err;
                    });

                    fs.appendFile('archivo64returned.txt', decrypted, function (err) {
                     if (err) throw err;
                 });
                    console.log(decrypted);
                    
                });
                
                
                const encrypted = text
                decipher.write(encrypted, 'base64');
                decipher.end();
            })



            
        }
     });


    
    
        fs.readFile('archivoHEXenc.txt', 'utf8', function(err, data) {
           if (err) {
               // got error reading the file, call check() again
               check();
           } else {
              

               const text = data
               
            
               console.log(text)
               
               crypto.scrypt(password, 'salt', 24, (err, key) => {
                   if (err) throw err;
                   
                   
                   
                   const decipher = crypto.createDecipheriv(algorithm, key, iv);
                   
                   let decrypted = '';
                   decipher.on('readable', () => {
                       while (null !== (chunk = decipher.read())) {
                           decrypted += chunk.toString('utf8');
                       }
                   });
                   decipher.on('end', () => {
                       const buffer = Buffer.from(decrypted, 'hex')
                       
                       fs.appendFile('archivoReturnedFromHEX.txt', buffer.toString('utf8'), function (err) {
                           if (err) throw err;
                       });

                       fs.appendFile('archivoHEXreturned.txt', decrypted, function (err) {
                        if (err) throw err;
                    });
                       console.log(decrypted);
                       
                   });
                   
                   
                   const encrypted = text
                   decipher.write(encrypted, 'hex');
                   decipher.end();
               })



               
           }
        });
    
} 


decrypt()
