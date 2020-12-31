import React from 'react';
import './App.scss';

import Header from './Header';
import FilterSidebar from './FilterSidebar';
import Visualization from './Visualization';
import { Dimmer, Loader } from 'semantic-ui-react';

import { getUserGames, getUser } from '../clients/lichessClient';
import { createDataframe } from '../utils/stats';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'jefnifery',
            options: {
                max: 100,
                perfType: 'blitz',
            },
            filters: {
                userColor: null,
                opening: null,
                outcome: null,
            },
            games: null,
            perf: null,
            isLoading: false,
        };
    }

    handleUsernameChange = (username) => {
        this.setState({
            username,
        });
    };

    handleOptionChange = (option, value) => {
        this.setState({
            options: {
                ...this.state.options,
                [option]: value,
            },
        });
    };

    handleFilterChange = (filter, value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [filter]: value,
            },
        });
    };

    onSearch = async () => {
        this.setState({
            isLoading: true,
        });
        const rawGames = await getUserGames(this.state.username, this.state.options);
        const games = createDataframe(rawGames, this.state.username);
        const user = await getUser(this.state.username);
        this.setState({ games, perf: user.perfs[this.state.options.perfType], isLoading: false });
    };

    render() {
        return (
            <div id="app-scroll-container">
                <div id="app">
                    {this.state.isLoading && (
                        <Dimmer active>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                    )}
                    <Header
                        username={this.state.username}
                        options={this.state.options}
                        handleUsernameChange={this.handleUsernameChange}
                        handleOptionChange={this.handleOptionChange}
                        onSearch={this.onSearch}
                    />
                    <FilterSidebar
                        games={this.state.games}
                        filters={this.state.filters}
                        handleFilterChange={this.handleFilterChange}
                    />
                    <Visualization games={this.state.games} filters={this.state.filters} perf={this.state.perf} />
                </div>
            </div>
        );
    }
}
