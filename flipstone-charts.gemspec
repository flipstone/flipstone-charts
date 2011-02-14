# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "flipstone-charts/version"

Gem::Specification.new do |s|
  s.name        = "flipstone-charts"
  s.version     = Flipstone::Charts::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["David Vollbracht"]
  s.email       = ["david@flipstone.com"]
  s.homepage    = "http://github.com/flipstone/flipstone-chrats"
  s.summary     = %q{Resources for charting used on flipstone apps}
  s.description = %q{}
  s.add_dependency 'rails', '~> 3.0'

  s.rubyforge_project = "flipstone-charts"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
end
