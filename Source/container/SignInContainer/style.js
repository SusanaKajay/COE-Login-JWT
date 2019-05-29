import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    allPage:{
        backgroundColor: 'white',
        width: width,
        height: height
    },
    TopView:{
        backgroundColor: '#e80083',
        width: width,
        height: height/2.5,  
        borderBottomRightRadius: 200,
        padding: 30,
        flexDirection: 'column-reverse',
    },
    TextView:{
        marginBottom: 20,
    },
    TopFont:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    BottomView:{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox:{
        
        width: width/1.2,
        height: width/8,
        borderColor: '#e80083',
        borderBottomWidth: 3,
    },
    btnView:{
        flexDirection: 'row-reverse',
        width: width/1.2,
    },
    btn:{
        width: width/5,
        height: width/5,
        backgroundColor: '#e80083',
        marginTop: 10,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontBtn:{
        fontSize: 20,
        color: 'white'
    }
})