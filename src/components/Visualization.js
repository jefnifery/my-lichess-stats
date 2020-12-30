import React from 'react';
import './Visualization.scss';

import AggregateStats from './visualizations/AggregateStats';
import GamesTable from './visualizations/GamesTable';
import { Tab } from 'semantic-ui-react';

export default class Visualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'gameTable',
            filters: {},
        };
    }

    renderVisualizations = () => {
        const filteredGames = this.props.games.filter((game) => {
            return Object.keys(this.props.filters).every((filterKey) => {
                return !this.props.filters[filterKey] || game.get(filterKey) === this.props.filters[filterKey];
            });
        });

        const panes = [
            {
                menuItem: 'Overall',
                render: () => (
                    <Tab.Pane>
                        <AggregateStats games={this.props.games} filteredGames={filteredGames} />
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'All games',
                render: () => (
                    <Tab.Pane>
                        <GamesTable games={filteredGames} />
                    </Tab.Pane>
                ),
            },
        ];

        return <Tab panes={panes} />;
    };

    renderNoGamesFound = () => {
        return <div>No games found</div>;
    };

    render() {
        return (
            <div id="visualization">
                {this.props.games && this.props.games.dim()[0] > 0
                    ? this.renderVisualizations()
                    : this.renderNoGamesFound()}
            </div>
        );
    }
}
