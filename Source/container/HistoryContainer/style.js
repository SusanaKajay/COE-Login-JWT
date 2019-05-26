import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {height,width} = Dimensions.get('window');

import {HomeColor} from '../../themes/variables'

export default StyleSheet.create({
    allPage:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card:{
        borderColor: HomeColor.Mark,
        borderWidth: 2,
        borderRadius: 10,
        width: width/1.05,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
    },
    subCard:{
        flexDirection: 'row',
        flex: 1,
    },
    subCard2: {
        flex: 0.5
    },
    subCard3: {
        flex: 0.5,
        flexDirection: 'row-reverse',
    },
    TextName:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    TextBehav:{
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
    },
    normalText:{
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black'
    },
    TextPoint:{
        color: HomeColor.Mark,
        fontSize: 20,
        fontWeight: 'bold',
    },
});