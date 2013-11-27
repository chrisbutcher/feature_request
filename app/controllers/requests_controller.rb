class RequestsController < ApplicationController

  respond_to :json

  def index
    @requests = Request.all
    respond_with(@requests)
  end

  def test
    Request.delete_all
    Comment.delete_all

    r = Request.create(title: 'Feature 1', text: 'Thanks!', author: 'Chris', date: DateTime.now, priority: 1)
    c = Comment.new(text: 'hello!', author: 'chris', date: DateTime.now)

    r.comments << Comment.new(text: 'hello!', author: 'chris', date: DateTime.now)

    redirect_to requests_path
  end

end

