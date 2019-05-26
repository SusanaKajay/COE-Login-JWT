import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {height,width} = Dimensions.get('window');

export default StyleSheet.create({
    allPage:{
        backgroundColor: 'white',
    },
    ListBox: {
        marginBottom: 10,
    },
    image:{
        height: height/3,
        width: width,
    },
    FontHeader: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },
    Header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height / 15,
        backgroundColor: '#e80083',
    },
    DetailViewFrame:{
        width: width,
        padding: 5,
    },
    DetailView:{   
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    icon:{
        width: width/15,
        height: width/15,
        marginRight: 5,
        marginLeft: 5,
    },
    TextDetail:{
        fontSize:18,
        fontWeight: 'normal'
    },
    name:{
        fontSize:20,
        fontWeight: 'bold',
        color: '#e80083'
    }
});