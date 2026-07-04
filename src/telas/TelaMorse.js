import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraInferior from '../componentes/BarraInferior';
import BarraSuperior from '../componentes/BarraSuperior';
import {
  alfabetoMorse,
  codigoMorse,
  textoIntroducaoMorse,
} from '../dados/morse';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  verdeClaro: '#C7D0BC',
  verdeMedio: '#E0E3D8',
  borda: '#D8D8D8',
  placeholder: '#A8A8A8',
  branco: '#FFFFFF',
};

const TAMANHOS = {
  margemHorizontal: 28,
  larguraMaximaConteudo: 330,
};

function converterParaMorse(texto) {
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .map((palavra) =>
      palavra
        .split('')
        .map((caractere) => codigoMorse[caractere] || '')
        .filter(Boolean)
        .join(' ')
    )
    .filter(Boolean)
    .join(' / ');
}

export default function TelaMorse({ navigation }) {
  const { height } = useWindowDimensions();
  const [mensagem, setMensagem] = useState('');

  const mensagemConvertida = useMemo(
    () => converterParaMorse(mensagem),
    [mensagem]
  );

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
          <Text style={estilos.tituloSessao}>Código Morse</Text>

          <Text style={estilos.textoIntrodutorio}>
            {textoIntroducaoMorse}
          </Text>

          <TextInput
            style={estilos.campoMensagem}
            value={mensagem}
            onChangeText={setMensagem}
            placeholder="Digite uma mensagem"
            placeholderTextColor={CORES.placeholder}
            multiline
          />

          <View style={estilos.cartaoResultado}>
            <Text style={estilos.rotuloResultado}>Resultado</Text>
            <Text style={estilos.textoResultado}>
              {mensagemConvertida || 'A mensagem em Morse aparecerá aqui.'}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.84}
            style={estilos.botaoLimpar}
            onPress={() => setMensagem('')}
          >
            <Feather name="trash-2" size={15} color={CORES.branco} />
            <Text style={estilos.textoBotaoLimpar}>LIMPAR</Text>
          </TouchableOpacity>

          <Text style={estilos.subtitulo}>Tabela rápida</Text>

          <View style={estilos.gradeMorse}>
            {alfabetoMorse.map((item) => (
              <View key={item.caractere} style={estilos.cartaoMorse}>
                <Text style={estilos.caractereMorse}>{item.caractere}</Text>
                <Text style={estilos.codigoMorse}>{item.codigo}</Text>
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
    paddingTop: 24,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },
  tituloSessao: {
    marginBottom: 16,
    fontFamily: FONTES.titulo,
    fontSize: 24,
    lineHeight: 29,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntrodutorio: {
    marginBottom: 15,
    fontFamily: FONTES.corpo,
    fontSize: 13,
    lineHeight: 18,
    color: CORES.texto,
  },
  campoMensagem: {
    width: '100%',
    minHeight: 88,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: FONTES.corpo,
    fontSize: 14,
    lineHeight: 18,
    color: CORES.texto,
    textAlignVertical: 'top',
    backgroundColor: CORES.fundo,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 8,
  },
  cartaoResultado: {
    width: '100%',
    minHeight: 86,
    marginBottom: 12,
    padding: 12,
    backgroundColor: CORES.verdeMedio,
    borderRadius: 10,
  },
  rotuloResultado: {
    marginBottom: 6,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 12,
    lineHeight: 15,
    color: CORES.verde,
  },
  textoResultado: {
    fontFamily: FONTES.corpoSemibold,
    fontSize: 15,
    lineHeight: 21,
    color: CORES.texto,
  },
  botaoLimpar: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 18,
    paddingHorizontal: 16,
    backgroundColor: CORES.verde,
    borderRadius: 6,
  },
  textoBotaoLimpar: {
    marginLeft: 6,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 12,
    lineHeight: 15,
    color: CORES.branco,
  },
  subtitulo: {
    marginBottom: 10,
    fontFamily: FONTES.titulo,
    fontSize: 21,
    lineHeight: 25,
    color: CORES.titulo,
    textAlign: 'center',
  },
  gradeMorse: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cartaoMorse: {
    width: '23%',
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: CORES.verdeClaro,
    borderRadius: 8,
  },
  caractereMorse: {
    fontFamily: FONTES.corpoNegrito,
    fontSize: 14,
    lineHeight: 17,
    color: CORES.verde,
  },
  codigoMorse: {
    fontFamily: FONTES.corpoSemibold,
    fontSize: 11,
    lineHeight: 14,
    color: CORES.texto,
  },
});
