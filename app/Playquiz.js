import React, { Component, useState } from 'react';
import QuizFunc from './QuizFunc';
import { DataProvider } from './DataContext';
import {
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Playquiz(props) {


    const [state, setState] = useState({
        quizFinish: false,
        score: 0
    })

    const _quizFinish = (score) => {
        setState({ quizFinish: true, score: score })
    }
    const _onPressBack = () => {
        const { goBack } = props.navigation
        goBack()

    }

    const _scoreMessage = (score) => {
        if (score <= 30) {
            return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>You need to work hard</Text>
                <Text style={styles.score}>You scored {score}%</Text>
            </View>)
        } else if (score > 30 && score < 60) {
            return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>You are good</Text>
                <Text style={styles.score}>Congrats you scored {score}% </Text>
            </View>)
        } else if (score >= 60) {
            return (<View style={styles.innerContainer}>
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>Great job</Text>
                <Text style={styles.score}>Congrats you scored {score}% </Text>
            </View>)
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />

            { state.quizFinish ? <View style={styles.container}>
                <View style={styles.circle}>

                    {_scoreMessage(state.score)}
                </View>

            </View> : <React.Fragment><DataProvider><QuizFunc quizFinish={(score) => _quizFinish(score)} /></DataProvider></React.Fragment>}

        </View>
    );
}

const scoreCircleSize = 300
const styles = StyleSheet.create({
    score: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic'
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scoreCircleSize,
        height: scoreCircleSize,
        borderRadius: scoreCircleSize / 2,
        backgroundColor: "dodgerblue"
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        backgroundColor: '#81c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarButton: {
        width: 55,
        color: '#fff',
        textAlign: 'center'
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    }
});