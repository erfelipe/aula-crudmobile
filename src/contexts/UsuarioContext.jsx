import React, { createContext, useState } from 'react'
import axios from 'axios';
export const UsuarioContext = createContext({});

export default function UsuarioProvider({ children }) {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [atualizacao, setAtualizacao] = useState({});

  const url = "https://pessoas-git-one.vercel.app/usuarios/";

  function buscarUsuarios() {
    fetch(url)
      .then((respFetch) => respFetch.json())
      .then((respJson) => setUsuarios(respJson))
      .catch((erro) => console.warn(erro))
  }

  function gravarDados() {
    console.log("gravar dados", url + id)
    if (id) {
      axios.put(url + id, {
        nome: nome,
        email: email,
        altura: (altura ? altura : null),
        peso: (peso ? peso : null),
      }).then((resp) => atualizaListaUsuarioEditado(resp)).catch((erro) => console.log(erro));
    } else {
      axios.post(url, {
        nome: nome,
        email: email,
        altura: (altura ? altura : null),
        peso: (peso ? peso : null),
      }).then((resp) => atualizaListaUsuarioNovo(resp)).catch((erro) => console.log(erro));
    }
  }

  function atualizaListaUsuarioEditado(response) {
    console.log(response);
    //ou usa-se a confirmacao pelo id retornado
    //ou usa-se um response.status == 20x com um if
    let { id } = response.data;
    const index = usuarios.findIndex(item => item.id == id);
    let users = usuarios;
    users[index].nome = nome;
    users[index].email = email;
    users[index].altura = (altura ? altura : null);
    users[index].peso = (peso ? peso : null);
    setUsuarios(users);

    let usuario = {};
    usuario.id = id;
    usuario.nome = nome;
    usuario.email = email;
    usuario.altura = altura;
    usuario.peso = peso;
    console.log(usuario);
    setAtualizacao(usuario);
  }

  function atualizaListaUsuarioNovo(response) {
    console.log(response);
    let { id, nome, email, altura, peso } = response.data;
    let obj = { "id": id, "nome": nome, "email": email, "altura": altura, "peso": peso };
    let users = usuarios;
    users.push(obj);
    setUsuarios(users);
    setAtualizacao(obj);
  }

  function apagarUsuario(cod) {
    axios.delete(url + cod)
    .then(() => {
      setUsuarios(usuarios.filter(item => item.id !== cod));})
    .catch( (erro) => console.log(erro) )
  }

  return (
    <UsuarioContext.Provider value={{ id, nome, email, altura, peso, setId, setNome, setEmail, setAltura, setPeso, buscarUsuarios, gravarDados, usuarios, apagarUsuario, atualizacao }} >
      {children}
    </UsuarioContext.Provider>
  )
}
