import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 50,
        paddingTop: 20,
    },
    tituloPrincipal: {
        fontSize: 25,
        fontWeight: "bold",
        width: "90%",
        backgroundColor: "#196e50",
        padding: 5,
        height: 50,
        textAlign: "center",
        color: "#FFF",
        borderRadius: 5,
        marginBottom: 40,
    },
    legendaNome: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    legendaTelefone: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    campoNome: {
        fontSize: 16,
        width: '100%',
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: "#032b1d",
        marginBottom: 10,
    },
    campoTelefone: {
        fontSize: 16,
        width: '100%',
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: "#032b1d",
        marginBottom: 10,
    },
    caixaTexto: {
        borderColor: "#000",
        borderWidth: 2,
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    botao: {
        width: '30%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#164cb8',
    },
    botaoApagarTudo: {
        backgroundColor: 'red',
    },
    botaoSalvar: {
        width: "40%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#164cb8",
        alignItems: "center",
        justifyContent: "center",
    },
    botaoCarregar: {
        width: "40%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#717785",
        alignItems: "center",
        justifyContent: "center",
    },
    areaDados: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },
    areaBotoes: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%",
        marginTop: 30,
        marginBottom: 20,
    },
    textoBotao: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#FFF",
    },
    areaCadastro: {
        flexDirection: "row",
        width: "90%",
        paddingHorizontal: 10,
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    areaCadastroEmail: {
        flexDirection: "row",
        width: "90%",
        paddingHorizontal: 10,
        marginBottom: 15,
        justifyContent: 'center',
    },
    areaEmail: {
        width: '100%',
    },
    areaNome: {
        width: '48%',
    },
    areaTelefone: {
        width: '48%',
    },
    listaContatos: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        marginTop: 20,        
    },
    contato: {
        backgroundColor: '#0ddb90',
        flexDirection: 'column',
        minHeight: 80,
        width: '90%',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        width: '100%',
    },
    cardContent: {
        width: '100%',
    },
    listaNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#032b1d',
    },
    dadosListaTelefone: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    dadosListaEmail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    dadosBotoesAcao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 80,
    },
    listaTelefone: {
        color: "#032b1d",
        fontSize: 16,
    },
    email: {
        color: "#032b1d",
        fontSize: 16,
    },
    labelCampo: {
        fontSize: 30,
    },
    imagem: {
        width: 100,
        height: 100,
    },
    iconeLimpar: {
        fontSize: 40,
    },
    senhaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    botaoMostrarSenha: {
        position: 'absolute',
        right: 10,
        height: 40,
        justifyContent: 'center',
    }
});

export default styles;