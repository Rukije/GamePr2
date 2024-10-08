import { useEffect, useState } from 'react';
import { View, StyleSheet ,Alert,Text,FlatList,useWindowDimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButtons';
import Cards from '../components/ui/Cards';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min,max,exclude){
  const rndNum = Math.floor(Math.random()*(max-min))+min;

  if (rndNum === exclude){
    return generateRandomBetween(min,max,exclude);
  }else{
    return rndNum;
  }
}



let minBoundary=1;
let maxBoundary=100;

function GameScreen({userNumber,onGameOver}) {
  const initialGuess = generateRandomBetween(1,100,userNumber);
  const [currentGuess,setCurrentGuess]=useState(initialGuess);
  const[guessRounds,setGuessRounds] = useState([initialGuess]);

  const {width,height}= useWindowDimensions();


  useEffect(() => {
    if(currentGuess === userNumber){
      onGameOver(guessRounds.length);
    }
  }, [currentGuess,userNumber,onGameOver]);

  useEffect(() =>{
    minBoundary = 1;
    maxBoundary=100;
  },[]);

  useEffect(() => {
    if(currentGuess === userNumber){

    }
  }, []);

  // direction =>'lower', 'greater'
  function nextGuessHandler(direction){ 
    if(
    (direction === 'lower' && currentGuess < userNumber) || 
    (direction === 'greater' && currentGuess > userNumber)
  ){
    Alert.alert("Don't Lie!",'You know that this is wrong...'
      , [{text:'Sorry',style:'cancel'},
      ]);
      return;
    }
    if(direction === 'lower'){
      maxBoundary=currentGuess ;
    }else{
      minBoundary=currentGuess + 1;
    }
   
    console.log(minBoundary,maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber,...prevGuessRounds]);
  }

  const gouessRoundListLength = guessRounds.length;

  let content = height < 380 ?  30 : 100;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Cards>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
            {/* <Ionicons name="md-remove" size={24} color="white" /> */}
            -
          </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
          {/* <Ionicons name="md-add" size={24} color="white" /> */}
          +
          </PrimaryButton>
          </View>
        </View>
      </Cards>
      <View style={styles.listContainer}>
      {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)}       */}
      <FlatList data={guessRounds} 
       renderItem={(itemData) => <GuessLogItem roundNumber={gouessRoundListLength - itemData.index} guess={itemData.item}/>}  
       keyExtractor ={(item) => item}
      />
     </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding:24,
  },
  instructionText:{
    marginBottom:12
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer:{
    flex:1,
    padding:16,
  },
});
