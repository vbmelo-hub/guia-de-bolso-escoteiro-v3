import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FONTES } from '../estilos/fontes';

const CORES = {
  fundo: '#5F6D49',
  fundoItemAtivo: '#9BAA86',
  texto: '#FFFFFF',
  numero: '#5F6D49',
  fundoNumero: '#E5E9DC',
  sombra: '#000000',
  sobreposicao: 'rgba(0, 0, 0, 0.22)',
};

const TAMANHOS = {
  altura: 57,
  margemLateral: 18,
  icone: 22,
  larguraMenu: '85%',
  larguraMaximaMenu: 310,
};

const ITENS_MENU = [
  {
    titulo: 'Início',
    rota: 'Início',
    icone: 'home',
  },
  {
    titulo: 'Nós',
    rota: 'Nós Escoteiros',
    numero: '1',
    rotasAtivas: ['Nós Escoteiros', 'Detalhe do Nó'],
  },
  {
    titulo: 'Amarras',
    rota: 'Amarras',
    numero: '2',
  },
  {
    titulo: 'Leis Escoteiras',
    rota: 'Leis Escoteiras',
    numero: '3',
  },
  {
    titulo: 'Acampamento',
    rota: 'Acampamento',
    numero: '4',
  },
  {
    titulo: 'Bússola',
    rota: 'Bússola',
    numero: '5',
  },
  {
    titulo: 'Código Morse',
    rota: 'Código Morse',
    numero: '6',
  },
];

const ITEM_SOBRE = {
  titulo: 'Sobre',
  rota: 'Sobre',
  icone: 'info',
};

export default function BarraSuperior() {
  const navigation = useNavigation();
  const route = useRoute();
  const [menuAberto, setMenuAberto] = useState(false);

  function navegarPara(rota) {
    setMenuAberto(false);
    navigation.navigate(rota);
  }

  function itemEstaAtivo(item) {
    const rotasAtivas = item.rotasAtivas || [item.rota];
    return rotasAtivas.includes(route.name);
  }

  return (
    <>
      <View style={estilos.barra}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={estilos.botaoMenu}
          onPress={() => setMenuAberto(true)}
          accessibilityLabel="Abrir menu"
        >
          <Feather name="menu" size={TAMANHOS.icone} color={CORES.texto} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={menuAberto}
        animationType="fade"
        onRequestClose={() => setMenuAberto(false)}
      >
        <View style={estilos.areaMenu}>
          <View style={estilos.menuLateral}>
            <View style={estilos.listaMenu}>
              {ITENS_MENU.map((item) => {
                const ativo = itemEstaAtivo(item);

                return (
                  <TouchableOpacity
                    key={item.rota}
                    activeOpacity={0.82}
                    style={[
                      estilos.itemMenu,
                      ativo ? estilos.itemMenuAtivo : null,
                    ]}
                    onPress={() => navegarPara(item.rota)}
                  >
                    {item.icone ? (
                      <Feather
                        name={item.icone}
                        size={27}
                        color={CORES.texto}
                        style={estilos.iconeItem}
                      />
                    ) : (
                      <View style={estilos.numeroItem}>
                        <Text style={estilos.textoNumero}>{item.numero}</Text>
                      </View>
                    )}

                    <Text style={estilos.textoItem}>{item.titulo}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              activeOpacity={0.82}
              style={[
                estilos.itemMenu,
                estilos.itemSobre,
                itemEstaAtivo(ITEM_SOBRE) ? estilos.itemMenuAtivo : null,
              ]}
              onPress={() => navegarPara(ITEM_SOBRE.rota)}
            >
              <Feather
                name={ITEM_SOBRE.icone}
                size={24}
                color={CORES.texto}
                style={estilos.iconeItem}
              />

              <Text style={estilos.textoItem}>{ITEM_SOBRE.titulo}</Text>
            </TouchableOpacity>
          </View>

          <Pressable
            style={estilos.sobreposicao}
            onPress={() => setMenuAberto(false)}
          />
        </View>
      </Modal>
    </>
  );
}

const estilos = StyleSheet.create({
  barra: {
    width: '100%',
    height: TAMANHOS.altura,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: TAMANHOS.margemLateral,
    backgroundColor: CORES.fundo,
  },
  botaoMenu: {
    width: 38,
    height: 38,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  areaMenu: {
    flex: 1,
    flexDirection: 'row',
  },
  menuLateral: {
    width: TAMANHOS.larguraMenu,
    maxWidth: TAMANHOS.larguraMaximaMenu,
    justifyContent: 'space-between',
    backgroundColor: CORES.fundo,
    shadowColor: CORES.sombra,
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  sobreposicao: {
    flex: 1,
    backgroundColor: CORES.sobreposicao,
  },
  listaMenu: {
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  itemMenu: {
    width: '100%',
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  itemMenuAtivo: {
    backgroundColor: CORES.fundoItemAtivo,
  },
  itemSobre: {
    width: undefined,
    marginHorizontal: 10,
    marginBottom: 24,
  },
  iconeItem: {
    width: 28,
    marginRight: 12,
  },
  numeroItem: {
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 19,
    backgroundColor: CORES.fundoNumero,
    borderRadius: 3,
  },
  textoNumero: {
    fontFamily: FONTES.corpoNegrito,
    fontSize: 13,
    lineHeight: 16,
    color: CORES.numero,
  },
  textoItem: {
    fontFamily: FONTES.corpoNegrito,
    fontSize: 14,
    lineHeight: 18,
    color: CORES.texto,
  },
});
