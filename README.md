# Node-Utils

"Utils_N3_encrypt and delete.js" creates the encrypted version of the sample file, and erases the original, the HEX-encoded and the base64-encoded files.
"Utils_N3_decrypt.js" recreates two originals (one from the HEX-encoded and one from the base64-encoded), and HEX file and a base64 file. The re-created files have "returned" in their names.
To check the files, go to Utils_N3_encrypt.js, comment out the deleteAll() function and uncomment the encrypt() function, and lauch the script. Then, launch the "Utils_N3_encrypt and delete.js" script and check the resulting files if the original matches the "returned" version.

