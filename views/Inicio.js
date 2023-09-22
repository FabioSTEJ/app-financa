import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Inicio(){

    const [adicionarSaldo, setAdicionarSaldo] = useState('');
  const [exibirSaldo, setExibirSaldo] = useState('');

  const handleChange = (texto) => {
    setAdicionarSaldo(texto);
  };

  const handleSubmit = () => {
    setExibirSaldo(adicionarSaldo);

  };

    return(

        <SafeAreaView>
<TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Adicione uma Quantidade"
        onChangeText={handleChange}
        value={adicionarSaldo}
      />
      <Button title="Saldo" onPress={handleSubmit} />
      {exibirSaldo !== '' && (
        <Text style={{ marginTop: 10 }}>Saldo Atual: {exibirSaldo}</Text>
      )}

        </SafeAreaView>

    );
}