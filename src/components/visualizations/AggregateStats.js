import React from 'react';
import './AggregateStats.scss';

import { Grid, Statistic, Header, Icon } from 'semantic-ui-react';

export default class AggregateStats extends React.Component {
    renderStatisticColumn = (value, label, statisticProps) => {
        return (
            <Grid.Column className="stat-column">
                <Statistic size="large" horizontal {...statisticProps}>
                    <Statistic.Value>{value}</Statistic.Value>
                    <Statistic.Label>{label}</Statistic.Label>
                </Statistic>
            </Grid.Column>
        );
    };

    render() {
        const won = this.props.games.countValue('won', 'outcome');
        const lost = this.props.games.countValue('lost', 'outcome');
        const tied = this.props.games.countValue('tie', 'outcome');
        const total = this.props.games.count();

        const winPct = `${Math.round((won / total) * 100)}%`;
        const losePct = `${Math.round((lost / total) * 100)}%`;

        return (
            <Grid id="aggregate-stats-grid" columns="equal" centered>
                <Grid.Row className="header-row">
                    <Header as="h2" icon>
                        <Icon name="winner" circular />
                        Game Outcomes
                        <Header.Subheader>Your wins, losses, and in betweens.</Header.Subheader>
                    </Header>
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderStatisticColumn(total, 'total games', { color: 'grey' })}
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderStatisticColumn(won, 'won', { color: 'grey' })}
                    {this.renderStatisticColumn(tied, 'tied', { color: 'grey' })}
                    {this.renderStatisticColumn(lost, 'lost', { color: 'grey' })}
                </Grid.Row>
                <Grid.Row className="stat-row">
                    {this.renderStatisticColumn(winPct, 'win percentage', { color: 'grey' })}
                    {this.renderStatisticColumn(losePct, 'loss percentage', { color: 'grey' })}
                </Grid.Row>
            </Grid>
        );
    }
}
