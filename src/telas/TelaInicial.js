import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FONTES } from '../estilos/fontes';
import BarraInferior from '../componentes/BarraInferior';
import BarraSuperior from '../componentes/BarraSuperior';
import BotaoMenuInicial from '../componentes/BotaoMenuInicial';

const imagemPrincipal = require('../../assets/imagem-tela-principal-sem-fundo.png');
const imagemNos = require('../../assets/menu-no-direito.png');
const imagemAmarras = require('../../assets/menu-amarras.png');
const imagemAcampamento = require('../../assets/menu-acampamento.jpeg');
const imagemLeis = require('../../assets/menu-leis-escoteiras.png');

const CORES = {
  fundo: '#FFFFFF',
  texto: '#4A3828',
};

const TAMANHOS = {
  margemHorizontal: 27,
  larguraMaximaConteudo: 330,
  larguraLogo: 300,
  alturaLogo: 190,
  espacoEntreMenus: 14,
};

const MENUS = [
  {
    nome: 'Nós',
    rota: 'Nós Escoteiros',
    imagem: imagemNos,
    zoom: 1.78,
  },
  {
    nome: 'Amarras',
    rota: 'Amarras',
    imagem: imagemAmarras,
    zoom: 1.7,
  },
  {
    nome: 'Acampamento',
    rota: 'Acampamento',
    imagem: imagemAcampamento,
    zoom: 1.55,
  },
  {
    nome: 'Leis Escoteiras',
    rota: 'Leis Escoteiras',
    imagem: imagemLeis,
    zoom: 1.55,
  },
  {
    nome: 'Bússola',
    rota: 'Bússola',
    imagem: imagemAcampamento,
    zoom: 1.55,
  },
  {
    nome: 'Código Morse',
    rota: 'Código Morse',
    imagem: imagemLeis,
    zoom: 1.55,
  },
];

export default function TelaInicial({ navigation }) {
  return (
    <View style={estilos.tela}>
      <BarraSuperior />

      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <View style={estilos.areaLogo}>
            <Image
              source={imagemPrincipal}
              style={estilos.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={estilos.textoSecao}>Selecione uma seção:</Text>

          <View style={estilos.listaMenus}>
            {MENUS.map((menu, indice) => (
              <View
                key={menu.rota}
                style={indice < MENUS.length - 1 ? estilos.espacoMenu : null}
              >
                <BotaoMenuInicial
                  nome={menu.nome}
                  imagem={menu.imagem}
                  zoom={menu.zoom}
                  onPress={() => navigation.navigate(menu.rota)}
                />
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
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  areaRolavel: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudoRolavel: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: TAMANHOS.margemHorizontal,
    paddingTop: 14,
    paddingBottom: 18,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
    alignItems: 'center',
  },
  areaLogo: {
    width: TAMANHOS.larguraLogo,
    height: TAMANHOS.alturaLogo,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logo: {
    width: '112%',
    height: '100%',
  },
  textoSecao: {
    marginBottom: 13,
    fontFamily: FONTES.titulo,
    fontSize: 17,
    lineHeight: 22,
    color: CORES.texto,
    textAlign: 'center',
  },
  listaMenus: {
    width: '100%',
  },
  espacoMenu: {
    marginBottom: TAMANHOS.espacoEntreMenus,
  },
});
