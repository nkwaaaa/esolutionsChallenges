const userUrl = "https://jsonplaceholder.typicode.com/users";

async function getUser(forma) {
    try {
        const output = await forma();
        console.log(output);
    } catch (error) {
        console.log(`Ha ocurrido un error: ${error}}`);
    }
}

async function getAlbums(id, forma) {
    try {
        const output = await forma(id);
        console.log(output);
    } catch (error) {
        console.log(`Ha ocurrido un error: ${error}}`);
    }
}
