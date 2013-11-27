class Comment
  include Mongoid::Document
  field :text, type: String
  field :author, type: String
  field :date, type: Time
  #belongs_to :request
  embedded_in :request

end

