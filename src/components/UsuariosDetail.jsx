import { View, TextInput, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext';


export default function UsuariosDetail(props) {

  const { id, nome, email, altura, peso, setId, setNome, setEmail, setAltura, setPeso, gravarDados } = useContext(UsuarioContext);

  useEffect(() => {
    // console.warn( Object.keys(props.route.params.item) ) 
    console.log(props.route.params.item);
    if (props.route.params.item.id == "") {
      setId("");
      setNome("");
      setEmail("");
      setAltura("");
      setPeso("");
      console.log("setou id vazio");
    } else {
      setId(props.route.params.item.id.toString());
      setNome(props.route.params.item.nome);
      setEmail(props.route.params.item.email);
      setAltura(props.route.params.item.altura ? props.route.params.item.altura.toString() : "");
      setPeso(props.route.params.item.peso ? props.route.params.item.peso.toString() : "");
      console.log("setou id");
    }
  }, [])

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}
        editable={false}
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'black',
          borderWidth: 1,
          margin: 5,
        }}
        placeholder='Nome:'
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}
        placeholder='Email:'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}
        placeholder='Altura:'
        value={altura}
        onChangeText={setAltura}
        keyboardType='numeric'
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}
        placeholder='Peso:'
        value={peso}
        onChangeText={setPeso}
        keyboardType='numeric'
      />
      <Button
        title="Cancelar"
        color={'#b3bf09'}
        onPress={() => props.navigation.goBack()} />
      <Button
        title="Gravar"
        color="#34bf09"
        onPress={() => { gravarDados(); props.navigation.goBack() }} />
    </View>
  )
}
