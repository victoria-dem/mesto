const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: { main: './pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [ // rules — это массив правил
          // добавим в него объект правил для бабеля
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            loader: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
           //  правило для обработки файлов
    {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff2)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // применять это правило только к CSS-файлам
          test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        loader: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              // добавьте объект options
              options: { importLoaders: 1 }
            },
            'postcss-loader'
          ]
      },
      new MiniCssExtractPlugin(),
          ]
      },
      plugins: [
          new HtmlWebpackPlugin({
        template: './index.html' // путь к файлу index.html
      })
    ] 
};