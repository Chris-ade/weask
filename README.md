# <sup>We</sup>Ask
<p>WeAsk is a place which makes it possible for people who have knowledge to connect with the people who's in need of it. To connect together people of different perspective so they can understand each other on a particular topic or more.</p>
<p>WeAsk is a place where people ask questions that matter to you and get answers from people who have been there, people who has experience such, people who have done that. </p>

## Links

* [Web site](https://weask.bytecodevision.tech/)
* [About](https://landing.bytecodevision.tech/)
* [Blog](https://weask.bytecodevision.tech/about/)
* [Source code](https://github.com/Chris-ade/weask)

## Installation

To clone and run this application, you'll need [Python](https://www.python.org/downloads/release/python-3111/) (which comes with [pip](https://pip.pypa.io/en/stable/)) installed on your computer. 

This app uses the default SQLite database.

From your command line:
```bash
# Clone this repository
$ git clone https://github.com/Chris-ade/weask

# Go into the repository
$ cd weask

# Install dependencies
$ pip install -r requirements.txt

# Run migrations
$ python manage.py makemigrations
$ python manage.py migrate

# Run the server
$ python manage.py runserver
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `python` from the command prompt.
