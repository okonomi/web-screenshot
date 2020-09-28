class Screenshot
  include ActiveModel::Model

  attr_accessor :url

  validates :url, presence: true

  def save
    return false if invalid?
    client = Aws::Lambda::Client.new(region: 'us-east-1')
    client.invoke(
      function_name: 'web-screenshot-serverless-dev-screenshot',
      payload: {
        url: url
      }.to_json,
      invocation_type: 'Event',
    )

    true
  end
end
