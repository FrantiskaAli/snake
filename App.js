import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native';
import constants from './constants';
import { GameEngine } from 'react-native-game-engine';
import { useState } from 'react';
import Head from './components/head'
import { GameLoop } from './snakeloop'
import Food from './components/foods';
import Tail from './components/tail';
import NewGameScreen from './components/newGame'


export default function App() {

  const boardSize = constants.grid_size * constants.cell_size
  const [gameEngine, setGameEngine] = useState(null)
  const [runs, setRuns] = useState(false)
  const [score,setScore] = useState(0)

  //start game function
  const startGame = ()=>setRuns(true)


  onEvent = e => {
    if (e.type === "game_over") {
      setRuns(false);
      setScore(0);
      gameEngine.swap( {
        head: { position: { x: 0, y: 0 }, xSpeed: 1, ySpeed: 0, updateFrequency: 10, nextMove: 10, size: constants.cell_size, color: "red",radius: {topRight:15, bottomRight:15, topLeft:0, bottomLeft:0}, renderer: <Head /> },
        food: { position: { x: getRandom(1, constants.grid_size - 1), y: getRandom(1, constants.grid_size - 1) }, size: constants.cell_size, renderer: <Food /> },
        tail: { size: constants.cell_size, elements: [], color: "red", renderer: <Tail /> },
      }) //swap method will give new entities , so the game is restarted without any tail and in the beginning position
    } else if(e.type === "point"){
      setScore(score + 1)
    }
  }
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



  return (
    <View style={styles.container} >
      <NewGameScreen runs={runs} start={startGame}/>
      <Text>{score}</Text>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[GameLoop]}
        style={{ width: boardSize, height: boardSize, flex: null, backgroundColor: "green" }}
        entities={{
          head: { position: { x: 0, y: 0 }, xSpeed: 1, ySpeed: 0, updateFrequency: 10, nextMove: 10, size: constants.cell_size, color: "red", radius: {topRight:15, bottomRight:15, topLeft:0, bottomLeft:0}, renderer: <Head /> },
          food: { position: { x: getRandom(1, constants.grid_size - 1), y: getRandom(1, constants.grid_size - 1) }, size: constants.cell_size, renderer: <Food /> },
          tail: { size: constants.cell_size, elements: [], renderer: <Tail /> },
        }}
        running={runs}
        onEvent={onEvent}
      >





      </GameEngine>

      <StatusBar style="auto" hidden />
      <View style={styles.console}>
        <View style={styles.arrowUpRow} >
          <TouchableOpacity onPress={() => gameEngine.dispatch({ type: 'move-up' })}>
            <View style={styles.arrowUp} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow} >
          <TouchableOpacity onPress={() => gameEngine.dispatch({ type: 'move-left' })}>{ /*because we set the state of gameengine as reference in gameEngine component we use dispatch to send events into game engine gameloop funciton*/}
            <View style={styles.arrowLeft} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => gameEngine.dispatch({ type: 'move-down' })}>
            <View style={styles.arrowDown} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => gameEngine.dispatch({ type: 'move-right' })}>
            <View style={styles.arrowRight} />
          </TouchableOpacity>
        </View>


      </View>
      <Button onPress={() => setRuns(true)} title="try again" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  console: {
    backgroundColor: "#fff",
    width: constants.MAX_WIDTH,
    height: constants.MAX_HEIGHT / 4,
    position: 'absolute',
    bottom: 10,
    flexDirection: 'column',
    borderWidth: 4,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'


  },
  arrowUpRow: {


  },
  arrowUp: {
    width: constants.MAX_WIDTH / 5,
    backgroundColor: "yellow",
    height: constants.MAX_HEIGHT / 15,
    borderWidth: 4,
    borderColor: 'red',


  },
  bottomRow: {
    flexDirection: 'row',

  },
  arrowLeft: {
    width: constants.MAX_WIDTH / 5,
    backgroundColor: "yellow",
    height: constants.MAX_HEIGHT / 15,
    borderWidth: 4,
    borderColor: 'red',
    marginTop: -30,
  },
  arrowDown: {
    width: constants.MAX_WIDTH / 5,
    backgroundColor: "yellow",
    height: constants.MAX_HEIGHT / 15,
    borderWidth: 4,
    borderColor: 'red',
  },
  arrowRight: {
    width: constants.MAX_WIDTH / 5,
    backgroundColor: "yellow",
    height: constants.MAX_HEIGHT / 15,
    borderWidth: 4,
    borderColor: 'red',
    marginTop: -30,
  }




});
