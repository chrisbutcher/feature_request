class Request
  include Mongoid::Document
  field :title, type: String
  field :text, type: String
  field :author, type: String
  field :date, type: Time
  field :priority, type: Integer
  field :is_complete, type: Boolean
  embeds_many :comments
end
