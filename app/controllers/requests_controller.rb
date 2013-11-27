class RequestsController < ApplicationController

  respond_to :json, except: [:add_comment, :update]

  def index
    @requests = Request.order_by('priority asc')
    respond_with(@requests)
  end

  def show
    @request = Request.find(params[:id])
    respond_with(@requests)
  end

  #field :title, type: String
  #field :text, type: String
  #field :author, type: String
  #field :date, type: Time
  #field :priority, type: Integer
  #field :is_complete, type: Boolean

  def update
    @request = Request.find(params[:id])

    if params[:priority]
      @request.priority = params[:priority]
    elsif params[:is_complete]
      @request.is_complete = params[:is_complete]
    end

    @request.save

    render text: 'OK'
  end

  def create
    @request = Request.create(params[:request])

    respond_with(@request)
  end

  def destroy
    @request = Request.find(params[:id])
    @request.delete

    respond_with(nil)
  end

  def add_comment
    @request = Request.find(params[:request_id])

    @comment = Comment.new(params[:comment])

    @request.comments << @comment #Comment.new(text: 'hello!', author: 'chris', date: DateTime.now)

    @request.save

    render text: @comment.id
  end

  def test
    #Request.delete_all
    #Comment.delete_all
    #
    #r = Request.create(title: 'Feature 1', text: 'Thanks!', author: 'Chris', date: DateTime.now, priority: 1)
    #c = Comment.new(text: 'hello!', author: 'chris', date: DateTime.now)
    #
    #r.comments << Comment.new(text: 'hello!', author: 'chris', date: DateTime.now)

    redirect_to requests_path
  end

  def reset
    Request.delete_all
    Comment.delete_all

    redirect_to root_path
  end

end

