import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {

  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const storage_name = '@usuarios';

  useEffect(
    () => {
      carregaDados();
      console.log('carregando a tela pela 1a vez');
    }, []);

  async function salvaDados() {

    //let novoRegistro = !id;
    let userIndex = usuarios.findIndex(c => c.codigo == codigo);
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
      const jsonValue = JSON.stringify(usuarios);
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
    const usuario = usuarios.find(us => us.codigo == identificador);

    if (usuario) { 
      setCodigo(usuario.codigo);
      setNome(usuario.nome);
      setEmail(usuario.email);
      setSenha(usuario.senha);
      setConfirmaSenha(usuario.confirmaSenha);
    }

    console.log(usuario);
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
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os usuários?',
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
          onPress: () => efetivaRemoverUsuario(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverUsuario(identificador) {
    try {
      const usuarioAux = usuarios.filter(usuario => usuario.codigo != identificador);
      const jsonValue = JSON.stringify(usuarioAux);
      await AsyncStorage.setItem(storage_name, jsonValue);
      Keyboard.dismiss();
      Alert.alert('Usuário apagado com sucesso!!!');
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>
        Cadastro de múltiplos usuários
      </Text>

      <View style={styles.areaCadastro}>
        <View style={styles.areaNome}>
          <Text style={styles.legendaNome}>Código</Text>
          <TextInput
            style={styles.campoNome}
            onChangeText={(texto) => setCodigo(texto)}
            value={codigo}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.areaTelefone}>
          <Text style={styles.legendaTelefone}>Nome</Text>
          <TextInput
            style={styles.campoTelefone}
            onChangeText={(texto) => setNome(texto)}
            value={nome}
          />
        </View>
      </View>

      <View style={styles.areaCadastroEmail}>
        <View style={styles.areaEmail}>
          <Text style={styles.legendaNome}>E-mail</Text>
          <TextInput
            style={styles.campoNome}
            onChangeText={(email) => setEmail(email)}
            value={email}
            keyboardType='email-address'
          />
        </View>
      </View>

      <View style={styles.areaCadastro}>
        <View style={styles.areaTelefone}>
          <Text style={styles.legendaTelefone}>Senha</Text>
          <View style={styles.senhaContainer}>
            <TextInput
              secureTextEntry={true}
              style={styles.campoTelefone}
              onChangeText={(senha) => setSenha(senha)}
              value={senha}
            />
          </View>
        </View>

        <View style={styles.areaTelefone}>
          <Text style={styles.legendaTelefone}>Confirmar senha</Text>
          <View style={styles.senhaContainer}>
            <TextInput
              secureTextEntry={true}
              style={styles.campoTelefone}
              onChangeText={(confirmarSenha) => setConfirmaSenha(confirmarSenha)}
              value={confirmaSenha}
            />
          </View>
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
          usuarios.map((usuario, index) => (
            <View style={styles.contato} key={index.toString()}>
              <View style={styles.cardHeader}>
                <Text style={styles.listaNome}>Código: {usuario.codigo}</Text>
                <View style={styles.dadosBotoesAcao}>
                  <TouchableOpacity onPress={() => editar(usuario.codigo)}>
                    <Entypo name="edit" size={24} color="#032b1d" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removerElemento(usuario.codigo)}>
                    <FontAwesome name="remove" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.cardContent}>
                <View style={styles.dadosListaTelefone}>
                  <Text style={styles.listaTelefone}>Nome: {usuario.nome}</Text>
                </View>
                <View style={styles.dadosListaEmail}>
                  <Text style={styles.email}>Email: {usuario.email}</Text>
                </View>
              </View>
            </View>
          ))
        }
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

