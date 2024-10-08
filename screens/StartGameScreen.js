import { useState } from 'react';
import { TextInput, 
  View,
   StyleSheet,
    Alert,
     Dimensions,
     useWindowDimensions,
     KeyboardAvoidingView,
     ScrollView} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButtons';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Cards from '../components/ui/Cards';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({onPickNumber}) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const {width,height}= useWindowDimensions();

  function numberInputHandler(input) {
    setEnteredNumber(input);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    // console.log('Valid Number!');
    onPickNumber(chosenNumber);
  }

  const marginTopDistance = height < 380 ?  30 : 100;

  return (
    <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior='position'>
    <View style={[styles.rootContainer,{marginTop:marginTopDistance}]}>
      <Title>Guess the number</Title>
    <Cards>
      <InstructionText>Enter a Number</InstructionText>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberInputHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
      </Cards>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const deviceHeight= Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  rootContainer:{
    flex:1,
    marginTop:deviceHeight <400 ?  30 : 100,

    alignItems:'center'
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
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
  instructionText:{
    color:Colors.accent500,
    fontSize:24,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
