import { TouchableOpacity, Text, View, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import constants from "../constants";

export default function GameStartScreen({ runs, start }) {
    const [on, setOn] = useState(true)

    useEffect(() => {
        runs ? setOn(false) : setOn(true)
    }, [runs])


    return (
        <Modal visible={on} animationType="slide" transparent>
            <View style={styles.screen}>
                <View style={styles.modal}>
                    <Text style={styles.letsPlay}>Lets play</Text>
                    <Text style={styles.snake}>SNAKE</Text>
                    <TouchableOpacity onPress={start} style={styles.button}>
                        <Text style={{
                            fontSize: 72, textAlign: "center", padding: 0, backgroundColor: "rgba(44, 156, 39, 0.8)",
                            paddingHorizontal: 40,
                            borderRadius: 15,
                            borderBlockColor: "green",
                            borderWidth: 4
                        }}>&#8227;</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: "rgba(0, 0, 0,0.7 )",
        width: constants.MAX_WIDTH,
        height: constants.MAX_HEIGHT,
        paddingTop: 150,
        alignItems: 'center'
    },
    letsPlay: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
    },
    snake: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 40,
        fontWeight: 'bold',
    },
    modal: {
        width: constants.MAX_WIDTH - 30,
        height: constants.MAX_HEIGHT / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgb(184, 131, 9)",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 8,
        

    },
})