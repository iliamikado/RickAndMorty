const url = 'https://rickandmortyapi.com/api/'

async function getResources(path) {
    return await fetch(url + path).then(data => {
        return data.json()
    });
}

export function getLocation(id) {
    return getResources('location/' + id);
}

const locationCharacters = {};
export async function getLocationsNames() {
    let res = await getResources('location');
    let locs = [];
    const promises = [];
    for (let i = 1; i <= res.info.pages; ++i) {
        promises.push(getResources('location?page=' + i).then(data => {
            data.results.forEach((loc) => {
                locationCharacters[loc.id] = loc.residents.map(url => url.split('/').at(-1));
            });
            locs = [...locs, ...data.results.map(({name, id}) => ({name, id}))];
        }));
    }
    await Promise.all(promises);
    return locs;
}

const amount = 20;
async function getFilteredCharactersWithOrigin(filters, page) {
    const characters = locationCharacters[filters.origin];
    const result = {result: []};
    let ind = page - 1;
    while (result.result.length <= amount && ind < characters.length) {
        const char = await getResources('character/' + characters[ind]);
        if (checkCharacter(char, filters)) {
            result.result.push(char);
        }
        ind++;
    }
    if (result.result.length > amount) {
        result.nextPage = ind;
        result.result.pop();
    }

    await Promise.all(result.result.map((item) => {
        return fetch(item.episode.at(-1))
            .then((data) => (data.json()))
            .then((data) => {
                return data.name;
            })
            .then((name) => {item.lastEpisode = name});
    }));
    
    return result;
}

function checkCharacter(char, filters) {
    return !Object.keys(filters).some((key) => {
        if (key === 'gender') {
            if (filters[key] === 'all') {
                return false;
            }
            return char[key].toLowerCase() !== filters[key];
        }
        if (key === 'name') {
            return char[key].toLowerCase().indexOf(filters[key].toLowerCase()) === -1;
        }

        return false;
    })
}

export async function getFilteredCharacters(filters, page=1) {
    if (filters.origin != -1) {
        return getFilteredCharactersWithOrigin(filters, page);
    }
    let query = '?';
    Object.keys(filters).forEach((key) => {
        if (key === 'gender' && filters[key] === 'all') {
            return;
        }
        query += key + '=' + filters[key] + '&';
    });
    const ans = (await getResources('character/' + query + 'page=' + page));
    if (ans.error) {
        return {result: [], nextPage: null};
    }
    const result = {
        result: ans.results
    }
    if (ans.info.next) {
        const p = ans.info.next.match(/page=\d+/)[0].slice(5);
        result.nextPage = p;
    }

    await Promise.all(result.result.map((item) => {
        return fetch(item.episode.at(-1))
            .then((data) => (data.json()))
            .then((data) => {
                return data.name;
            })
            .then((name) => {item.lastEpisode = name});
    }));

    return result;
}


