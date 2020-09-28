class Screenshot < ApplicationRecord
  validates :url, presence: true

  after_create :invoke_screenshot

  private

  def invoke_screenshot
    client = Aws::Lambda::Client.new(region: 'us-east-1')
    client.invoke(
      function_name: 'web-screenshot-serverless-dev-screenshot',
      payload: {
        id: id,
        url: url
      }.to_json,
      invocation_type: 'Event',
    )
  end
end
