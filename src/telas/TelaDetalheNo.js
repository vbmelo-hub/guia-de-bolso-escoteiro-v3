import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraInferior from '../componentes/BarraInferior';
import BarraSuperior from '../componentes/BarraSuperior';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#4B4B4B',
  texto: '#243142',
  destaque: '#222222',
  verde: '#5F6D49',
  verdeClaro: '#C7D0BC',
  branco: '#FFFFFF',
};

const TAMANHOS = {
  margemHorizontal: 22,
  larguraMaximaConteudo: 320,
  alturaVideo: 124,
};

function LinhaTexto({ children }) {
  return <Text style={estilos.textoInstrucao}>{children}</Text>;
}

function abrirVideo(videoId) {
  Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
}

export default function TelaDetalheNo({ route, navigation }) {
  const { no } = route.params;

  return (
    <View style={estilos.tela}>
      <BarraSuperior />

      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>{no.nome}</Text>

          <TouchableOpacity
            activeOpacity={0.84}
            style={estilos.areaVideo}
            onPress={() => abrirVideo(no.videoId)}
          >
            <Feather name="play-circle" size={38} color={CORES.branco} />
            <Text style={estilos.textoVideo}>Abrir vídeo no YouTube</Text>
            <Feather name="external-link" size={17} color={CORES.branco} />
          </TouchableOpacity>

          <Text style={estilos.subtitulo}>Como Fazer:</Text>

          <LinhaTexto>Regra de Ouro: "{no.regra}"</LinhaTexto>

          {no.passos.map((passo, indice) => (
            <LinhaTexto key={passo}>
              {indice + 1}. {passo}
            </LinhaTexto>
          ))}

          <Text style={estilos.rotulo}>Usos:</Text>

          {no.usos.map((uso) => (
            <LinhaTexto key={uso}>{uso}</LinhaTexto>
          ))}

          {no.cuidado ? (
            <LinhaTexto>
              <Text style={estilos.rotuloInline}>Cuidado: </Text>
              {no.cuidado}
            </LinhaTexto>
          ) : null}
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
    paddingTop: 21,
    paddingBottom: 28,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },
  titulo: {
    marginBottom: 12,
    fontFamily: FONTES.titulo,
    fontSize: 22,
    lineHeight: 27,
    color: CORES.titulo,
    textAlign: 'center',
  },
  areaVideo: {
    width: '100%',
    height: TAMANHOS.alturaVideo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
    paddingHorizontal: 12,
    backgroundColor: CORES.verde,
    borderRadius: 14,
  },
  textoVideo: {
    flex: 1,
    marginHorizontal: 10,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.branco,
    textAlign: 'center',
  },
  subtitulo: {
    marginBottom: 9,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 12,
    lineHeight: 15,
    color: CORES.destaque,
  },
  textoInstrucao: {
    marginBottom: 10,
    fontFamily: FONTES.corpo,
    fontSize: 10.5,
    lineHeight: 13.5,
    color: CORES.texto,
  },
  rotulo: {
    marginBottom: 1,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 10.5,
    lineHeight: 13.5,
    color: CORES.texto,
  },
  rotuloInline: {
    fontFamily: FONTES.corpoNegrito,
  },
});
