import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {

  const [nome, setNome] = useState();
  const [codigo, setCodigo] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [confirmaSenha, setConfirmaSenha] = useState();

  const [usuarios, setUsuarios] = useState([]);
  const storage_name = '@usuarios';

  useEffect(
    () => {
      carregaDados();
      console.log('carregando a tela pela 1a vez');
    }, []);

  async function salvaDados() {

    //let novoRegistro = !id;
    let userIndex = usuarios.findIndex(c => c.id == id);
    let novoRegistro = userIndex < 0;

    let usuario = {
      codigo,
      nome,
      email,
      senha,
      confirmaSenha
    };

    const validations = [
      {
        condition: !(codigo.length == 0 || nome.length == 0 || email.length == 0 || senha.length == 0 || confirmaSenha.length == 0),
        message: "Todos os campos devem ser preenchidos."
      },
      {
        condition: senha === confirmaSenha,
        message: "As senhas não coincidem."
      },
      {
        condition: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Email inválido."
      },
      {
        condition: !(isNaN(codigo) || codigo <= 0),
        message: "Código deve ser maior que zero."
      },
      {
        condition: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/.test(senha),
        message: "Senha deve ter ao menos 1 caractere maiúsculo, 1 número e no mínimo 5 caracteres."
      }
    ]

    for (let validation of validations) {
      if (!validation.condition) {
        Alert.alert(validation.message);
        return;
      }
    }

    try {
      if (novoRegistro){
        usuarios.push(usuario); // inclusão
      } else {
        if (userIndex >= 0) {
          usuarios[userIndex] = usuario;  // alteração
          console.log('Encontrei o objeto para alterar. Estava na posição: ' + userIndex);
        }
      }
      const jsonValue = JSON.stringify(contatos);
      await AsyncStorage.setItem(storage_name, jsonValue);
      Keyboard.dismiss();
      limparCampos();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function carregaDados() {
    try {
      const jsonValue = await AsyncStorage.getItem(storage_name)
      if (jsonValue != null) {
        setUsuarios(JSON.parse(jsonValue));
      }
      else {
        setUsuarios([]);
      }

    } catch (e) {
      Alert.alert(e.toString());
    }
  }


  function editar(identificador) {
    const usuario = usuarios.find(us => us.id == identificador);

    if (usuario) { 
      setCodigo(usuario.codigo);
      setNome(usuario.nome);
      setEmail(usuario.email);
      setSenha(usuario.senha);
      setConfirmaSenha(usuario.confirmaSenha);
    }

    console.log(contato);
  }


  function limparCampos() {
    setNome("");
    setCodigo("");
    setEmail("");
    setSenha("");
    setConfirmaSenha("");
    Keyboard.dismiss();
  }


  async function efetivaExclusaoTodosRegistros() {
    try {
      await AsyncStorage.removeItem(storage_name);
      Alert.alert('Registros removidos!');
      await carregaDados();
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  function apagarTudo() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os contatos?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            efetivaExclusaoTodosRegistros();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }


  function removerElemento(identificador) {

    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverContato(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverContato(identificador) {
    try {
      const contatoAux = contatos.filter(contato => contato.id != identificador);
      const jsonValue = JSON.stringify(contatoAux);
      await AsyncStorage.setItem(storage_name, jsonValue);
      Keyboard.dismiss();
      Alert.alert('Contato apagado com sucesso!!!');
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: 'blue', width: '100%', textAlign: 'center' }}>
        Agenda de Contatos - v1.0</Text>
      <Text /><Text />

      <View style={styles.areaDados}>

        <View style={styles.areaNome}>
          <Text style={styles.labelCampo}>Nome</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setNome(texto)}
            value={nome} />
        </View>

        <View style={styles.areaTelefone}>
          <Text style={styles.labelCampo}>Telefone</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setTelefone(texto)}
            value={telefone}
            keyboardType='phone-pad' />
        </View>

      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotao}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos} contentContainerStyle={{ alignItems: 'center' }} >
        {
          contatos.map((contato, index) => (
            <View style={styles.contato} key={index.toString()}>

              <Text style={styles.listaNome}> {contato.nome}</Text>
              <View style={styles.dadosListaTelefone}>
                <Text style={styles.listaTelefone} >{contato.telefone} </Text>
              </View>

              <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(contato.id)}>
                  <FontAwesome name="remove" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(contato.id)}>
                  <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

              </View>
            </View>
          ))
        }
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

