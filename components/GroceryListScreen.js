import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Note from './Note';
import Header from "./Header";


export default class GroceryListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        }
    }
    render () {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                         deleteMethod={() => this.deleteNote(key)}/>
        });

        return (

            <View style={styles.container}>
                    <Header navigation={this.props.navigation} title='Grocery List'/>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({noteText})}
                        value={this.state.noteText}
                        placeholder='>Skriv din vare her og tryk på "+" for at tilføje varen til listen '
                        placeholderTextColot='white'
                        underlineColorAndroid='transparant'>
                    </TextInput>
                </View>
                <TouchableOpacity onPress= {this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
    addNote() {
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear()+
                    "/" + (d.getMonth() + 1 ) +
                    "/" + d.getDate(),
                'note': this.state.noteText
            });
            this.setState({noteArray: this.state.noteArray})
            this.setState({noteText: ''})
        }
    }
    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({ noteArray: this.state.noteArray})
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:'#3b2129',
        alignItems:'center',
        borderBottomWidth:10,
        borderBottomColor:'#ddd'
    },
    headerText:{
        fontWeight: 'bold',
        color:'white',
        fontSize:18,
        padding:26
    },
    Scrollcontainer:
        {
            flex:1,
            marginBottom:100,
        },
    footer:
        {
            position: 'absolute',
            bottom: 0,
            left :0,
            right:0,
            zIndex:10
        },
    textInput :
        {
            alignSelf: 'stretch',
            color:'#fff',
            padding:20,
            backgroundColor:'#252525',
            borderTopWidth :2,
            borderTopColor:'#ededed'
        },
    addButton :
        {
            position:'absolute'
            ,zIndex:11,
            right:20,
            bottom:20,
            backgroundColor:'#5f434d',
            width:90,
            height:90,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
            elevation: 8,
        },
    addButtonText :
        {
            color: '#fff',
            fontSize:24,
        }
})