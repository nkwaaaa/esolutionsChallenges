const http = require("http");
const host = "localhost";
const port = 8000;

class Usuario {
    constructor(id, firstName, lastName, age, country) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.country = country;
    }
}

const usuarios = [
    new Usuario(1, "José Raul", "Capablanca", 47, "Cuba"),
    new Usuario(2, "Garry ", "Kaspárov", 59, "Rusia"),
    new Usuario(3, "Vladímir ", "Krámnik ", 47, "Rusia"),
    new Usuario(4, "Anatoli ", "Kárpov ", 71, "Rusia"),
    new Usuario(5, "Bobby ", "Fischer", 64, "Estados Unidos"),
];

const jsonUsers = JSON.stringify(usuarios);

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/usuarios":
            res.writeHead(200);
            res.end(jsonUsers);
            break;
        default:
            res.writeHead(404);
            res.end(
                JSON.stringify({
                    statusCode: 404,
                    message: "Runtime error 404",
                })
            );
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`El servidor se esta ejecutando en http://${host}:${port}`);
});
