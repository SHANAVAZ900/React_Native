import React from "react";
import {View,Button,Text,ScrollView,StyleSheet,TextInput,TouchableOpacity,} from "react-native";
import { CheckBox, Card } from "react-native-elements";
import Constants from "expo-constants";
import DatePicker from "react-native-datepicker";

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:"#fff44f",
    width:300,
    marginLeft:25,
    
    
  },

  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },

  appdate: {
    flexDirection: "column",
    backgroundColor:"lightblue",
  },

  fill: {
    flex: 10,
    backgroundColor: "lightblue",
  },

  addbutton: {
    display: "flex",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    padding:25,
    backgroundColor: "darkviolet",
    marginLeft:105,
    
    
  },

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: "auto",
  },

  heading: {
    paddingLeft: 10,
    fontSize: 30,
    fontWeight: "300",
    color: "darkblue",
  },

  input: {
    height: 35,
    borderWidth: 2,
    margin: 10,
    borderColor: "gray",
    paddingLeft: 10,
    fontWeight: "300",
    fontSize: 20,
    color: "purple",
  },

  buttontext: {
    fontWeight: "300",
    fontSize: 18,
    color: "black",
    textTransform: "uppercase",
  },

  removebutton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    fontSize: 18,
    height: 28,
    width:75,
    backgroundColor: "orange",
    marginLeft:107,
  },

});


let id = 0;

const Todo = (props) => (
  <View style={styles.todoContainer}>
    <CheckBox
      checked={props.todo.checked}
      onPress={props.onTodoClick}
      style={{ paddingRight: 0,
       borderWidth: 20,
       borderColor:"darkred",

      }}
    />
    <Text style={{ fontSize: 15, fontWeight: "300", color: "green",marginLeft:10, }}>
      {props.todo.text}
    </Text>
    <Text style={{ fontSize: 15,color: "purple", marginLeft:20, }}>
      {props.todo.dueDate}
    </Text>
   
    <TouchableOpacity style={[styles.button]} onPress={props.onDelete}>
      <Text style={([styles.buttontext], [styles.removebutton])}>Remove</Text>
    </TouchableOpacity>
  </View>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      text: "",
      dueDate: "",
    };
  }

  addTodo(text, date) {
    if (text !== "") {
      id++;
      this.setState({
        todos: [
          ...this.state.todos,
          { id: id, text: text, checked: false, dueDate: date },
        ],
        text: "",
      });
    }
  }

  takeInput = (input) => {
    this.setState({ text: input });
  };

  dateChange = (date) => {
    this.setState({ dueDate: date });
  };

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
          dueDate: todo.dueDate,
        };
      }),
    });
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text style={[styles.heading]}>LIST TO BE VERIFIED</Text>

        <TextInput
          style={[styles.input]}
          placeholder="TASK is needed for entering"
          placeholderTextColor="black"
          onChangeText={this.takeInput}
          value={this.state.text}
        />
        <View style={[styles.appdate]}>
          <DatePicker
            style={{ width: 300,
            marginLeft:20,
            
            

            }}
            date={this.state.dueDate}
            mode="date"
            placeholder="Date is needed"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="01-01-2100"
            confirmBtnText="OK"
            cancelBtnText="CANCEL"
            customStyles={{
              dateInput: {
                marginLeft: 0,
                backgroundColor:"orange"
                
                
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={this.dateChange}
          />
          <TouchableOpacity
            style={[styles.addbutton, styles]}
            onPress={() => this.addTodo(this.state.text, this.state.dueDate)}
          >
            <Text style={[styles.buttontext]}>ADD</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: "lightblue", marginBottom: 10 }}>
          {this.state.todos.map((todo) => (
            <View>
              <Todo
                onTodoClick={() => this.toggleTodo(todo.id)}
                todo={todo}
                onDelete={() => this.removeTodo(todo.id)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}


