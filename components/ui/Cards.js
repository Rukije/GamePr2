import { StyleSheet, View,Dimensions} from 'react-native'
import React from 'react'
import Colors from '../../constants/colors'

const Cards = ({children}) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

export default Cards

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth <358 ? 18 :36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.55,
      },
})