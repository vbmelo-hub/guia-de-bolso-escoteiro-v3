import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraInferior from '../componentes/BarraInferior';
import BarraSuperior from '../componentes/BarraSuperior';
import { leisEscoteiras, textoIntroducaoLeis } from '../dados/leis';

const LINK_PDF =
  'https://www.escoteiros.org.br/wp-content/uploads/2016/03/Princ%C3%ADpios-Organiza%C3%A7%C3%A3o-e-Regras.pdf';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verdeClaro: '#C7D0BC',
  verdePdf: '#E0E3D8',
  iconePdf: '#6D6D6D',
};

const TAMANHOS = {
  margemHorizontal: 28,
  larguraMaximaConteudo: 330,
};

function abrirPdf() {
  Linking.openURL(LINK_PDF);
}

export default function TelaLeis({ navigation }) {
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
          <Text style={estilos.textoIntrodutorio}>
            {textoIntroducaoLeis}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={estilos.botaoPdf}
            onPress={abrirPdf}
            accessibilityLabel="Abrir PDF de princípios, organização e regras"
          >
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={31}
              color={CORES.iconePdf}
            />
            <Text style={estilos.nomePdf} numberOfLines={1}>
              Principios_Organização_e_Regras.pdf
            </Text>
          </TouchableOpacity>

          <Text style={estilos.tituloSessao}>As 10 Leis Escoteiras</Text>

          <View style={estilos.listaLeis}>
            {leisEscoteiras.map((lei) => (
              <View key={lei} style={estilos.cartaoLei}>
                <Text style={estilos.textoLei}>{lei}</Text>
              </View>
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
    paddingTop: 29,
    paddingBottom: 22,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },
  textoIntrodutorio: {
    marginBottom: 12,
    fontFamily: FONTES.corpo,
    fontSize: 11,
    lineHeight: 14,
    color: CORES.texto,
  },
  botaoPdf: {
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 12,
    backgroundColor: CORES.verdePdf,
    borderRadius: 11,
  },
  nomePdf: {
    flex: 1,
    marginLeft: 7,
    fontFamily: FONTES.corpo,
    fontSize: 11,
    lineHeight: 15,
    color: CORES.texto,
  },
  tituloSessao: {
    marginBottom: 13,
    fontFamily: FONTES.titulo,
    fontSize: 21,
    lineHeight: 25,
    color: CORES.titulo,
    textAlign: 'center',
  },
  listaLeis: {
    width: '100%',
  },
  cartaoLei: {
    width: '100%',
    minHeight: 51,
    justifyContent: 'center',
    marginBottom: 11,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: CORES.verdeClaro,
    borderRadius: 15,
  },
  textoLei: {
    fontFamily: FONTES.corpoSemibold,
    fontSize: 11,
    lineHeight: 14,
    color: CORES.texto,
  },
});
