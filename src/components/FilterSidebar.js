import React from 'react';
import './FilterSidebar.scss';

import { Menu, Dropdown } from 'semantic-ui-react';
import { FILTER_OPTIONS } from '../constants';

export default class FilterSidebar extends React.Component {
    render() {
        const openings = this.props.games ? this.props.games.unique('opening').toArray() : [];
        const openingOptions = openings.map(([opening]) => {
            return { key: opening, text: opening, value: opening };
        });
        openingOptions.unshift({ key: 'any', text: 'Any opening', value: null });

        return (
            <Menu id="filter-sidebar">
                <Dropdown
                    className="filter-item"
                    value={this.props.filters.userColor}
                    options={FILTER_OPTIONS.SIDE}
                    placeholder="Either side"
                    item
                    onChange={(e, { value }) => this.props.handleFilterChange('userColor', value)}
                />
                <Dropdown
                    className="filter-item"
                    value={this.props.filters.opening}
                    options={openingOptions}
                    placeholder="Any opening"
                    scrolling
                    search
                    item
                    onChange={(e, { value }) => this.props.handleFilterChange('opening', value)}
                />
                <Dropdown
                    className="filter-item"
                    value={this.props.filters.outcome}
                    options={FILTER_OPTIONS.OUTCOME}
                    placeholder="Any outcome"
                    item
                    onChange={(e, { value }) => this.props.handleFilterChange('outcome', value)}
                />
            </Menu>
        );
    }
}
