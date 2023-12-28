import { View } from "react-native";
import constants from "../constants";

export default function Tail({ size, elements, color }) {



    return (
        <View style={{ width: constants.grid_size, height: constants.grid_size }}>


            {elements.map((el, i) => {
                return <View key={i} style={{ width: size, height: size, backgroundColor: i%2 === 0 ? "red" : "blue", position: "absolute", left: el[0] * size, top: el[1] *size }} />
            })}


        </View>)


}