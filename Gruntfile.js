module.exports = function (grunt){

	var settings = {
		less: {
			style: {
				files: { //archivos a compilar
					"style.css":"less/style.less" //destino: origen
				}
			}
		},
		watch:{
			styles:{
				files: ["less/*.less"], //observa cualquier cambio en archivo LESS
				tasks: ["less"], // ejecuta la compilación LESS
				options: {
					spawn: false //para que no se quede tostado (creo)
				}
			}
		}
	};

	//Cargamos la configuración de Grunt
	grunt.initConfig(settings);


	//Cargamos plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//Definimos tareas disponibles para grunt-cli

	grunt.registerTask('default', ['less', 'watch']);
	grunt.registerTask('production',['less']);
};