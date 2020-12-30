import React from 'react';
import './AggregateStats.scss';

import { Grid, Statistic, Header, Icon, Divider } from 'semantic-ui-react';

import classNames from 'classnames';

export default class AggregateStats extends React.Component {
    renderSimpleStatisticColumn = (value, label, statisticProps = {}, key) => {
        return (
            <Grid.Column className={classNames('stat-column', statisticProps.size)} key={key}>
                <Statistic color="grey" {...statisticProps}>
                    <Statistic.Value>{value}</Statistic.Value>
                    <Statistic.Label>{label}</Statistic.Label>
                </Statistic>
            </Grid.Column>
        );
    };

    renderWinExtremeStatistic = (winExtreme, extremeType) => {
        let value = `${extremeType} is unknown `;
        let label = 'Try updating your filters';

        if (winExtreme) {
            const date = new Date(winExtreme.timestamp);

            value = `${winExtreme.outcome === 'won' ? 'Win' : 'Loss'} versus ${winExtreme.oppRating}`;
            label = `
                Your 
                ${winExtreme.outcome === 'won' ? 'best win' : 'worst loss'} 
                was against 
                ${winExtreme.oppName}
                on
                ${date.toLocaleDateString()}
            `;
        }

        return (
            <Grid.Column className="stat-column">
                <Statistic color="grey" size="tiny">
                    <Statistic.Value>{value}</Statistic.Value>
                    {winExtreme ? (
                        <Statistic.Label
                            as="a"
                            href={`https://lichess.org/${winExtreme.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {label}&nbsp;
                            <Icon name="external alternate" />
                        </Statistic.Label>
                    ) : (
                        <Statistic.Label>{label}</Statistic.Label>
                    )}
                </Statistic>
            </Grid.Column>
        );
    };

    renderGameOutcomesSection = () => {
        const total = this.props.filteredGames.count();
        const won = this.props.filteredGames.countValue('won', 'outcome');
        const lost = this.props.filteredGames.countValue('lost', 'outcome');
        const tied = this.props.filteredGames.countValue('tie', 'outcome');
        const winPct = `${Math.round((won / total) * 100)}%`;
        const losePct = `${Math.round((lost / total) * 100)}%`;

        return (
            <React.Fragment>
                <Grid.Row className="header-row">
                    <Header as="h2" icon>
                        <Icon name="winner" circular />
                        Game Outcomes
                        <Header.Subheader>Your wins, losses, and in betweens.</Header.Subheader>
                    </Header>
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderSimpleStatisticColumn(total, 'total games', { size: 'large' })}
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderSimpleStatisticColumn(won, 'wins')}
                    {this.renderSimpleStatisticColumn(tied, 'ties')}
                    {this.renderSimpleStatisticColumn(lost, 'losses')}
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderSimpleStatisticColumn(winPct, 'win percentage')}
                    {this.renderSimpleStatisticColumn(losePct, 'loss percentage')}
                </Grid.Row>
            </React.Fragment>
        );
    };

    renderRatingsSection = () => {
        const avgRating = Math.round(this.props.games.stat.average('userRating'));
        const maxRating = this.props.games.stat.max('userRating');
        const minRating = this.props.games.stat.min('userRating');

        const filteredGamesCollection = this.props.filteredGames.toCollection();
        const winExtremes = filteredGamesCollection.reduce((acc, game) => {
            if (game.outcome === 'won' && (!acc.bestWin || game.oppRating > acc.bestWin.oppRating)) {
                acc.bestWin = game;
            }
            if (game.outcome === 'lost' && (!acc.worstLoss || game.oppRating < acc.worstLoss.oppRating)) {
                acc.worstLoss = game;
            }
            return acc;
        }, {});

        return (
            <React.Fragment>
                <Grid.Row className="header-row">
                    <Header as="h2" icon>
                        <Icon name="area graph" circular />
                        Ratings
                        <Header.Subheader>You versus your opponnents ratings.</Header.Subheader>
                    </Header>
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderSimpleStatisticColumn(maxRating, 'peak', { size: 'tiny' })}
                    {this.renderSimpleStatisticColumn(avgRating, 'your average rating')}
                    {this.renderSimpleStatisticColumn(minRating, 'slump', { size: 'tiny' })}
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderWinExtremeStatistic(winExtremes.bestWin, 'Best win')}
                    {this.renderWinExtremeStatistic(winExtremes.worstLoss, 'Worst loss')}
                </Grid.Row>
            </React.Fragment>
        );
    };

    renderTopOpeningsSection = () => {
        const topOpenings = this.props.filteredGames
            .groupBy('opening')
            .aggregate((group) => group.count())
            .rename('aggregation', 'openingCount')
            .sortBy('openingCount', true)
            .head(3)
            .toCollection()
            .map((topOpening) => {
                const openingsDf = this.props.filteredGames.filter((game) => {
                    return game.get('opening') === topOpening.opening;
                });
                const wins = openingsDf.countValue('won', 'outcome');
                const losses = openingsDf.countValue('lost', 'outcome');
                const winPct = Math.round((wins / topOpening.openingCount) * 100);
                return {
                    ...topOpening,
                    wins,
                    losses,
                    'win percentage': winPct,
                };
            });

        return (
            <React.Fragment>
                <Grid.Row className="header-row">
                    <Header as="h2" icon>
                        <Icon name="chess" circular />
                        Top Openings
                        <Header.Subheader>What you play and how well you play it.</Header.Subheader>
                    </Header>
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {topOpenings.map((opening, i) => {
                        return this.renderSimpleStatisticColumn(
                            opening.opening,
                            `Played ${opening.openingCount} times`,
                            {
                                size: 'tiny',
                            },
                            i,
                        );
                    })}
                </Grid.Row>
                {['wins', 'losses', 'win percentage'].map((key, i) => {
                    return (
                        <Grid.Row className="stat-row" key={i}>
                            {topOpenings.map((opening, i) => {
                                return this.renderSimpleStatisticColumn(
                                    opening[key],
                                    key,
                                    {
                                        size: 'tiny',
                                    },
                                    i,
                                );
                            })}
                        </Grid.Row>
                    );
                })}
            </React.Fragment>
        );
    };

    render() {
        return (
            <Grid id="aggregate-stats-grid" columns="equal" centered>
                {this.renderGameOutcomesSection()}
                <Divider />
                {this.renderRatingsSection()}
                <Divider />
                {this.renderTopOpeningsSection()}
            </Grid>
        );
    }
}
