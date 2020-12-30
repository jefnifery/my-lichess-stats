import DataFrame from 'dataframe-js';

export function createDataframe(games, username) {
    const flattenedGames = flattenGames(games, username);

    const df = new DataFrame(flattenedGames, [
        'id',
        'opening',
        'timestamp',
        'whitePlayer',
        'whiteRating',
        'blackPlayer',
        'blackRating',
        'userColor',
        'oppColor',
        'oppName',
        'userRating',
        'oppRating',
        'ratingDiff',
        'outcome',
    ]);

    return df;
}

function flattenGames(games, username) {
    return games.map((game) => {
        const id = game.id;
        const opening = game.opening ? game.opening.name.split(':')[0] : 'Unknown';
        const timestamp = game.createdAt;

        const whitePlayer = game.players.white.user.name;
        const whiteRating = game.players.white.rating;
        const blackPlayer = game.players.black.user.name;
        const blackRating = game.players.black.rating;

        const userColor = whitePlayer === username ? 'white' : 'black';
        const oppColor = userColor === 'white' ? 'black' : 'white';
        const oppName = oppColor === 'white' ? whitePlayer : blackPlayer;

        const userRating = game.players[userColor].rating;
        const oppRating = game.players[oppColor].rating;
        const ratingDiff = userRating - oppRating;

        const outcome = !game.winner ? 'tie' : game.winner === userColor ? 'won' : 'lost';

        return {
            id,
            opening,
            timestamp,
            whitePlayer,
            blackPlayer,
            whiteRating,
            blackRating,
            userColor,
            oppColor,
            oppName,
            userRating,
            oppRating,
            ratingDiff,
            outcome,
        };
    });
}
