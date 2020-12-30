import React from 'react';
import './Visualization.scss';

import AggregateStats from './visualizations/AggregateStats';
import GamesTable from './visualizations/GamesTable';
import { Icon, Statistic, Tab } from 'semantic-ui-react';

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
        return (
            <div id="no-games-found">
                <Statistic size="small">
                    <Statistic.Value>No games found!</Statistic.Value>
                    <Statistic.Label>Update your search options and try again.</Statistic.Label>
                </Statistic>
                <div id="chess-piece-divider">
                    <Icon name="chess rook" size="large" />
                    <Icon name="chess knight" size="large" />
                    <Icon name="chess bishop" size="large" />
                    <Icon name="chess king" size="large" />
                    <Icon name="chess queen" size="large" />
                    <Icon name="chess bishop" size="large" />
                    <Icon name="chess knight" size="large" />
                    <Icon name="chess rook" size="large" />
                </div>
            </div>
        );
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
