require 'rails'

module Flipstone
  module Charts
    class Engine < ::Rails::Engine
      JAVASCRIPTS = %w(
        http://www.google.com/jsapi
        flipstone_charts/gem
      )

      STYLESHEETS = %w(
        flipstone_charts/gem
      )

      if Rails::VERSION::STRING < '3.1'
        initializer "static assets for rails 3.0" do |app|
          app_css = File.join app.root, 'public', 'stylesheets', 'flipstone_charts'
          app_js = File.join app.root, 'public', 'javascripts', 'flipstone_charts'

          gem_css = File.join root, 'app', 'assets', 'stylesheets', 'flipstone_charts'
          gem_js = File.join root, 'app', 'assets', 'javascripts', 'flipstone_charts'

          system "rm -rf #{app_css}; mkdir -p #{app_css}; cp -r #{gem_css}/* #{app_css}/."
          system "rm -rf #{app_js}; mkdir -p #{app_js}; cp -r #{gem_js}/* #{app_js}/."
        end
      end

      initializer "expansions" do
        ActiveSupport.on_load(:action_view) do
          ActionView::Helpers::AssetTagHelper.register_javascript_expansion(
            :defaults => JAVASCRIPTS, :flipstone_charts => JAVASCRIPTS
          )
        end
      end

      # do stylsheets before configuration so we don't kill application.css
      config.before_configuration do
        ActiveSupport.on_load(:action_view) do
          ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion(
            :defaults => STYLESHEETS, :flipstone_charts => STYLESHEETS
          )
        end
      end
    end
  end
end
