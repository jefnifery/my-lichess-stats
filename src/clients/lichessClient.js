import queryString from 'query-string';

const LICHESS_PREFIX = 'https://lichess.org/api';

export async function getUserGames(username, options = {}) {
    options = {
        ...options,
        pgnInJson: true,
        rated: true,
        moves: false,
        opening: true,
        tags: false,
    };
    const qs = queryString.stringify(options);
    const res = await fetch(`${LICHESS_PREFIX}/games/user/${username}?${qs}`, {
        headers: {
            Accept: 'application/x-ndjson',
        },
    });

    const text = await res.text();

    if (!text) {
        return [];
    }

    return text.match(/.+/g).map(JSON.parse);
}

export async function getUser(username) {
    const res = await fetch(`${LICHESS_PREFIX}/user/${username}`, {
        headers: {
            Accept: 'application/json',
        },
    });

    if (res.status !== 200) {
        return null;
    }

    return res.json();
}
