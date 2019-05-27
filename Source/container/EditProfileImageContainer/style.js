import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {height,width} = Dimensions.get('window');

export default StyleSheet.create({
    allPage:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    btn1: {
        backgroundColor: 'gray',
        width: width/3,
        height: height/15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    btn2: {
        backgroundColor: '#e80083',
        width: width/3,
        height: height/15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: width/1.2,
        height: width/1.2
    },
    text:{
        color : 'white',
        fontSize: 18,
    }
});