import { Image, View } from "react-native";


export default function Head(props) {
        const x = props.position.x;
        const y = props.position.y
        const radius = props.radius

        return (
                <View style={{
                        width: props.size,
                        height: props.size,
                        backgroundColor: props.color,
                        position: "absolute",
                        top: y * props.size,
                        left: x * props.size,
                        borderTopRightRadius: radius.topRight,
                        borderBottomRightRadius: radius.bottomRight,
                        borderTopLeftRadius: radius.topLeft,
                        borderBottomLeftRadius: radius.bottomLeft,
                }}>
                        <Image source={require('../assets/eyes.png')} style={{ height: props.size, width: props.size }} />
                </View>
        )
}
