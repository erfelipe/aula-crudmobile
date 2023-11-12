import { StyleSheet, FlatList, View, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { UsuarioContext } from '../contexts/UsuarioContext';

export default function Usuarios(props) {

  const { buscarUsuarios, usuarios, apagarUsuario, atualizacao } = useContext(UsuarioContext);
  
  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={usuarios}
        extraData={atualizacao}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content style={styles.item}>
              <View>
                <ListItem.Title>{item.nome}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
              </View>
              <View style={{ width: 100 }}>
                <ListItem.ButtonGroup
                  buttons={[
                    <Icon name='edit' size={20} color={'blue'} onPress={() => props.navigation.navigate("Detalhe", { item })} />,
                    <Icon name='trash-can' size={20} color={'red'} onPress={ () => apagarUsuario(item.id)} />
                  ]}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        )}
      >
      </FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
