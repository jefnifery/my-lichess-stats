import React from 'react';
import './Header.scss';

import { Dropdown, Input } from 'semantic-ui-react';

import { SEARCH_OPTIONS } from '../constants';

export default class Header extends React.Component {
    shouldEnableSearchButton = () => {
        return this.props.username && this.props.options.perfType;
    };

    render() {
        return (
            <div id="header">
                <div id="title">My Lichess Stats</div>
                <div id="search-options">
                    <Dropdown
                        className="search-option"
                        onChange={(e, { value }) => this.props.handleOptionChange('perfType', value)}
                        options={SEARCH_OPTIONS.MODES}
                        placeholder="Select a mode"
                        value={this.props.options.mode}
                    />
                    <Dropdown
                        className="search-option"
                        onChange={(e, { value }) => this.props.handleOptionChange('max', value)}
                        options={SEARCH_OPTIONS.N_GAMES}
                        placeholder="All games (possibly slow)"
                        value={this.props.options.nGames}
                    />
                    <Input
                        className="search-option"
                        onChange={(e, { value }) => this.props.handleUsernameChange(value)}
                        onKeyDown={(e) => e.key === 'Enter' && this.shouldEnableSearchButton() && this.props.onSearch()}
                        action={{
                            color: 'orange',
                            icon: 'search',
                            onClick: this.props.onSearch,
                            disabled: !this.shouldEnableSearchButton(),
                        }}
                        placeholder="Username"
                    />
                </div>
            </div>
        );
    }
}
