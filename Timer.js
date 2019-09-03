import React, { Component } from 'react';

import { Text } from 'react-native';

class Timer extends Component {
    state = {
        timeLeft: this.props.time
    };

    startTimer = () => {
        const timer = setInterval(() => {
            let { timeLeft } = this.state;
            timeLeft -= 1;
            this.setState({ timeLeft });

            if (timeLeft <= 0) {
                clearInterval(timer);
                this.props.onTimeup();
                this.setState({ timeLeft: this.props.time })
            }
        }, 1000);
    }

    render() {
        const { timeLeft } = this.state;
        return <Text style={styles.textStyle}>{timeLeft ? `${timeLeft} secs` : `Finished`}</Text>
    }
}

const styles = {
    textStyle: {
        fontSize: 36,
        fontFamily: "Marker Felt"
    }
}

export default Timer;