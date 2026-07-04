import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';

const CORES = {
  fundo: '#FFFDFC',
  destaque: '#5F6D49',
  texto: '#2F3443',
  sombra: '#000000',
};

const TAMANHOS = {
  altura: 63,
  raioBorda: 20,
  larguraImagem: 102,
  larguraBorda: 2,
  tamanhoChevron: 27,
};

export default function BotaoMenuInicial({ imagem, nome, onPress, zoom = 1.45 }) {
  return (
    <TouchableOpacity
      activeOpacity={0.84}
      style={estilos.botao}
      onPress={onPress}
    >
      <View style={estilos.areaImagem}>
        <Image
          source={imagem}
          resizeMode="cover"
          style={[estilos.imagem, { transform: [{ scale: zoom }] }]}
        />
      </View>

      <Text style={estilos.texto}>{nome}</Text>

      <Feather
        name="chevron-right"
        size={TAMANHOS.tamanhoChevron}
        color={CORES.destaque}
      />
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    width: '100%',
    height: TAMANHOS.altura,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: CORES.fundo,
    borderWidth: TAMANHOS.larguraBorda,
    borderColor: CORES.destaque,
    borderRadius: TAMANHOS.raioBorda,
    shadowColor: CORES.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
  areaImagem: {
    width: TAMANHOS.larguraImagem,
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.destaque,
    borderTopLeftRadius: TAMANHOS.raioBorda - TAMANHOS.larguraBorda,
    borderBottomLeftRadius: TAMANHOS.raioBorda - TAMANHOS.larguraBorda,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  texto: {
    flex: 1,
    marginLeft: 13,
    fontFamily: FONTES.titulo,
    fontSize: 24,
    lineHeight: 29,
    color: CORES.texto,
  },
});
