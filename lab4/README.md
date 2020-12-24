# ApiLab

> An api lab based on Django.


## Build & Run

```shell
# log in mysql
mysql -uroot -p

# create database for this project
create database api

# install requirements
pip install -r requirements.txt

# modify the database for this project
cd api_lab && ./manage.py makemigrations && ./manage.py migrate

# serve at localhost:8000
./manage.py runserver 0:8000
```



## Note

Mysql is the default database. And the default password for `root` is `nnnytmysql`. Please modify the configuration of database in `api_lab/api_lab/settings.py` with your own password.



## Usage

For example:

```shell
# signup
curl -d "username=nnnyt&password=123" "http://0:8000/user/signup"

# login
curl -d "username=nnnyt&password=123" "http://0:8000/user/login"

# date
curl -d "token=1585919349.4760242&date=2020-01-01" "http://0:8000/user/date"
```





