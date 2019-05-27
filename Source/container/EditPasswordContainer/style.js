import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {height,width} = Dimensions.get('window');

export default StyleSheet.create({
    allPage:{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height/2,
    },
    inputBox:{
        height: width/10,
        width: width/1.2,
        borderWidth: 2,
        borderColor: '#e80083',
        fontSize: 20,
        marginBottom: 10,
    },
    btn:{
        marginTop: 10,
        height: width/8,
        width: width/2,
        backgroundColor: '#e80083',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});