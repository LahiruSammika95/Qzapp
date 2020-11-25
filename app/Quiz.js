import React, { Component } from 'react';
import { DataProvider } from './DataContext';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './animbutton'
const { width, height } = Dimensions.get('window')
let arrnew = []
const jsonData = {
    "quiz": {

        "question1": {
            "correctoption": "option3",
            "options": {
                "option1": "is finished",
                "option2": "was finished",
                "option3": "had finished",
                "option4": "not finished"
            },
            "question": " He told me that he ____ watching the movie."
        },
        "question2": {
            "correctoption": "option3",
            "options": {
                "option1": "so",
                "option2": "very",
                "option3": "too",
                "option4": "more"
            },
            "question": " I do my work _____ carefully not to make mistakes."
        },
        "question3": {
            "correctoption": "option1",
            "options": {
                "option1": "because of",
                "option2": "because off",
                "option3": "on",
                "option4": "for"
            },

            "question": "He got too tired _____ over work."
        },
        "question4": {
            "correctoption": "option3",
            "options": {
                "option1": "muteble",
                "option2": "imutable",
                "option3": "variable",
                "option4": "none of the above"
            },
            "question": "Find the word with correct spelings"
        },
        "question5": {
            "correctoption": "option1",
            "options": {
                "option1": "modern",
                "option2": "old",
                "option3": "regular",
                "option4": "ancient"
            },
            "question": "Select the similar word for 'new'"
        },
        "question6": {
            "correctoption": "option3",
            "options": {
                "option1": " Greedy",
                "option2": "Very Hungry",
                "option3": "Assuaged",
                "option4": "None of these"
            },

            "question": "Antonym of Ravenous ?"
        },
        "question7": {
            "correctoption": "option2",
            "options": {
                "option1": "sitting",
                "option2": " has been sitting",
                "option3": "has been sit",
                "option4": "has sit"
            },

            "question": "She ____ in the sun for 1 hour."
        },
        "question8": {
            "correctoption": "option2",
            "options": {
                "option1": "Symphonious",
                "option2": "Homophonous",
                "option3": "Synonyms",
                "option4": "Saminymous"
            },
            "question": " Sounding the same but spelt differently ?"
        },
        "question9": {
            "correctoption": "option1",
            "options": {
                "option1": "My friend has got a new job.",
                "option2": "My friend has got a new work.",
                "option3": "My friend is got a new job.",
                "option4": "My friend did got a new job."
            },

            "question": "Choose the correct answer ?"
        },
        "question10": {
            "correctoption": "option2",
            "options": {
                "option1": " Do you like a glass of water ?",
                "option2": "Would you like a glass of water ?",
                "option3": "Would you like the glass of water ?",
                "option4": "Do you like the glass of water ?"
            },

            "question": "Choose the correct sentence."
        },
    }

}
export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.qno = 0
        this.score = 0

        const jdata = jsonData.quiz
        arrnew = Object.keys(jdata).map(function (k) { return jdata[k] });
        this.state = {
            question: arrnew[this.qno].question,
            options: arrnew[this.qno].options,
            correctoption: arrnew[this.qno].correctoption,
            countCheck: 0,
            active: 0,
            selectedAnswer: "undefined"

        }

    }
    prev() {
        if (this.qno > 0) {
            this.qno--
            this.setState({ question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption: arrnew[this.qno].correctoption })
        }
    }
    next() {
        this.setState({ active: 0, selectedAnswer: "undefined" })
        if (this.qno < arrnew.length - 1) {
            this.qno++

            this.setState({ active: 0, countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption: arrnew[this.qno].correctoption })
        } else {

            this.props.quizFinish(this.score * 100 / 10)
        }
    }
    _answer(status, ans) {

        if (status == true) {

            const count = this.state.countCheck + 1
            this.setState({ countCheck: count, active: 1 })
            if (ans == this.state.correctoption) {
                this.score += 1
            }


        } else {
            const count = this.state.countCheck - 1
            this.setState({ countCheck: count })
            if (this.state.countCheck < 1 || ans == this.state.correctoption) {
                this.score -= 1
            }
        }

    }
    render() {
        let _this = this
        const currentOptions = this.state.options
        const options = Object.keys(currentOptions).map(function (k) {
            return (<View key={k} style={{ margin: 10 }}>
                <DataProvider>
                    <Animbutton selectedAnswer={_this.state.selectedAnswer} countCheck={_this.state.countCheck} onColor={"dodgerblue"} effect={"tada"} _onPress={(status) => {
                        _this.setState({ selectedAnswer: currentOptions[k] });
                        setTimeout(() => {
                            _this._answer(status, k)
                        }, 50);
                    }} text={currentOptions[k]} />
                </DataProvider>
            </View>)
        });

        return (
            <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
                <View style={styles.container}>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', }}>

                        <View style={styles.oval} >
                            <Text style={styles.welcome}>
                                {this.state.question}
                            </Text>
                        </View>
                        <View>
                            {options}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            {/*   <Button
          onPress={() => this.prev()}
          title="Prev"
          color="#841584"
        />
        <View style={{margin:15}} />*/}

                            <TouchableOpacity onPress={() => this.next()} >
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "dodgerblue" }}>
                                    <Icon name="md-arrow-round-forward" size={30} color="white" />
                                </View>
                            </TouchableOpacity >

                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    oval: {
        width: width * 90 / 100,
        borderRadius: 20,
        backgroundColor: 'dodgerblue'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        margin: 15,
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});