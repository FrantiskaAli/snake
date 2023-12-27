import { View } from "react-native";


export default function Head(props){
        const x= props.position.x;
        const y = props.position.y

    return(
            <View style={{width: props.size, height: props.size, backgroundColor: props.color, position: "absolute", top: y * props.size, left : x * props.size}}/>
    )
}
