module.exports = function(api) {
  // O cache ajuda o Babel a não reprocessar arquivos desnecessariamente
  api.cache(true); 

  return {
    // Este é o preset padrão do Expo. É OBRIGATÓRIO para que o React Native funcione.
    presets: ['babel-preset-expo'], 
    
    // Lista de plugins onde você adicionará o react-native-dotenv
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // Como você vai importar (ex: import { VAR } from '@env')
          path: '.env',       // Nome e caminho do seu arquivo de variáveis
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};