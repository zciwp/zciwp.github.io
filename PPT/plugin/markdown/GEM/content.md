# gem & rvm



gem和rvm都是包管理工具，但rvm只是ruby的包管理，它可以提供一个便捷的多版本ruby环境的管理和切换。


## gem常用命令

	# 更新Gem自身，需要admin/root权限
	# 注意：在某些linux发行版中为了系统稳定性此命令禁止执行
	$ gem update --system

	# 从Gem源安装gem包
	$ gem install [gemname]

	# 从本机安装gem包
	$ gem install -l [gemname].gem

	# 安装指定版本的gem包
	$ gem install [gemname] --version=[ver]

	# 更新所有已安装的gem包
	$ gem update

	# 更新指定的gem包
	# 注意：gem update [gemname]不会升级旧版本的包，此时你可以使用 gem install [gemname] --version=[ver]代替
	$ gem update [gemname]

	# 删除指定的gem包，注意此命令将删除所有已安装的版本
	$ gem uninstall [gemname]

	# 删除某指定版本gem
	$ gem uninstall [gemname] --version=[ver]

	# 查看本机已安装的所有gem包
	$ gem list [--local]



## gem更改源

因为在很多时候，在安装gem的过程中会出现找不到资源的error，我们就需要从另外一个gem服务器去下载安装。

通过gem sources命令配置源，或修改Gemfile中的source语句实现。

常用源：

https://rubygems.org

http://gems.github.com

http://gems.rubyforge.org

http://ruby.taobao.org

显示当前使用的sources

	gem sources

添加一个source

	gem sources -a url

删除一个source

	gem sources -r url

更新source cache

	gem sources -u
	


## rvm

所有命令都是在用户权限下操作的，任何命令最好不要用sodu。

<div class="space"></div>

rvm的安装

$ curl -L get.rvm.io | bash -s stable (第一次没翻墙安装不成功，翻墙后安装成功了，不知道是不是网络不好造成的，不翻墙不知道可不可以安装成功。)

$ source ~/.bashrc

$ source ~/.bash_profile

** 修改RVM的Ruby 安装源到国内的[淘宝镜像服务器](http://ruby.taobao.org)，提高安装速度 **

$ sed -i -e 's/ftp\.ruby-lang\.org\/pub\/ruby/ruby\.taobao\.org\/mirrors\/ruby/g' ~/.rvm/config/db

ruby的安装与切换

列出已知的ruby版本

rvm list known

安装一个ruby版本

rvm install 1.9.3

这里安装了最新的1.9.3, rvm list known列表里面的都可以拿来安装。

使用一个ruby版本

rvm use 1.9.3

如果想设置为默认版本，可以这样

rvm use 1.9.3 --default 

查询已经安装的ruby

rvm list

卸载一个已安装版本

rvm remove 1.9.2














