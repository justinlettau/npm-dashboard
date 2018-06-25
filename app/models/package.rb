class Package < ApplicationRecord
  validates :name, :presence => true
end
