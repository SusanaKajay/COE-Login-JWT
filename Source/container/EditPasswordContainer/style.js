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
        flex: 1,

    },
    inputBox:{
        height: width/5,
        width: width/1.2,
        borderBottomWidth: 2,
        borderColor: '#e80083',
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