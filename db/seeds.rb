# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Request.create(title: 'Nothing works in Internet Explorer', text: 'Everything displays incorrectly, scripts don\'t run',
               author: 'Mova', date: DateTime.parse('2013-11-27 11:55:49'), priority: 1, is_complete: false)

Request.create(title: 'Redis crashes randomly', text: 'If multiple people click on Network view at the same time, Redis crashes',
               author: 'Mova', date: DateTime.parse('2013-11-27 11:53:49'), priority: 3, is_complete: false)

Request.create(title: 'Ability to search by independent words', text: 'Ability to search by independent words as well as full sentence strings',
               author: 'Mova', date: DateTime.parse('2013-11-27 11:55:49'), priority: 2, is_complete: false)
