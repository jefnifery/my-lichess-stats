export const SEARCH_OPTIONS = {
    MODES: [
        { key: 'any', text: 'Any mode', value: null },
        { key: 'bullet', text: 'Bullet', value: 'bullet' },
        { key: 'blitz', text: 'Blitz', value: 'blitz' },
        { key: 'rapid', text: 'Rapid', value: 'rapid' },
        { key: 'classical', text: 'Classical', value: 'classical' },
    ],
    N_GAMES: [
        { key: 'All', text: 'All games (possibly slow)', value: null },
        { key: '100', text: 'Last 100', value: 100 },
        { key: '250', text: 'Last 250', value: 250 },
        { key: '500', text: 'Last 500', value: 500 },
        { key: '1000', text: 'Last 1000', value: 1000 },
    ],
};

export const FILTER_OPTIONS = {
    SIDE: [
        { key: 'either', text: 'Either color', value: null },
        { key: 'white', text: 'White', value: 'white' },
        { key: 'black', text: 'Black', value: 'black' },
    ],
    OUTCOME: [
        { key: 'any', text: 'Any outcome', value: null },
        { key: 'won', text: 'Won', value: 'won' },
        { key: 'lost', text: 'Lost', value: 'lost' },
        { key: 'tie', text: 'Tied', value: 'tie' },
    ],
};
