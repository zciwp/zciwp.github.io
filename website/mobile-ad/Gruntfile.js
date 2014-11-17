module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			options:{
				useAvailablePort:true,
				port:8001,
	        	hostname: 'localhost', //可配置为本机某个 IP，localhost 或域名
				livereload: 35729//声明给 watch 监听的端口
			},
	      livereload: {
	        options: {
	        	
	        }
	      }
	    },
		sass:{
	      dist:{
	        options:{
	          style: 'compressed'
	        },
	        files: [{
	          expand: true,
	          cwd: 'scss',
	          src: ['*.scss'],
	          dest: 'css',
	          ext: '.css'
	        }]
	      }
	    },
	    watch:{
	    	options:{
	    		livereload:'<%=connect.options.livereload%>'//监听前面声明的端口 35729
	    	},
	    	css:{
	    		files:['scss/**.scss'],
	    		tasks:['sass','connect:livereload']
	    	},
	    	html:{
	    		files:['**/*.html'],
	    		tasks:['includes','connect:livereload']
	    	}
	    },
		includes:{
			files:{
				cwd:'pages',
				src:['*.html'],
				dest:'html/',
				options:{
					includePath:'inc/',
					filenameSuffix:'.html'
				}
			}
		},
		imagemin:{
			dist: {
				options: {
				    optimizationLevel: 3 //定义 PNG 图片优化水平
				},
				files: [
			       {
			            expand: true,
			            cwd: 'img/',
			            src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
			            dest: 'img/min/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
			        }
			    ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

  	grunt.registerTask('build', ['connect','includes','watch']);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('min', ['imagemin']);
};