import React from 'react';
import './PlayerVersus.scss';

import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

export default class PlayerVersus extends React.Component {
    render() {
        const { whitePlayer, whiteRating, blackPlayer, blackRating, userColor } = this.props.game;

        return (
            <div className="versus-wrapper" style={{ justifyContent: this.props.justify ? 'space-evenly' : null }}>
                <div
                    className={classNames('player', 'white', {
                        user: userColor === 'white',
                    })}
                    style={{ width: this.props.justify ? null : '40%' }}
                >
                    <div>
                        <Icon className="white" name="chess pawn" color="grey" />
                    </div>
                    <div className="player-info">
                        <div className="player-name">{whitePlayer}</div>
                        <div className="player-rating">{whiteRating}</div>
                    </div>
                </div>
                <div
                    className="vs-text"
                    style={{
                        width: this.props.justify ? null : '20%',
                        padding: this.props.justify ? '6px 12px' : null,
                    }}
                >
                    vs
                </div>
                <div
                    className={classNames('player', 'black', {
                        user: userColor === 'black',
                    })}
                >
                    <div className="player-info">
                        <div className="player-name">{blackPlayer}</div>
                        <div className="player-rating">{blackRating}</div>
                    </div>
                    <div>
                        <Icon className="black" name="chess pawn" />
                    </div>
                </div>
            </div>
        );
    }
}
