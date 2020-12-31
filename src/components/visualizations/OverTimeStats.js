import React from 'react';
import './OverTimeStats.scss';

import { ResponsiveLine } from '@nivo/line';
import { Icon, Divider } from 'semantic-ui-react';
import PlayerVersus from '../reusable/PlayerVersus';

const RATING_CHART_AXIS_PADDING = 25;

const X_AXIS_OPTIONS = {
    orient: 'bottom',
    tickSize: 0,
    legendOffset: 36,
    legendPosition: 'middle',
};
const Y_AXIS_OPTIONS = {
    orient: 'left',
    tickSize: 0,
    legendOffset: -48,
    legendPosition: 'middle',
};

const DEFAULT_LINE_CHART_PROPS = {
    xScale: { type: 'linear' },
    useMesh: true,
    lineWidth: 1,
    enableArea: true,
    pointSize: 8,
    pointColor: { theme: 'background' },
    pointBorderWidth: 2,
    pointBorderColor: { theme: 'background' },
    pointLabelYOffset: -16,
};

export default class OverTimeStats extends React.Component {
    doesGameMatchFilters(game) {
        const filters = this.props.filters;
        return (
            Object.keys(filters).every((filterKey) => {
                return !filters[filterKey] || filters[filterKey] === game[filterKey];
            }) &&
            Object.values(filters).some((filterValue) => {
                return filterValue;
            })
        );
    }

    renderRatingTooltip = (d, gamesInTimeOrder, ratingDeltas) => {
        const game = gamesInTimeOrder[d.point.index];
        const delta = ratingDeltas[d.point.index].y;
        const date = new Date(game.timestamp).toDateString();
        return (
            <div className="rating-tooltip">
                <PlayerVersus game={game} justify />
                <Divider fitted />
                <div className="tooltip-metadata">
                    <Icon
                        name="winner"
                        color={game.outcome === 'tie' ? 'grey' : game.outcome === 'won' ? 'green' : 'red'}
                    />
                    {game.outcome === 'tie' ? 'Tied' : game.outcome === 'won' ? 'Won' : 'Lost'}
                </div>
                <div className="tooltip-metadata">
                    <Icon name="chess" color="grey" />
                    {game.opening}
                </div>
                <div
                    className="tooltip-metadata"
                    style={{ color: delta === 0 ? 'black' : delta > 0 ? 'green' : 'red' }}
                >
                    <Icon name="chess board" color="grey" />
                    {`Rating ${delta >= 0 ? '+' : ''}${delta}`}
                </div>
                <div className="tooltip-date">{date}</div>
            </div>
        );
    };

    renderRatingChart(gamesInTimeOrder, ratingDeltas) {
        let minRating = 10000;
        let maxRating = 0;
        const userRatingData = [
            {
                id: 'User rating',
                data: gamesInTimeOrder.map((game, i) => {
                    minRating = Math.min(minRating, game.userRating);
                    maxRating = Math.max(maxRating, game.userRating);
                    return {
                        x: i,
                        y: game.userRating,
                    };
                }),
            },
        ];

        return (
            <div className="chart-container rating">
                <ResponsiveLine
                    {...DEFAULT_LINE_CHART_PROPS}
                    data={userRatingData}
                    colors="rgb(232, 168, 56)"
                    margin={{ top: 8, right: 48, bottom: 12, left: 72 }}
                    yScale={{
                        type: 'linear',
                        min: minRating - RATING_CHART_AXIS_PADDING,
                        max: maxRating + RATING_CHART_AXIS_PADDING,
                    }}
                    axisBottom={null}
                    axisLeft={{
                        ...Y_AXIS_OPTIONS,
                        legend: 'Rating',
                    }}
                    areaBaselineValue={minRating - RATING_CHART_AXIS_PADDING}
                    pointBorderColor={(d) => {
                        return this.doesGameMatchFilters(gamesInTimeOrder[d.index])
                            ? 'rgb(97, 205, 187)'
                            : { theme: 'background' };
                    }}
                    tooltip={(d) => this.renderRatingTooltip(d, gamesInTimeOrder, ratingDeltas)}
                />
            </div>
        );
    }

    renderRatingDeltaChart(gamesInTimeOrder, ratingDeltas) {
        const userRatingDeltaData = [
            {
                id: 'User rating change',
                data: ratingDeltas,
            },
        ];

        return (
            <div className="chart-container rating-delta">
                <ResponsiveLine
                    {...DEFAULT_LINE_CHART_PROPS}
                    data={userRatingDeltaData}
                    margin={{ top: 8, right: 48, bottom: 64, left: 72 }}
                    yScale={{ type: 'linear', min: -10, max: 10 }}
                    gridYValues={[-8, -4, 0, 4, 8]}
                    axisBottom={{
                        ...X_AXIS_OPTIONS,
                        legend: 'Game',
                    }}
                    axisLeft={{
                        ...Y_AXIS_OPTIONS,
                        legend: 'Change',
                    }}
                    pointBorderColor={(d) => {
                        return this.doesGameMatchFilters(gamesInTimeOrder[d.index])
                            ? 'rgb(97, 205, 187)'
                            : { theme: 'background' };
                    }}
                    tooltip={(d) => this.renderRatingTooltip(d, gamesInTimeOrder, ratingDeltas)}
                />
            </div>
        );
    }

    render() {
        const gamesInTimeOrder = this.props.games.toCollection().reverse();

        const ratingDeltas = [];
        gamesInTimeOrder.forEach((game, i) => {
            const nextRating = gamesInTimeOrder[i + 1] ? gamesInTimeOrder[i + 1].userRating : this.props.perf.rating;
            ratingDeltas.push({
                x: i,
                y: nextRating - game.userRating,
            });
        });

        return (
            <div id="over-time-charts">
                <h2 className="chart-header">Your rating</h2>
                {this.renderRatingChart(gamesInTimeOrder, ratingDeltas)}
                {this.renderRatingDeltaChart(gamesInTimeOrder, ratingDeltas)}
            </div>
        );
    }
}
