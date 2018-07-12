const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		bundle: ['./app_client/index.js', 
                         './app_client/startPage/start.ctrl.js',
		         './app_client/modalForm/uibModalController.js', 
		         './app_client/updateModalForm/updateTaskModalCtrl.js',
		         './app_client/recordDetail/recordCtrl.js',
		         './app_client/auth/register/register.ctrl.js',
		         './app_client/auth/login/login.ctrl.js',
		         './app_client/common/directives/footerDirective/footer.directive.js',
		         './app_client/common/directives/pageHeader/pageHeader.js',
		         './app_client/home/home.ctrl.js',
		         './app_client/common/services/todoData.js',
                         './app_client/common/services/authentication.service.js']
	},
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
			    test: /\.css$/,
			    use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
			    ]
			},
			{
			    test: /\.less$/,
			    use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'less-loader' }
			    ]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
	    ]
	},
	plugins: [
    	        new HtmlWebpackPlugin({
			template: './app_client/index.html',
			favicon: 'app_client/img/favicon.ico'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
    ]
};
