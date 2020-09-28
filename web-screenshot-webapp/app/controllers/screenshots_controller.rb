class ScreenshotsController < ApplicationController
  before_action :set_screenshot, only: [:show, :edit, :update, :destroy]

  # GET /screenshots
  # GET /screenshots.json
  def index
    @screenshots = Screenshot.all
  end

  # GET /screenshots/1
  # GET /screenshots/1.json
  def show
  end

  # GET /screenshots/new
  def new
    @screenshot = Screenshot.new
  end

  # GET /screenshots/1/edit
  def edit
  end

  # POST /screenshots
  # POST /screenshots.json
  def create
    @screenshot = Screenshot.new(screenshot_params)

    respond_to do |format|
      if @screenshot.save
        format.html { redirect_to @screenshot, notice: 'Screenshot was successfully created.' }
        format.json { render :show, status: :created, location: @screenshot }
      else
        format.html { render :new }
        format.json { render json: @screenshot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /screenshots/1
  # PATCH/PUT /screenshots/1.json
  def update
    respond_to do |format|
      if @screenshot.update(screenshot_params)
        format.html { redirect_to @screenshot, notice: 'Screenshot was successfully updated.' }
        format.json { render :show, status: :ok, location: @screenshot }
      else
        format.html { render :edit }
        format.json { render json: @screenshot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /screenshots/1
  # DELETE /screenshots/1.json
  def destroy
    @screenshot.destroy
    respond_to do |format|
      format.html { redirect_to screenshots_url, notice: 'Screenshot was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_screenshot
      @screenshot = Screenshot.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def screenshot_params
      params.require(:screenshot).permit(:url)
    end
end
