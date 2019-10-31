import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Header from './App/components/Header';
import Subtitle from './App/components/Subtitle';
import Input from './App/components/Input';
import Listitem from './App/components/Listitem';



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      inputvalue:'',
      todos:[]
    }
  }
  componentWillMount(){
    this.getData()
  }
  storeData=()=>{
    AsyncStorage.setItem('@todo:state',JSON.stringify(this.state));
  }

  getData=()=>{
    AsyncStorage.getItem('@todo:state').then((state)=>{
      if(state !==null){
        this.setState(JSON.parse(state));
      }
    })
  }

  _makeTodoItem=({item,index})=>{
    return(
      <Listitem 
        name={item.title}
        isComplete={item.isComplete}
        changeComplete={() => {
          const newTodo = [...this.state.todos];
          newTodo[index].isComplete = !newTodo[index].isComplete;
          this.setState({todos:newTodo},this.storeData);
        }}
        deleteItem={() => {
          const newTodo = [...this.state.todos];
          newTodo.splice(index,1)
          this.setState({todos:newTodo},this.storeData);
        }}/>
    )
  }
  _changeText=(value)=>{
    this.setState({inputvalue:value});
  }
  _addTodoItem=() =>{
    if(this.state.inputvalue != ''){
      const prevTodo = this.state.todos;

      const newTodo = {title : this.state.inputvalue, isComplete: false};

      this.setState({
      inputvalue: '', 
      todos : prevTodo.concat(newTodo)
      },this.storeData);
    }
  }
  render(){
  return (
    <View style={styles.container}>
      <View style={styles.headercenter}>
        <Header/>
      </View> 
      <View style={styles.subtitleposition}>
        <Subtitle title="♨ Today's goal"/>
        <Input
            value={this.state.inputvalue}
            changeText={this._changeText}
            addTodoItem={this._addTodoItem}/>
      </View> 
      <View style={styles.subtitleposition}>
        <Subtitle title="♨ Today's goal list"/>


        <FlatList
            data={this.state.todos}
            renderItem={this._makeTodoItem}
            keyExtractor={(item,index)=>{return '$(index)'}}/>
      </View> 
    </View>
  );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headercenter: {
    alignItems: "center",
  },
  subtitleposition: {
    marginLeft:30,
  },
});
