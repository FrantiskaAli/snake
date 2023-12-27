import { View } from "react-native"


export default function Food ({position, size}){
    return (
        <View style={{
            position:"absolute",
            backgroundColor: "blue",
            borderRadius:10,
            left: position.x * size,
            top:position.y * size,
            width:size,
            height:size
        }}/>
    )
}