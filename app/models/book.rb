class Book
  include Mongoid::Document
  field :title, type: String
  field :isbn, type: String
end
