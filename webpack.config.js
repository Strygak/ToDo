const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./app_client/index.js', 
		      './app_client/modalForm/uibModalController.js', 
					'./app_client/updateModalForm/updateTaskModalCtrl.js',
					'./app_client/recordDetail/recordCtrl.js',
					'./app_client/auth/register/register.ctrl.js',
					'./app_client/auth/login/login.ctrl.js',
					'./app_client/common/directives/footerDirective/footer.directive.js',
					'./app_client/common/directives/pageHeader/pageHeader.js',
					'./app_client/home/home.ctrl.js',
					'./app_client/common/services/todoData.js',
					'./app_client/common/services/authentication.service.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
	},
  plugins: [
    new HtmlWebpackPlugin({
			title: 'ToDo App',
			favicon: 'app_client/img/favicon.ico'
		})
  ],
	module: {
		rules: [
		  {
		    test: /\.css$/,
		    use: [
		      'style-loader',
		      'css-loader'
		    ]
		  }
		],
		rules: [{
      test: /\.less$/,
      loader: 'less-loader'
    }]
	}
};
