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

//Forma1 utilizando async await
async function forma1() {
    if (arguments.length === 0) {
        try {
            const promise = await fetch(userUrl);
            const users = await promise.json();
            return userDestructuring(users);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}}`);
        }
    } else if (arguments.length === 1) {
        try {
            const albumUrl = `https://jsonplaceholder.typicode.com/users/${arguments[0]}/albums`;
            const albumPromise = await fetch(albumUrl);
            const userAlbum = await albumPromise.json();
            return userAlbum;
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}}`);
        }
    }
}

//Forma2 utilizando promise
function forma2() {
    if (arguments.length === 0) {
        const userUrl = "https://jsonplaceholder.typicode.com/users";
        const userPromise = fetch(userUrl);
        return new Promise((resolve, reject) => {
            resolve(
                userPromise
                    .then((fetchUser) => {
                        return fetchUser.json();
                    })
                    .then((userJson) => {
                        return userDestructuring(userJson);
                    })
                    .then((userArray) => {
                        return userArray;
                    })
            );
            reject("Ha ocurrido un error");
        });
    } else if (arguments.length === 1) {
        const albumUrl = `https://jsonplaceholder.typicode.com/users/${arguments[0]}/albums`;
        const albumPromise = fetch(albumUrl);
        return new Promise((resolve, reject) => {
            resolve(
                albumPromise
                    .then((fetchAlbum) => {
                        return fetchAlbum.json();
                    })
                    .then((userAlbum) => {
                        return userAlbum;
                    })
            );
            reject("Ha ocurrido un error");
        });
    }
}

const userDestructuring = (users) => {
    let array = [];
    for (userObj of users) {
        const {
            id,
            name,
            username,
            email,
            address: {
                street,
                suite,
                city,
                geo: { lng },
            },
            website,
            company: { name: companyName, catchPhrase, bs },
        } = userObj;

        const newUser = {
            id,
            name,
            username,
            email,
            address: {
                street,
                suite,
                city,
                geo: {
                    lng,
                },
            },
            website,
            company: {
                companyName,
                catchPhrase,
                bs,
            },
        };
        array.push(newUser);
    }
    return array;
};
