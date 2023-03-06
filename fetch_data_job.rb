require 'pry'
require 'httparty'


# name.match(/\B([A-Z]*)/)
def fetch_all_lines
  params = URI.encode_www_form({api_key: API_KEY, operator_id: 'SF'})
  lines = HTTParty.get("#{BASE_URL}/lines?#{params}")
  formatted_lines = lines.map do |line|
    {
      id: line['Id'],
      name: line['Name'],
      mode: line['TransportMode']
    }
  end

  File.write('./src/lib/data/lines.json',
    {
      fetched_at: Time.now,
      lines: formatted_lines.map(&:to_json)
    }
  )

  formatted_lines
end

def fetch_stops_for_line(id)
  params = URI.encode_www_form({api_key: API_KEY, operator_id: 'SF', line_id: id})
  response = HTTParty.get("#{BASE_URL}/stops?#{params}")
  stops = response.dig('Contents', 'dataObjects', 'ScheduledStopPoint')
  stops.map do |stop|
    stop['id']
  end
end

def fetch_stops(line_ids)
  all_stops = {
    included_lines: [],
    stops: []
  }
  line_ids.each do |line_id|
    stops_for_line = fetch_stops_for_line(line_id)
    binding.pry
  end
end

def write_file(path:, contents:)
  File.write(path, contents.to_json)
end

def fetch_data
  lines = fetch_all_lines
  stops = fetch_stops(lines.map { |line| line[:id] })
end

def do_it
  begin
    memory = JSON.parse(File.read('saved.json'))
    lines = memory['lines'] || []
    stops = memory['stops'] || {}
    patterns = HTTParty.get('https://data.sfgov.org/resource/9exe-acju.json')
    patterns.map_with_index do |pattern, i|
      line_id = pattern['route_name']
      next if lines.include?(line_id)
      next if ['C', 'KT'].include?(line_id)
      puts "#{i} START LINE ID: " + line_id

      stops_for_pattern = fetch_stops_for_line(line_id)
      stops_for_pattern.each do |stop_id|
        stops[stop_id] ||= []
        stops[stop_id] << line_id
      end

      lines << line_id
      puts "FINISHED"
      sleep 5
    end
  rescue => e
    puts e
  ensure
    File.write('saved.json', {
      lines: lines,
      stops: stops 
    }.to_json)
  end
end

def blahblah
  lines_by_stop = JSON.parse(File.read('lines_by_stop.json'))
  stops = []
  lines = {}
  lines_by_stop['stops'].each do |stop_id, line_ids|
    stops << stop_id
    line_ids.each do |line_id|
      lines[line_id] ||= []
      lines[line_id] << stop_id
    end
  end
  File.write('stops_by_line.json', {
    stops: stops,
    lines: lines
  }.to_json)
end

def blah
  binding.pry
end

fetch_all_lines