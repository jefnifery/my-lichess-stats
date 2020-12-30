import React from 'react';
import './Visualization.scss';

import GamesTable from './visualizations/GamesTable';

export default class Visualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
        };
    }

    renderVisualizations = () => {
        const filteredGames = this.props.games.filter((game) => {
            return Object.keys(this.props.filters).every((filterKey) => {
                return !this.props.filters[filterKey] || game.get(filterKey) === this.props.filters[filterKey];
            });
        });

        return <GamesTable games={filteredGames} />;
    };

    renderNoGamesFound = () => {
        return <div>No games found</div>;
    };

    render() {
        return (
            <div id="visualization">{this.props.games ? this.renderVisualizations() : this.renderNoGamesFound()}</div>
        );
    }
}
