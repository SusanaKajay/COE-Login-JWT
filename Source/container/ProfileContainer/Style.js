import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import {HomeColor} from '../../themes/variables'
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    allPage:{
        backgroundColor: 'white',
        flexGrow : 1, 
    },
    btn:{
        borderColor: 'gray',
        borderBottomWidth: 2,
        height: width/10,
        width: width,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
    },
    subBtn:{
        flex: 0.5,
    },
    subBtn1:{
        flex: 0.5,
        flexDirection: 'row-reverse',
    },
    btn2:{
        borderColor: 'gray',
        borderBottomWidth: 2,
        height: width/10,
        width: width,
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    btnText: {
        color: 'gray',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
    },
    subMemberCard:{
        margin: 10,
        alignItems: 'center',
    },
    memberImg:{
        height: width/4,
        width: width/4,
        borderRadius: 10
    },
    memberContentView:{
        flexDirection: 'column',
    },
    memberText1:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    memberText2:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal',
    },
    subMemberCard2:{
        margin: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    MyPointFrame:{
        flexDirection: 'row',
    },
    MyPointView:{
        width: width/2,
        padding: 10,
    },
    MyPointBorderFrame:{
        borderColor: '#e80083',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    MyWalletBorderFrame:{
        borderColor: '#ffa500',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    MyPointText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#e80083'
    },
    MyPointText2:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e80083',
        marginBottom: 10,
    },
    MyWalletText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffa500',
    },    
    MyWalletText2:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffa500',
        marginBottom: 10,
    },
    icon:{
        width: width/15,
        height: width/15
    },
    icon1:{
        width: width/18,
        height: width/18
    }
});