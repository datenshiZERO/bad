Bundler.require

class App < Sinatra::Base
  set :assets_precompile, %w(app.js app.css *.png *.jpg *.svg *.eot *.ttf *.woff *.ogg *.mp3 *.json *.xml)
  set :assets_host, 'game-assets.karaniwan.org'
  set :assets_css_compressor, :sass
  set :assets_js_compressor, :uglifier

  Sprockets::Helpers.prefix = "/bad"
  register Sinatra::AssetPipeline

  if defined?(RailsAssets)
    RailsAssets::load_paths.each do |path|
      settings.sprockets.append_path(path)
    end
  end

  get '/' do
    haml :index
  end
end