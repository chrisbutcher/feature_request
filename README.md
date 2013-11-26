# Mongo Platform


This project is meant to provide a starting point for your Mongo project. The project itself already has a mongoid.yml
file that should just work with your default install of mongodb. Note that if you're planning on writing tests there is
a difference on how database will get torn down and stuff like that.

I've included DatabaseCleaner gem to help with cleaning up your database after tests if you plan on writing tests. From
the documentation it's easy as
'''
def setup
    DatabaseCleaner.start
end

def teardown
    DatabaseCleaner.clean
end
'''

I've also added a sample model Book which you can delete. You can use this model to make sure you can hit your mongodb
by using it in your Rails console. You can delete the related files once you are happy with your setup.

If there are any problems please let me know and we can modify the base project.

### References that should come in handy

 * [Installing Mongo](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
 * [Mongoid Reference](http://mongoid.org/en/mongoid/index.html)
 * [DatabaseCleaner Gem](https://github.com/bmabey/database_cleaner)