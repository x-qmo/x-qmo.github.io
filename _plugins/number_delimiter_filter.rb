# _plugins/number_delimiter_filter.rb
module Jekyll
  module NumberDelimiterFilter
    def number_with_delimiter(number, delimiter=",")
      number.to_s.gsub(/(\d)(?=(\d\d\d)+(?!\d))/, "\\1#{delimiter}")
    end
  end
end

Liquid::Template.register_filter(Jekyll::NumberDelimiterFilter)
