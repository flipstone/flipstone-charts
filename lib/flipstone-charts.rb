require 'rails'

module Flipstone
  module Charts
    class Engine < ::Rails::Engine
      initializer "static assets" do |app|
        system("ln -nfs #{root}/public/stylesheets/* #{app.root}/public/stylesheets/")
        system("ln -nfs #{root}/public/javascripts/* #{app.root}/public/javascripts/")
      end

      initializer "expansions" do
        ActiveSupport.on_load(:action_view) do
          ActionView::Helpers::AssetTagHelper.register_javascript_expansion(
            :defaults => %w(
              flipstone_charts/vendor/EnhanceJS/enhance
              flipstone_charts/vendor/charting/js/excanvas
              flipstone_charts/vendor/charting/js/visualize.jQuery
            )
          )
        end
      end

      # do stylsheets before configuration so we don't kill application.css
      config.before_configuration do
        ActiveSupport.on_load(:action_view) do
          ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion(
            :defaults => %w(
              flipstone_charts/vendor/charting/css/visualize
              flipstone_charts/vendor/charting/css/visualize-dark
              flipstone_charts/gem
            )
          )
        end
      end
    end
  end
end
