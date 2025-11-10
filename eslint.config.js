// Importar la configuración base de reglas recomendadas de ESLint para JavaScript
const js = require('@eslint/js');

// Exportar un arreglo de configuraciones específicas para ESLint
module.exports = [
  {
    ignores: ['eslint.config.js', 'node_modules/**']
  },
  js.configs.recommended,
  {
    // Configurar los archivos dentro de la carpeta src con extensión .js
    files: ['src/**/*.js'],
    
    // Gestionar opciones del lenguaje para estos archivos
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable'
      }
    },
    
    // Crear reglas de ESLint que se aplicarán a estos archivos
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always']
    }
  }
];
