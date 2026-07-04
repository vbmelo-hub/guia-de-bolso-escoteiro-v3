import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraInferior from '../componentes/BarraInferior';
import BarraSuperior from '../componentes/BarraSuperior';
import { amarras, textoIntroducaoAmarras } from '../dados/amarras';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  bordaVideo: '#334127',
  iconeControle: '#223018',
};

const TAMANHOS = {
  margemHorizontal: 20,
  larguraMaximaConteudo: 330,
  alturaVideo: 160,
  raioVideo: 18,
  zoomThumb: 1,
};

function abrirVideo(videoId) {
  Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
}

function VideoComThumb({ item }) {
  return (
    <View style={estilos.areaVideo}>
      <TouchableOpacity
        activeOpacity={0.86}
        style={estilos.thumbBotao}
        onPress={() => abrirVideo(item.videoId)}
      >
        <Image
          source={item.thumb}
          resizeMode="cover"
          style={[
            estilos.thumb,
            { transform: [{ scale: TAMANHOS.zoomThumb }] },
          ]}
        />
        <View style={estilos.controlesFalsos}>
          <Feather
            name="play"
            size={17}
            color={CORES.iconeControle}
            style={estilos.iconePlay}
          />
          <Text style={estilos.textoAbrirVideo}>Abrir no YouTube</Text>
          <Feather name="external-link" size={15} color={CORES.iconeControle} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function TelaAmarras({ navigation }) {
  const { height } = useWindowDimensions();

  return (
    <View style={[estilos.tela, { height }]}>
      <BarraSuperior />

      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.tituloSessao}>Amarras Escoteiras</Text>

          <Text style={estilos.textoIntrodutorio}>
            {textoIntroducaoAmarras}
          </Text>

          {amarras.map((item) => (
            <View key={item.id} style={estilos.cartaoAmarra}>
              <Text style={estilos.nomeAmarra}>{item.nome}</Text>

              <VideoComThumb item={item} />
            </View>
          ))}
        </View>
      </ScrollView>

      <BarraInferior navigation={navigation} />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    width: '100%',
    backgroundColor: CORES.fundo,
    overflow: 'hidden',
  },
  areaRolavel: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudoRolavel: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: TAMANHOS.margemHorizontal,
    paddingTop: 17,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },
  tituloSessao: {
    marginBottom: 19,
    fontFamily: FONTES.titulo,
    fontSize: 18,
    lineHeight: 23,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntrodutorio: {
    marginBottom: 11,
    fontFamily: FONTES.corpo,
    fontSize: 11,
    lineHeight: 14,
    color: CORES.texto,
  },
  cartaoAmarra: {
    marginBottom: 14,
  },
  nomeAmarra: {
    marginBottom: 7,
    fontFamily: FONTES.titulo,
    fontSize: 20,
    lineHeight: 24,
    color: CORES.titulo,
    textAlign: 'center',
  },
  areaVideo: {
    width: '100%',
    height: TAMANHOS.alturaVideo,
    overflow: 'hidden',
    backgroundColor: CORES.verde,
    borderWidth: 2,
    borderColor: CORES.bordaVideo,
    borderRadius: TAMANHOS.raioVideo,
  },
  thumbBotao: {
    flex: 1,
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  controlesFalsos: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconePlay: {
    marginRight: 'auto',
  },
  textoAbrirVideo: {
    marginRight: 8,
    fontFamily: FONTES.corpoSemibold,
    fontSize: 11,
    lineHeight: 14,
    color: CORES.iconeControle,
  },
});
