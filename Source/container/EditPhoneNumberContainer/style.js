import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {height,width} = Dimensions.get('window');

export default StyleSheet.create({
    allPage:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    inputBox:{
        height: width/10,
        width: width/1.2,
        borderColor: '#e80083',
        borderBottomWidth: 2,
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