import React from 'react';
import './GamesTable.scss';

import PlayerVersus from '../reusable/PlayerVersus';
import { Menu, Table, Icon, Dropdown, Button } from 'semantic-ui-react';

const GAMES_PER_PAGE = 15;

export default class GamesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            pageNumber,
        });
    };

    renderHeader = () => {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Players</Table.HeaderCell>
                    <Table.HeaderCell>Outcome</Table.HeaderCell>
                    <Table.HeaderCell>Opening played</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Link</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        );
    };

    renderRow = (game) => {
        const { id, opening, timestamp, outcome } = game;

        const date = new Date(timestamp).toDateString();

        return (
            <Table.Row key={id}>
                <Table.Cell className="players-cell">
                    <PlayerVersus game={game} />
                </Table.Cell>
                <Table.Cell className="outcome-cell">
                    <Icon
                        className="trophy-icon"
                        name="winner"
                        color={outcome === 'tie' ? 'grey' : outcome === 'won' ? 'green' : 'red'}
                    />
                    {outcome}
                </Table.Cell>
                <Table.Cell>{opening}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>
                    <Button
                        as="a"
                        href={`https://lichess.org/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon
                        circular
                    >
                        <Icon name="chess knight" />
                        <Icon name="external alternate" />
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    };

    renderPageSelection = (gamesCollection) => {
        const numPages = Math.ceil(gamesCollection.length / GAMES_PER_PAGE);
        const pageDropdownOptions = new Array(numPages).fill(0).map((_, i) => {
            const pageNum = i + 1;
            return { key: pageNum, text: pageNum.toString(), value: pageNum };
        });

        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="10">
                        <Menu floated="right" pagination>
                            <Menu.Item
                                as="a"
                                onClick={() => this.handlePageChange(this.state.pageNumber - 1)}
                                disabled={this.state.pageNumber <= 1}
                                icon
                            >
                                <Icon name="chevron left" />
                            </Menu.Item>
                            <Menu.Item>
                                <Dropdown
                                    value={this.state.pageNumber}
                                    options={pageDropdownOptions}
                                    placeholder={this.state.pageNumber.toString()}
                                    onChange={(e, { value }) => this.handlePageChange(value)}
                                    scrolling
                                />
                            </Menu.Item>
                            <Menu.Item
                                as="a"
                                onClick={() => this.handlePageChange(this.state.pageNumber + 1)}
                                disabled={this.state.pageNumber >= numPages}
                                icon
                            >
                                <Icon name="chevron right" />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        );
    };

    render() {
        const gamesCollection = this.props.filteredGames.toCollection();
        const gamesCollectionPage = gamesCollection.slice(
            (this.state.pageNumber - 1) * GAMES_PER_PAGE,
            this.state.pageNumber * GAMES_PER_PAGE,
        );

        return (
            <Table id="games-table" sortable celled>
                {this.renderHeader()}
                <Table.Body>{gamesCollectionPage.map(this.renderRow)}</Table.Body>
                {this.renderPageSelection(gamesCollection)}
            </Table>
        );
    }
}
