class Screenshot < ApplicationRecord
  validates :url, presence: true

  after_create :invoke_screenshot

  def screenshot_url
    @screenshot_url ||= begin
      client = Aws::S3::Client.new(region: 'us-east-1')
      resource = Aws::S3::Resource.new(client: client)
      bucket = resource.bucket('web-screenshot-images-okonomi')
      object = bucket.object("#{id}.png")
      object.presigned_url(:get)
    end
  end

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
