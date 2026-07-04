import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FONTES } from '../estilos/fontes';
import BarraInferior from '../componentes/BarraInferior';
import BarraSuperior from '../componentes/BarraSuperior';
import { nosEscoteiros, textoIntroducaoNos } from '../dados/nos';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  verdeClaro: '#C7D0BC',
  cartao: '#F8F8F1',
  sombra: '#000000',
};

const TAMANHOS = {
  margemHorizontal: 30,
  larguraMaximaConteudo: 330,
  espacoGrade: 10,
  alturaCartaoPrincipal: 102,
  alturaBotaoLista: 47,
  raioBorda: 14,
  zoomImagemPrincipal: 1,
};

function abrirDetalhe(navigation, no) {
  navigation.navigate('Detalhe do Nó', { no });
}

function CartaoNoPrincipal({ no, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.84}
      style={estilos.cartaoPrincipal}
      onPress={() => abrirDetalhe(navigation, no)}
    >
      <View style={estilos.areaImagemPrincipal}>
        <Image
          source={no.imagemMenu}
          resizeMode="cover"
          style={[
            estilos.imagemPrincipal,
            { transform: [{ scale: TAMANHOS.zoomImagemPrincipal }] },
          ]}
        />
      </View>
      <Text style={estilos.textoCartaoPrincipal}>{no.nome}</Text>
    </TouchableOpacity>
  );
}

function BotaoNoGeral({ no, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.84}
      style={estilos.botaoNoGeral}
      onPress={() => abrirDetalhe(navigation, no)}
    >
      <Text style={estilos.textoNoGeral}>{no.nomeLista || no.nome}</Text>
    </TouchableOpacity>
  );
}

export default function TelaNos({ navigation }) {
  const principaisNos = nosEscoteiros.filter((no) => no.categoria === 'principal');
  const nosGerais = nosEscoteiros.filter((no) => no.categoria === 'geral');

  return (
    <View style={estilos.tela}>
      <BarraSuperior />

      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>Nós Escoteiros</Text>

          <Text style={estilos.textoIntroducao}>{textoIntroducaoNos}</Text>

          <Text style={estilos.subtitulo}>Principais Nós</Text>

          <View style={estilos.grade}>
            {principaisNos.map((no) => (
              <CartaoNoPrincipal key={no.id} no={no} navigation={navigation} />
            ))}
          </View>

          <Text style={estilos.subtitulo}>Nós Gerais</Text>

          <View style={estilos.lista}>
            {nosGerais.map((no) => (
              <BotaoNoGeral key={no.id} no={no} navigation={navigation} />
            ))}
          </View>
        </View>
      </ScrollView>

      <BarraInferior navigation={navigation} />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  areaRolavel: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudoRolavel: {
    alignItems: 'center',
    paddingHorizontal: TAMANHOS.margemHorizontal,
    paddingTop: 19,
    paddingBottom: 26,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },
  titulo: {
    marginBottom: 19,
    fontFamily: FONTES.titulo,
    fontSize: 22,
    lineHeight: 27,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntroducao: {
    marginBottom: 9,
    fontFamily: FONTES.corpo,
    fontSize: 12,
    lineHeight: 15,
    color: CORES.texto,
    textAlign: 'left',
  },
  subtitulo: {
    marginTop: 5,
    marginBottom: 9,
    fontFamily: FONTES.titulo,
    fontSize: 21,
    lineHeight: 25,
    color: CORES.titulo,
    textAlign: 'center',
  },
  grade: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cartaoPrincipal: {
    width: '48%',
    height: TAMANHOS.alturaCartaoPrincipal,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: TAMANHOS.espacoGrade,
    paddingBottom: 8,
    backgroundColor: CORES.cartao,
    borderWidth: 1.5,
    borderColor: CORES.verde,
    borderRadius: TAMANHOS.raioBorda,
    shadowColor: CORES.sombra,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  areaImagemPrincipal: {
    position: 'absolute',
    top: 7,
    width: '100%',
    height: 62,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemPrincipal: {
    width: '100%',
    height: '100%',
  },
  textoCartaoPrincipal: {
    fontFamily: FONTES.titulo,
    fontSize: 13,
    lineHeight: 16,
    color: CORES.titulo,
    textAlign: 'center',
  },
  lista: {
    width: '100%',
  },
  botaoNoGeral: {
    width: '100%',
    height: TAMANHOS.alturaBotaoLista,
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: CORES.verdeClaro,
    borderWidth: 1.5,
    borderColor: CORES.verde,
    borderRadius: 15,
  },
  textoNoGeral: {
    fontFamily: FONTES.titulo,
    fontSize: 13,
    lineHeight: 16,
    color: CORES.verde,
  },
});
