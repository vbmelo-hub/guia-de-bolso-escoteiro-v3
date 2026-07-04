import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SITE_ESCOTEIROS_BRASIL = 'https://www.escoteiros.org.br/';

const CORES = {
  fundo: '#CCD5C4',
  botaoHome: '#95A382',
  icone: '#FFFFFF',
  bordaHome: '#FFFFFF',
};

const TAMANHOS = {
  altura: 53,
  iconeLateral: 31,
  iconeHome: 28,
  larguraBotaoLateral: 86,
  tamanhoBotaoHome: 72,
  bordaBotaoHome: 5,
};

export default function BarraInferior({ navigation }) {
  function voltarPaginaAnterior() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function irParaInicio() {
    navigation.navigate('Início');
  }

  function abrirSiteOficial() {
    Linking.openURL(SITE_ESCOTEIROS_BRASIL);
  }

  return (
    <View style={estilos.barra}>
      <TouchableOpacity
        activeOpacity={0.75}
        style={estilos.botaoLateral}
        onPress={voltarPaginaAnterior}
        accessibilityLabel="Voltar"
      >
        <Feather
          name="arrow-left"
          size={TAMANHOS.iconeLateral}
          color={CORES.icone}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={estilos.botaoHome}
        onPress={irParaInicio}
        accessibilityLabel="Ir para início"
      >
        <Feather name="home" size={TAMANHOS.iconeHome} color={CORES.icone} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.75}
        style={estilos.botaoLateral}
        onPress={abrirSiteOficial}
        accessibilityLabel="Abrir site oficial dos Escoteiros do Brasil"
      >
        <Feather name="link" size={TAMANHOS.iconeLateral} color={CORES.icone} />
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    width: '100%',
    height: TAMANHOS.altura,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CORES.fundo,
    paddingHorizontal: 36,
  },
  botaoLateral: {
    width: TAMANHOS.larguraBotaoLateral,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoHome: {
    position: 'absolute',
    top: -10,
    left: '50%',
    width: TAMANHOS.tamanhoBotaoHome,
    height: TAMANHOS.tamanhoBotaoHome,
    marginLeft: -(TAMANHOS.tamanhoBotaoHome / 2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.botaoHome,
    borderWidth: TAMANHOS.bordaBotaoHome,
    borderColor: CORES.bordaHome,
    borderRadius: TAMANHOS.tamanhoBotaoHome / 2,
  },
});
