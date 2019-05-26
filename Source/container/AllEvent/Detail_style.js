import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {height,width} = Dimensions.get('window');


export default StyleSheet.create({
    Detail_View:{
        backgroundColor: 'white',
    },
    NameView:{
        
    },
    NameText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#e80083',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    createByView:{
        backgroundColor: 'white'
    },
    DescripView:{
        borderBottomColor: 'gray',
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    EventTypeView:{
        flex: 1,
        flexDirection: 'row',
    },
    TypeText1:{
        margin: 10,
        color: '#e80083',
        fontSize: 18,
    },
    normalText:{
        margin: 10,
        color: 'gray',
        fontSize: 18,
        marginRight: 10,
    },
    eventToPinView:{
        marginTop: 10,
        flex: 1,
        flexDirection: 'column'
    },
    row:{
        flex:0.5,
        borderBottomColor: 'gray',
        flexDirection: 'row'
    },
    DetailViewFrame:{
        width: width,
        padding: 5,
    },
    DetailView:{   
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        width: width/10,
        height: width/10,
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