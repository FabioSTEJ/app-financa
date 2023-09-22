import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Inicio() {
  const [saldo, setSaldo] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [exibirSaldo, setExibirSaldo] = useState('');
  const [historico, setHistorico] = useState([]);

  // Função para carregar o saldo e o histórico a partir do AsyncStorage
  const carregarDados = async () => {
    try {
      const saldoArmazenado = await AsyncStorage.getItem('saldo');
      if (saldoArmazenado !== null) {
        setSaldo(parseFloat(saldoArmazenado));
      }

      const historicoArmazenado = await AsyncStorage.getItem('historico');
      if (historicoArmazenado !== null) {
        setHistorico(JSON.parse(historicoArmazenado));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Função para salvar o saldo e o histórico no AsyncStorage
  const salvarDados = async () => {
    try {
      await AsyncStorage.setItem('saldo', saldo.toString());
      await AsyncStorage.setItem('historico', JSON.stringify(historico));
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
    }
  };

  // Função para atualizar o saldo e o histórico
  const atualizarDados = () => {
    salvarDados();
    setExibirSaldo(saldo);
  };

  const handleChange = (texto) => {
    setQuantidade(texto);
  };

  const handleAdicionarSaldo = () => {
    const valor = parseFloat(quantidade);
    if (!isNaN(valor)) {
      setSaldo(saldo + valor);
      setHistorico([...historico, { tipo: 'Adição', valor }]);
      atualizarDados();
    }
  };

  const handleRetirarSaldo = () => {
    const valor = parseFloat(quantidade);
    if (!isNaN(valor) && valor <= saldo) {
      setSaldo(saldo - valor);
      setHistorico([...historico, { tipo: 'Retirada', valor }]);
      atualizarDados();
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Adicione ou retire uma Quantidade"
        onChangeText={handleChange}
        value={quantidade}
      />
      <Button title="Adicionar" onPress={handleAdicionarSaldo} />
      <Button title="Retirar" onPress={handleRetirarSaldo} />
      {exibirSaldo !== '' && (
        <Text style={{ marginTop: 10 }}>Saldo: {exibirSaldo}</Text>
      )}
      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>
        Histórico:
      </Text>
      <FlatList
        data={historico}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.tipo === 'Adição' ? 'Adicionado' : 'Retirado'}: R${' '}
            {item.valor.toFixed(2)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}
