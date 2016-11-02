# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 80, host: 8000
  config.vm.synced_folder ".", "/srv"
  config.vm.hostname = "e-shop.dev"

  config.vm.provider :virtualbox do |v|
      v.customize [
          "modifyvm", :id,
          "--memory", 2048,
          "--cpus", 2,
          "--name", "e-shop"
      ]
  end

  config.vm.provision :shell, path: "bootstrap.sh"
end
