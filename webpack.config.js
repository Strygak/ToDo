const path = require('path');

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
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/js')
	},
	module: {
		rules: [
		  {
		    test: /\.css$/,
		    use: [
		      'style-loader',
		      'css-loader'
		    ]
		  }
		]
	}
};
