import React from 'react';
import './OverTimeStats.scss';

import { ResponsiveLine } from '@nivo/line';

export default class OverTimeStats extends React.Component {
    renderRatingChart() {
        const gamesInTimeOrder = this.props.games.toCollection().reverse();
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
            <div className="chart-container">
                <ResponsiveLine
                    data={userRatingData}
                    colors={{ scheme: 'nivo' }}
                    lineWidth={1}
                    enableArea
                    areaBaselineValue={minRating - 25}
                    margin={{ top: 48, right: 48, bottom: 64, left: 72 }}
                    xScale={{ type: 'linear' }}
                    yScale={{ type: 'linear', min: minRating - 25, max: maxRating + 25 }}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 0,
                        legend: 'Game',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 0,
                        legend: 'User rating',
                        legendOffset: -48,
                        legendPosition: 'middle',
                    }}
                    pointSize={0}
                    pointLabelYOffset={-16}
                    useMesh={true}
                />
            </div>
        );
    }

    render() {
        return <div id="over-time-charts">{this.renderRatingChart()}</div>;
    }
}
