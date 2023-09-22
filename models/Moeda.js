import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const Moeda = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (text) => {
    // Aqui você pode fazer a validação e formatação do valor inserido pelo usuário, se necessário.
    setValue(text);
  };

  return (
    <View>
      <Input
        placeholder="Digite o valor"
        leftIcon={
          <Icon
            name="dollar"
            size={24}
            color="black"
          />
        }
        value={value}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
    </View>
  );
};

export default Moeda;
