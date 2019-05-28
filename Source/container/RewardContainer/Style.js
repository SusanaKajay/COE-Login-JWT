import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    AllPage: {
        backgroundColor: 'white',
    },
    Header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height / 15,
        backgroundColor: '#e80083',
    },
    imageView:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        height: height/3,
        width: width/2.2,
    },
    DetaiilView:{
        borderColor: 'gray',
        borderTopWidth: 2,
        flexDirection: 'column'
    },
    NameOfDetailView:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    SupDetailView:{
        flexDirection: 'row',
        flex: 1,
    },
    SupView:{
        flex: 0.5,
        flexDirection: 'row',
        alignItems:'center'
    },
    icon:{
        width: width/15,
        height: width/15,
        margin: 5,
        marginLeft: 10,
    },
    nameText:{
        color: '#e80083',
        fontSize: 20,
        fontWeight: 'bold',
    },
    DetailText:{
        fontSize: 15,
        fontWeight: 'normal',
    },
    ListBox:{
        borderWidth: 2,
        borderColor: 'gray',
        margin: 7,
    },
    TotalPointView:{
        width: width,
        height: height/5,
        backgroundColor: '#e80083',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'column'
    },
    PointView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    PointText:{
        fontSize: 50,
        fontWeight: 'bold',
        color: '#ffa500'
    },
    PointIcon:{
        height: width/15,
        width: width/15,
        marginRight: 10,
    },
    PointText2:{
        fontSize: 25,
        fontWeight: 'normal',
        color: 'white'
    },
    picker:{
        width: width,
        height: width/10,
        marginBottom:(Platform.OS === 'ios') ? 150 : 50,
    }
});