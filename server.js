const http = require ('http');
const server = http.createServer((req,res)=> {
    res.end('voila la réponse du serveur')
});
setServers.listen(process.env.PORT ||3000);